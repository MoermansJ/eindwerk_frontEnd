import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, NgZone, OnDestroy } from '@angular/core';
import { GameState } from 'src/app/interface/GameState';
import { Tile } from 'src/app/interface/Tile';
import { TileMap } from 'src/app/interface/TileMap';
import { CookieService } from 'src/app/service/cookie.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass'],
})
export class HomePageComponent implements OnDestroy {
  private gameState: GameState = {} as GameState;
  public tileMap: TileMap = {} as TileMap;
  public gameCounter: number = 0;
  public frameCounter: number = 0;
  private animationFrameId: number = 0;

  constructor(private http: HttpClient, public cookieService: CookieService) {
    this.gameLoop();
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const key = event.key.toLocaleUpperCase();
    this.getGameState(false, key);
  }

  gameLoop(): void {
    this.animationFrameId = requestAnimationFrame(() => {
      this.gameCounter++;

      if (this.gameCounter % 60 === 0) {
        this.frameCounter++;
        this.getGameState(true, 'NO_KEY');
      }

      this.gameLoop();
    });
  }

  private getGameState(computerMove: boolean, userMove: string): void {
    const url = 'http://localhost:8080/game/getGameState';
    const sessionId = this.cookieService.getCookie('sessionId');
    this.http
      .post(url, {
        computerMove: computerMove,
        key: userMove,
        sessionId: sessionId,
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

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrameId);
  }
}
