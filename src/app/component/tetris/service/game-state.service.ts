import { Injectable } from '@angular/core';
import { GameStateRequest } from 'src/app/component/tetris/interface/GameStateRequest';
import { CookieService as NgxCookieService } from 'ngx-cookie-service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GameState } from '../interface/GameState';
import { BehaviorSubject, Observable } from 'rxjs';
import { GameStateRequestService } from './game-state-request.service';

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  private gameState = new BehaviorSubject<GameState | undefined>(undefined);

  constructor(private gameStateRequestService: GameStateRequestService) {}

  public getGameState(): Observable<GameState | undefined> {
    return this.gameState.asObservable();
  }

  public setGameState(gameState: GameState): void {
    this.gameState.next(gameState);
  }

  public sendGameStateRequest(gameStateRequest: GameStateRequest): void {
    this.gameStateRequestService
      .sendGameStateRequest(gameStateRequest)
      .subscribe({
        next: (response) => response,
        error: (error: HttpErrorResponse) => console.error(error.error),
      });
  }
}
