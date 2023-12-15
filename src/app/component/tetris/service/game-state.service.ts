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

  public requestGameState(movementBuffer: string[]): void {
    const url = 'http://localhost:8080/game/getGameState';
    const body = {
      movementBuffer: movementBuffer,
      sessionId: this.cookieService.get('sessionId'),
      username: localStorage.getItem('username') || '',
    };

    this.http.post<GameState>(url, body).subscribe({
      next: (response) => this.setGameState(response),
      error: (error: HttpErrorResponse) => console.log(error.error),
    });
  }
}
