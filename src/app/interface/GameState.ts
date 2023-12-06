import { TileMap } from './TileMap';

export interface GameState {
  sessionId: string;
  tileMap: TileMap; //replace tileMap with "gameVisual" or something similar so i can make games modular.
  userid: number;
}
