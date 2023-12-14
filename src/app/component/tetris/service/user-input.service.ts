import { Injectable } from '@angular/core';
import { MovementService } from './movement.service';

@Injectable({
  providedIn: 'root',
})
export class UserInputService {
  constructor(private movementService: MovementService) {}

  public onKeyDown(event: KeyboardEvent): void {
    const key = event.key.toLocaleUpperCase();
    this.movementService.doPlayerMove(key);
  }
}
