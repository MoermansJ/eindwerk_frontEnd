import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, NgZone, OnDestroy } from '@angular/core';
import { GameState } from 'src/app/component/tetris/interface/GameState';
import { TileMap } from 'src/app/component/tetris/interface/TileMap';
import { CookieService as NgxCookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass'],
})
export class HomePageComponent {}
