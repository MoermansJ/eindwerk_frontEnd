import { TileMap } from './TileMap';

export interface GameState {
  sessionId: number;
  tileMap: TileMap; //replace tileMap with "gameVisual" or something similar so i can make games modular.
}
