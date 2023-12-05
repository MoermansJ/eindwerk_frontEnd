import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Component } from '@angular/core';
import { CookieService } from 'src/app/service/cookie.service';

@Component({
  selector: 'app-cookie-popup',
  templateUrl: './cookie-popup.component.html',
  styleUrls: ['./cookie-popup.component.sass'],
})
export class CookiePopupComponent {
  constructor(private cookieService: CookieService, private http: HttpClient) {}

  public enableCookies(): void {
    const expirationTime = 1000 * 60 * 60; // 1 hour
    this.cookieService.setKey('cookieConsent', 'true', expirationTime);
  }
}
