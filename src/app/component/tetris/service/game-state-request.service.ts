import { Injectable } from '@angular/core';
import { GameStateRequest } from '../interface/GameStateRequest';
import { HttpClient } from '@angular/common/http';
import { GameState } from '../interface/GameState';
import { Observable } from 'rxjs';
import { CookieService as NgxCookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class GameStateRequestService {
  constructor(
    private http: HttpClient,
    private cookieService: NgxCookieService
  ) {}

  public getNewGameStateRequest(seed?: string): GameStateRequest {
    if (!seed) seed = this.getRandomSeed();

    const newGameStateRequest = {
      movementBuffer: [],
      sessionId: '',
      username: '',
      seed: seed,
    } as GameStateRequest;

    return this.initialiseNewGameStateRequestWithLocalVariables(
      newGameStateRequest
    );
  }

  public sendGameStateRequest(
    gameStateRequest: GameStateRequest
  ): Observable<GameState> {
    const url = 'http://localhost:8080/game/getGameState';
    return this.http.post<GameState>(url, gameStateRequest);
  }

  private initialiseNewGameStateRequestWithLocalVariables(
    gameStateRequest: GameStateRequest
  ): GameStateRequest {
    gameStateRequest.sessionId = this.cookieService.get('sessionId');
    gameStateRequest.username = localStorage.getItem('username') || 'anonymous';

    return gameStateRequest;
  }

  private getRandomSeed(): string {
    return (Math.random() * 1000).toString();
  }
}
