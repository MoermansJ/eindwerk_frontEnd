import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, NgZone, OnDestroy } from '@angular/core';
import { GameState } from 'src/app/interface/GameState';
import { TileMap } from 'src/app/interface/TileMap';
import { CookieService as NgxCookieService } from 'ngx-cookie-service';
import { DataService } from 'src/app/service/data.service';
import { User } from 'src/app/interface/User';
import { GameStateService } from 'src/app/service/game-state.service';

@Component({
  selector: 'app-tetris',
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.sass'],
})
export class TetrisComponent implements OnDestroy {
  private gameState: GameState = {} as GameState;
  private animationFrameId: number = 0;
  public tileMap: TileMap = {} as TileMap;
  public gameCounter: number = 0;
  public frameCounter: number = 0;
  public isGameLoopActive: boolean = false;
  public user: User | null = null;
  public showOverlay: boolean = true;

  constructor(
    private http: HttpClient,
    private cookieService: NgxCookieService,
    private data: DataService,
    private gameStateService: GameStateService
  ) {
    this.subscribeToServices();
    this.startGameLoop();
  }

  private subscribeToServices(): void {
    this.data.getUser().subscribe({
      next: (user) => this.setUser(user as User),
    });

    this.gameStateService.getGameState().subscribe({
      next: (gamestate) => {
        this.gameState = gamestate as GameState;
        this.tileMap = gamestate?.tileMap as TileMap;
      },
    });
  }

  @HostListener('window:keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent): void {
    if (!this.isGameLoopActive) return;
    const key = event.key.toLocaleUpperCase();
    this.gameStateService.doPlayerMove(key);
  }

  private startGameLoop(): void {
    if (!this.isGameLoopActive) return;

    this.animationFrameId = requestAnimationFrame(() => {
      this.gameCounter++;

      if (this.gameCounter % 60 === 0) {
        this.frameCounter++;
        this.gameStateService.doComputerMove();
      }

      cancelAnimationFrame(this.animationFrameId); // This breaks the animationframe loop

      this.startGameLoop();
    });
  }

  private setUser(user: User): void {
    if (!user) return;
    this.user = user;
    this.showOverlay = false;
  }

  public toggleGameLoop(): void {
    this.showOverlay = false;
    this.isGameLoopActive = !this.isGameLoopActive;

    if (!this.isGameLoopActive) return;

    this.startGameLoop();
  }

  public ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrameId);
  }

  public newGame(): void {
    this.showOverlay = false;
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
}
