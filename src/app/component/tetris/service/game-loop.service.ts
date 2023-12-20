import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { CookieService as NgxCookieService } from 'ngx-cookie-service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MovementService } from './movement.service';
import { GameStateRequestService } from './game-state-request.service';
import { GameStateRequest } from '../interface/GameStateRequest';
import { GameState } from '../interface/GameState';
import { GameStateService } from './game-state.service';
import { DataService } from 'src/app/service/data.service';

@Injectable({
  providedIn: 'root',
})
export class GameLoopService implements OnInit {
  public isGameLoopActive: boolean = false;
  protected frameCounter: number = 0;
  private animationFrameId: number = 0;
  private gameStateRequest: GameStateRequest = {} as GameStateRequest;
  private linesCleared: number = 0;
  private computerMoveInterval: number = 60;
  private previousMilestone: number = 0;
  private difficultyLevel: number = 1;

  constructor(
    private cookieService: NgxCookieService,
    private http: HttpClient,
    private movementService: MovementService,
    private gameStateRequestService: GameStateRequestService,
    private gameStateService: GameStateService,
    private data: DataService
  ) {}

  public ngOnInit(): void {
    this.data.getLinesCleared().subscribe({
      next: (response) => (this.linesCleared = response),
    });
  }

  public gameLoop(): void {
    if (!this.isGameLoopActive) return;

    this.animationFrameId = requestAnimationFrame(() => {
      this.gameLoopLogic();
      cancelAnimationFrame(this.animationFrameId); // NOTE: This breaks the animationframe loop
      this.gameLoop(); // NOTE: And this starts the next iteration
    });
  }

  private gameLoopLogic(): void {
    this.frameCounter++;

    if (this.canIncreaseDifficulty()) {
      this.increaseDifficulty();
    }

    if (this.canDoComputerMove()) {
      this.movementService.addMovementToBuffer('COMPUTERMOVE');
    }

    if (this.canDoUserMove()) {
      this.doUserMove();
    }
  }

  public toggleGameLoop(): void {
    this.isGameLoopActive = !this.isGameLoopActive;
    if (!this.isGameLoopActive) return;
    this.gameLoop();
  }

  public newGame(seed: string): void {
    this.resetForNewGame(seed);
    this.gameLoop();
  }

  private getNewSessionId(seed: string): void {
    const url = `http://localhost:8080/auth/generateSessionId`;

    this.http.get(url).subscribe({
      next: (response: any) => {
        this.cookieService.set('sessionId', response['sessionId']),
          (this.gameStateRequest =
            this.gameStateRequestService.getNewGameStateRequest(seed));
      },
      error: (error: HttpErrorResponse) => console.error(error.error),
    });
  }

  private sendGameStateRequest(gameStateRequest: GameStateRequest): void {
    this.gameStateRequestService
      .sendGameStateRequest(gameStateRequest)
      .subscribe({
        next: (response: GameState) => {
          this.gameStateService.setGameState(response),
            (this.linesCleared = response.tileMap.linesCleared);
        },
        error: (error: HttpErrorResponse) => console.error(error.error),
      });
  }

  private canIncreaseDifficulty(): boolean {
    return (
      this.linesCleared > this.previousMilestone &&
      this.linesCleared % 2 === 0 &&
      this.computerMoveInterval > 10
    );
  }

  private increaseDifficulty(): void {
    this.computerMoveInterval -= 10;
    this.previousMilestone += 1;
    this.difficultyLevel += 1;
    this.data.setDifficultyLevel(this.difficultyLevel);
  }

  private resetDifficulty(): void {
    this.computerMoveInterval = 60;
    this.previousMilestone = 0;
    this.difficultyLevel = 1;
    this.data.setDifficultyLevel(this.difficultyLevel);
  }

  private resetForNewGame(seed: string): void {
    this.cookieService.delete('sessionId');
    this.getNewSessionId(seed);
    this.isGameLoopActive = true;
    this.resetDifficulty();
  }

  private canDoComputerMove(): boolean {
    return this.frameCounter % this.computerMoveInterval === 0;
  }

  private canDoUserMove(): boolean {
    return this.frameCounter % 10 === 0;
  }

  private doUserMove(): void {
    const movementBuffer = this.movementService.getAndFlushMovementBuffer();
    this.gameStateRequest.movementBuffer = movementBuffer;
    this.sendGameStateRequest(this.gameStateRequest);
  }
}
