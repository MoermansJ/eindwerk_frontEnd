import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, NgZone, OnDestroy } from '@angular/core';
import { GameState } from 'src/app/interface/GameState';
import { TileMap } from 'src/app/interface/TileMap';
import { CookieService as NgxCookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.sass'],
})
export class GamePageComponent implements OnDestroy {
  private gameState: GameState = {} as GameState;
  public tileMap: TileMap = {} as TileMap;
  public gameCounter: number = 0;
  public frameCounter: number = 0;
  private animationFrameId: number = 0;
  public isGameLoopActive: boolean = false;

  constructor(
    private http: HttpClient,
    public cookieService: NgxCookieService
  ) {
    this.gameLoop();
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (!this.isGameLoopActive) return;

    const key = event.key.toLocaleUpperCase();
    this.getGameState(false, key);
  }

  private gameLoop(): void {
    if (!this.isGameLoopActive) return;

    this.animationFrameId = requestAnimationFrame(() => {
      this.gameCounter++;

      if (this.gameCounter % 60 === 0) {
        this.frameCounter++;
        this.getGameState(true, 'NO_KEY');
      }

      cancelAnimationFrame(this.animationFrameId); // cancels the PREVIOUS frame

      this.gameLoop();
    });
  }

  private getGameState(computerMove: boolean, userMove: string): void {
    const url = 'http://localhost:8080/game/getGameState';
    const sessionId = this.cookieService.get('sessionId');
    const username = localStorage.getItem('username');
    this.http
      .post(url, {
        computerMove: computerMove,
        keyPressed: userMove,
        sessionId: sessionId,
        username: username,
      })
      .subscribe({
        next: (response) => this.setGameState(response as GameState),
        error: (error: HttpErrorResponse) => console.log(error.message),
      });
  }

  private setGameState(gameState: GameState): void {
    this.gameState = gameState;
    this.tileMap = gameState.tileMap;
  }

  public toggleGameLoop(): void {
    this.isGameLoopActive = !this.isGameLoopActive;

    if (!this.isGameLoopActive) return;

    this.gameLoop();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrameId);
  }

  public newGame(): void {
    this.cookieService.delete('sessionId');
    this.getNewSessionId();
    this.isGameLoopActive = true;
    this.gameLoop();
  }

  private getNewSessionId(): void {
    const url = `http://localhost:8080/auth/generateSessionId`;
    this.http.get(url).subscribe({
      next: (response: any) =>
        this.cookieService.set('sessionId', response['sessionId']),
      error: (error: HttpErrorResponse) => console.error(error.message),
    });
  }
}
