import { Injectable } from '@angular/core';
import { AuthTokenDTO } from '../interface/AuthTokenDTO';
import { User } from '../interface/User';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private data: DataService, private http: HttpClient) {}

  public initialiseUserSettingsWithLocalStorage(): void {
    const lsUsername = localStorage.getItem('username') as string;
    const lsToken = localStorage.getItem('token') as string;
    const authToken = { username: lsUsername, token: lsToken } as AuthTokenDTO;

    if (!lsToken || !lsUsername) {
      localStorage.clear();
      return;
    }

    this.validateToken(authToken);
  }

  private validateToken(authToken: AuthTokenDTO): void {
    this.validateTokenRequest(authToken).subscribe({
      next: () => this.handleTokenValidationSuccess(),
      error: (error: HttpErrorResponse) =>
        this.handleTokenValidationError(error),
    });
  }

  private validateTokenRequest(authToken: AuthTokenDTO): Observable<User> {
    return this.http.post<User>(
      'http://localhost:8080/auth/validateToken',
      authToken
    );
  }

  private handleTokenValidationSuccess(): void {
    this.data.setUser({
      username: localStorage.getItem('username'),
    } as User);
  }

  private handleTokenValidationError(error: HttpErrorResponse): void {
    console.log('Token validation failed - log in again');
    console.error(error.error);
    localStorage.clear();
  }
}
