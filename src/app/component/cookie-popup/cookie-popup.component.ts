import { Component } from '@angular/core';
import { CookieService as NgxCookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cookie-popup',
  templateUrl: './cookie-popup.component.html',
  styleUrls: ['./cookie-popup.component.sass'],
})
export class CookiePopupComponent {
  constructor(private cookieService: NgxCookieService) {}

  public enableCookies(): void {
    const expirationTime = 1000 * 60 * 60; // 1 hour
    this.cookieService.set('cookieConsent', 'true', expirationTime);
  }
}
