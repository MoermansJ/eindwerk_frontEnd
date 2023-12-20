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
  protected nextPieceTileMap: TileMap = {} as TileMap;
  protected firstGameStarted: boolean = false;
  protected linesCleared: number = 0;
  protected difficultyLevel: number = 0;
  private gameState: GameState = {} as GameState;

  constructor(
    protected gameLoopService: GameLoopService,
    private gameStateService: GameStateService,
    private userInputService: MovementService,
    private data: DataService
  ) {
    this.subscribeToServices();
    this.gameLoopService.gameLoop();
  }

  private subscribeToServices(): void {
    this.gameStateService.getGameState().subscribe({
      next: (gamestate) => this.updateView(gamestate as GameState),
    });

    this.data.getDifficultyLevel().subscribe({
      next: (response) => (this.difficultyLevel = response),
    });
  }

  private updateView(gamestate: GameState): void {
    this.gameState = gamestate as GameState;
    this.tileMap = gamestate?.currentPieceTileMap as TileMap;
    this.nextPieceTileMap = gamestate?.nextPieceTileMap as TileMap;
    this.linesCleared = gamestate?.currentPieceTileMap.linesCleared;
  }

  protected newGame(): void {
    setTimeout(() => {
      this.firstGameStarted = true;
      this.gameLoopService.newGame(this.seed.trim());
    }, 1000);
  }

  @HostListener('window:keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent): void {
    if (!this.gameLoopService.isGameLoopActive) return;
    this.userInputService.onKeyDown(event);
  }
}
