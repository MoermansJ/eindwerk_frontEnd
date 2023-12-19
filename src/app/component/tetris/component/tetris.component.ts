import { Component, HostListener } from '@angular/core';
import { GameState } from 'src/app/component/tetris/interface/GameState';
import { TileMap } from 'src/app/component/tetris/interface/TileMap';
import { DataService } from 'src/app/service/data.service';
import { User } from 'src/app/interface/User';
import { GameStateService } from '../service/game-state.service';
import { MovementService } from '../service/movement.service';
import { GameLoopService } from '../service/game-loop.service';

@Component({
  selector: 'app-tetris',
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.sass'],
})
export class TetrisComponent {
  protected seed: string = '';
  protected user: User | undefined;
  protected tileMap: TileMap = {} as TileMap;
  protected firstGameStarted: boolean = false;
  private gameState: GameState = {} as GameState;

  constructor(
    protected gameLoopService: GameLoopService,
    private data: DataService,
    private gameStateService: GameStateService,
    private userInputService: MovementService
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

  protected newGame(): void {
    this.firstGameStarted = true;
    this.gameLoopService.newGame(this.seed.trim());
  }

  @HostListener('window:keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent): void {
    if (!this.gameLoopService.isGameLoopActive) return;
    this.userInputService.onKeyDown(event);
  }
}
