import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MovementService {
  private movementBuffer: string[] = [];

  constructor() {}

  public onKeyDown(event: KeyboardEvent): void {
    const key = event.key.toUpperCase();
    this.movementBuffer.push(key);
  }

  public retrieveDeepCopyAndFlushMovementBuffer(): string[] {
    const movementBuffer = [...this.movementBuffer];
    this.movementBuffer = [];
    return movementBuffer;
  }

  public addMovementToBuffer(movement: string): void {
    this.movementBuffer.push(movement);
  }
}
