import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { DataService } from './service/data.service';
import { CookieService as NgxCookieService } from 'ngx-cookie-service';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  public title: string = 'Eindwerk Jonathan Moermans';
  public cookieConsent: boolean = false;

  constructor(
    private authService: AuthService,
    private cookieService: NgxCookieService
  ) {
    authService.initialiseUserSettingsWithLocalStorage();
    this.cookieConsent = cookieService.get('cookieConsent') == 'true';
  }
}
