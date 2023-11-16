import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass'],
})
export class LoginPageComponent {
  public username: string = '';
  public password: string = '';
  public result: string = '';

  constructor(private http: HttpClient, private data: DataService) {}

  public login(username: string, password: string): void {
    const url = 'http://localhost:8080/auth/login';
    this.http
      .post(url, {
        username: username,
        password: password,
      })
      .subscribe({
        next: (response: any) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', response.username);
          this.result = `Successfully logged in ${response.username}.`;
          this.data.setUser(response.username);
        },
        error: (error: HttpErrorResponse) => (this.result = error.error),
      });
  }
}
