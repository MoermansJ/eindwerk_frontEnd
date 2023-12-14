import { Injectable } from '@angular/core';
import { GameStateRequest } from 'src/app/interface/GameStateRequest';
import { CookieService as NgxCookieService } from 'ngx-cookie-service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GameState } from '../../../interface/GameState';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  private gameState = new BehaviorSubject<GameState | undefined>(undefined);

  constructor(
    private cookieService: NgxCookieService,
    private http: HttpClient
  ) {}

  public getGameState(): Observable<GameState | undefined> {
    return this.gameState.asObservable();
  }

  public setGameState(gameState: GameState): void {
    this.gameState.next(gameState);
  }

  public requestGameState(computerMove: boolean, userMove: string): void {
    const url = 'http://localhost:8080/game/getGameState';
    const gameStateRequest = this.createGameStateRequest(
      computerMove,
      userMove
    );

    this.sendGameStateRequest(url, gameStateRequest);
  }

  private createGameStateRequest(
    computerMove: boolean,
    userMove: string
  ): GameStateRequest {
    return {
      computerMove,
      keyPressed: userMove,
      sessionId: this.cookieService.get('sessionId'),
      username: localStorage.getItem('username') || '',
    };
  }

  private sendGameStateRequest(
    url: string,
    gameStateRequest: GameStateRequest
  ): void {
    this.http.post<GameState>(url, gameStateRequest).subscribe({
      next: (response) => this.setGameState(response),
      error: (error: HttpErrorResponse) => console.log(error.error),
    });
  }
}
