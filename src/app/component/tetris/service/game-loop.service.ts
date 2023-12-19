import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { CookieService as NgxCookieService } from 'ngx-cookie-service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MovementService } from './movement.service';
import { GameStateRequestService } from './game-state-request.service';
import { GameStateRequest } from '../interface/GameStateRequest';
import { GameState } from '../interface/GameState';
import { GameStateService } from './game-state.service';

@Injectable({
  providedIn: 'root',
})
export class GameLoopService {
  public isGameLoopActive: boolean = false;
  protected gameCounter: number = 0;
  private animationFrameId: number = 0;
  private gameStateRequest: GameStateRequest = {} as GameStateRequest;

  constructor(
    private cookieService: NgxCookieService,
    private http: HttpClient,
    private userInputService: MovementService,
    private gameStateRequestService: GameStateRequestService,
    private gameStateService: GameStateService
  ) {}

  public startGameLoop(): void {
    if (!this.isGameLoopActive) return;

    this.animationFrameId = requestAnimationFrame(() => {
      this.gameCounter++;

      if (this.gameCounter % 60 === 0) {
        this.userInputService.addMovementToBuffer('COMPUTERMOVE');
      }

      if (this.gameCounter % 7 === 0) {
        const flushedMovementBuffer =
          this.userInputService.retrieveDeepCopyAndFlushMovementBuffer();
        this.gameStateRequest.movementBuffer = flushedMovementBuffer;
        this.sendGameStateRequest(this.gameStateRequest);
      }

      cancelAnimationFrame(this.animationFrameId); // This breaks the previous animationframe loop

      this.startGameLoop();
    });
  }

  public toggleGameLoop(): void {
    this.isGameLoopActive = !this.isGameLoopActive;
    if (!this.isGameLoopActive) return;
    this.startGameLoop();
  }

  public newGame(seed: string): void {
    this.cookieService.delete('sessionId');
    this.getNewSessionId(seed);
    this.isGameLoopActive = true;
    this.startGameLoop();
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
        next: (response: GameState) =>
          this.gameStateService.setGameState(response),
        error: (error: HttpErrorResponse) => console.error(error.error),
      });
  }
}
