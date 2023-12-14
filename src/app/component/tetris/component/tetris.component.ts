import { Component, HostListener } from '@angular/core';
import { GameState } from 'src/app/interface/GameState';
import { TileMap } from 'src/app/interface/TileMap';
import { DataService } from 'src/app/service/data.service';
import { User } from 'src/app/interface/User';
import { GameStateService } from '../service/game-state.service';
import { UserInputService } from '../service/user-input.service';
import { GameLoopService } from '../service/game-loop.service';

@Component({
  selector: 'app-tetris',
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.sass'],
})
export class TetrisComponent {
  protected user: User | undefined;
  protected tileMap: TileMap = {} as TileMap;
  private gameState: GameState = {} as GameState;

  constructor(
    protected gameLoopService: GameLoopService,
    private data: DataService,
    private gameStateService: GameStateService,
    private userInputService: UserInputService
  ) {
    this.subscribeToServices();
    this.gameLoopService.startGameLoop();
  }

  private subscribeToServices(): void {
    this.data.getUser().subscribe({
      next: (user) => user,
    });

    this.gameStateService.getGameState().subscribe({
      next: (gamestate) => this.updateView(gamestate as GameState),
    });
  }

  private updateView(gamestate: GameState): void {
    this.gameState = gamestate as GameState;
    this.tileMap = gamestate?.tileMap as TileMap;
  }

  @HostListener('window:keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent): void {
    if (!this.gameLoopService.isGameLoopActive) return;
    this.userInputService.onKeyDown(event);
  }
}
