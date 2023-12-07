import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';
import { User } from 'src/app/interface/User';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass'],
})
export class LoginPageComponent {
  private user: User | null = null;
  public username: string = '';
  public password: string = '';
  public result: string = '';

  constructor(
    private http: HttpClient,
    private data: DataService,
    private router: Router
  ) {}

  public login(username: string, password: string): void {
    const url = 'http://localhost:8080/auth/login';
    this.http
      .post(url, {
        username: username,
        password: password,
      })
      .subscribe({
        next: (response) => {
          const user = response as User;
          localStorage.setItem('token', user.token);
          localStorage.setItem('username', user.username);
          this.result = `Successfully logged in ${user.username}.`;
          this.data.setUser(user);
        },
        error: (error: HttpErrorResponse) => (this.result = error.message),
      });
  }
}
