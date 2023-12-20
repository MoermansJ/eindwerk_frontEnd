import { TileMap } from './TileMap';

export interface GameState {
  sessionId: string;
  currentPieceTileMap: TileMap;
  nextPieceTileMap: TileMap;
  username: string;
}
