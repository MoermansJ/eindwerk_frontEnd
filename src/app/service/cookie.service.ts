import { Injectable } from '@angular/core';
import { CookieService as NgxCookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  constructor(private ngxCookieService: NgxCookieService) {}

  public setCookie(key: string, value: string, days: number): void {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    this.ngxCookieService.set(key, value, date, '/');
  }

  public getCookie(name: string): string | null {
    return this.ngxCookieService.get(name);
  }

  public deleteKeyFromCookie(key: string): void {
    this.ngxCookieService.delete(key);
  }
}
