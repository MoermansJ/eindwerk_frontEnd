export interface GameStateRequest {
  movementBuffer: string[];
  sessionId: string | null;
  username: string | null;
  seed: string;
}
