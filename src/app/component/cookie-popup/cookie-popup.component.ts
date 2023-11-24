import { Component } from '@angular/core';
import { CookieService } from 'src/app/service/cookie.service';

@Component({
  selector: 'app-cookie-popup',
  templateUrl: './cookie-popup.component.html',
  styleUrls: ['./cookie-popup.component.sass'],
})
export class CookiePopupComponent {
  constructor(private cookieService: CookieService) {}

  enableCookies(): void {
    this.cookieService.setCookie('cookieConsent', 'true', 365);
  }
}
