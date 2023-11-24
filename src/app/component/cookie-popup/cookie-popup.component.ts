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

  enableCookies(): void {
    const url = `http://localhost:8080/auth/getSessionId`;
    this.http.get(url).subscribe({
      next: (response: any) => {
        const sessionId = response['sessionId'];
        this.cookieService.setCookie('cookieConsent', 'true', 365);
        this.cookieService.setCookie('SESSION_ID', sessionId, 365);
      },
      error: (error: HttpErrorResponse) => console.log(error.error),
    });
  }
}
