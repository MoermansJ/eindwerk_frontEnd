import { Injectable } from '@angular/core';
import { MovementService } from './movement.service';

@Injectable({
  providedIn: 'root',
})
export class UserInputService {
  private movementBuffer: string[] = [];

  constructor(private movementService: MovementService) {}

  public onKeyDown(event: KeyboardEvent): void {
    const key = event.key.toUpperCase();
    this.movementBuffer.push(key);
  }

  public flushInputBuffer(): void {
    this.movementService.doMovement(this.movementBuffer);
    this.movementBuffer = [];
  }

  public addMovementToBuffer(movement: string): void {
    this.movementBuffer.push(movement);
  }
}
