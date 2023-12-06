import { Injectable } from '@angular/core';
import { CookieService as NgxCookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CustomCookieService {
  constructor(private ngxCookieService: NgxCookieService) {}

  public setKey(key: string, value: string, expirationTime?: number): void {
    this.ngxCookieService.set(key, value, expirationTime, '/');
  }

  public getKey(key: string): string | null {
    return this.ngxCookieService.get(key);
  }

  public deleteKey(key: string): void {
    this.ngxCookieService.delete(key);
  }
}
