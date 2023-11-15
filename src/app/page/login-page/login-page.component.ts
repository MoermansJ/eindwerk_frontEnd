import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass'],
})
export class LoginPageComponent {
  public username: string = '';
  public password: string = '';
  public result: string = '';

  constructor(private http: HttpClient) {}

  public login(): void {
    const url = 'http://localhost:8080/auth/login';
    this.http
      .post(url, {
        username: this.username,
        password: this.password,
      })
      .subscribe({
        next: (response: any) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', response.username);
        },
        error: (error: HttpErrorResponse) => (this.result = error.error),
      });
  }
}
