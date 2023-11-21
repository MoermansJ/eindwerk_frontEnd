import { Tile } from './Tile';

export interface TileMap {
  id: number;
  width: number;
  height: number;
  tiles: Tile[];
}
