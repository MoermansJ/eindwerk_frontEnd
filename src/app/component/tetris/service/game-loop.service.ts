import { Injectable, OnDestroy } from '@angular/core';
import { CookieService as NgxCookieService } from 'ngx-cookie-service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserInputService } from './user-input.service';

@Injectable({
  providedIn: 'root',
})
export class GameLoopService implements OnDestroy {
  public isGameLoopActive: boolean = false;
  protected gameCounter: number = 0;
  protected frameCounter: number = 0;
  private animationFrameId: number = 0;

  constructor(
    private cookieService: NgxCookieService,
    private http: HttpClient,
    private userInputService: UserInputService
  ) {}

  public startGameLoop(): void {
    if (!this.isGameLoopActive) return;

    this.animationFrameId = requestAnimationFrame(() => {
      this.gameCounter++;

      if (this.gameCounter % 7 === 0) {
        this.userInputService.flushInputBuffer();
      }

      if (this.gameCounter % 60 === 0) {
        this.frameCounter++;
        this.userInputService.addMovementToBuffer('COMPUTERMOVE');
      }

      cancelAnimationFrame(this.animationFrameId); // This breaks the animationframe loop

      this.startGameLoop();
    });
  }

  public toggleGameLoop(): void {
    this.isGameLoopActive = !this.isGameLoopActive;
    if (!this.isGameLoopActive) return;
    this.startGameLoop();
  }

  public newGame(): void {
    this.cookieService.delete('sessionId');
    this.getNewSessionId();
    this.isGameLoopActive = true;
    this.startGameLoop();
  }

  private getNewSessionId(): void {
    const url = `http://localhost:8080/auth/generateSessionId`;
    this.http.get(url).subscribe({
      next: (response: any) =>
        this.cookieService.set('sessionId', response['sessionId']),
      error: (error: HttpErrorResponse) => console.error(error.message),
    });
  }

  public ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrameId);
  }
}
