import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, NgZone, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass'],
})
export class HomePageComponent implements OnDestroy {
  public game: any;
  public gameCounter: number = 0;
  public frameCounter: number = 0;
  private animationFrameId: number = 0;

  constructor(private http: HttpClient) {
    this.gameLoop();
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const key = event.key.toLocaleUpperCase();
    this.getGameState(false, key);
  }

  gameLoop(): void {
    this.animationFrameId = requestAnimationFrame(() => {
      this.gameCounter++;

      if (this.gameCounter % 60 === 0) {
        this.frameCounter++;
        this.getGameState(true, 'NO_KEY');
      }

      this.gameLoop();
    });
  }

  private getGameState(computerMove: boolean, userMove: string): void {
    const url = 'http://localhost:8080/game/getGameState';
    this.http
      .post(url, { computerMove: computerMove, key: userMove })
      .subscribe({
        next: (response: any) => (this.game = response),
        error: (error: HttpErrorResponse) => console.log(error.message),
      });
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrameId);
  }
}
