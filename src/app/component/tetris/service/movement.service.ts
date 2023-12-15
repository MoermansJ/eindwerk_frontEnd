import { Injectable } from '@angular/core';
import { GameStateService } from './game-state.service';

@Injectable({
  providedIn: 'root',
})
export class MovementService {
  constructor(private gameStateService: GameStateService) {}

  public doMovement(movementBuffer: string[]): void {
    this.gameStateService.requestGameState(movementBuffer);
  }
}
