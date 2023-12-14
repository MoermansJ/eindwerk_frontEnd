import { Injectable } from '@angular/core';
import { GameStateService } from './game-state.service';

@Injectable({
  providedIn: 'root',
})
export class MovementService {
  constructor(private gameStateService: GameStateService) {}

  public doComputerMove(): void {
    this.gameStateService.requestGameState(true, 'NO_KEY');
  }

  public doPlayerMove(key: string): void {
    this.gameStateService.requestGameState(false, key);
  }
}
