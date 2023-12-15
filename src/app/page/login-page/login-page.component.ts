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
  private user: User | undefined;
  public username: string = '';
  public password: string = '';
  public operationResult: string = '';

  constructor(
    private http: HttpClient,
    private data: DataService,
    private router: Router
  ) {}

  public login(username: string, password: string): void {
    if (!this.passesformValidation()) return;
    this.loginHttpRequest(username, password);
  }

  private loginHttpRequest(username: string, password: string): void {
    const url = 'http://localhost:8080/auth/login';
    const loginDetails = { username: username, password: password };

    this.http.post<User>(url, loginDetails).subscribe({
      next: (response) => this.saveUserAndNavigate(response),
      error: (error: HttpErrorResponse) => (this.operationResult = error.error),
    });
  }

  private saveUserAndNavigate(user: User): void {
    localStorage.setItem('token', user.token);
    localStorage.setItem('username', user.username);
    this.operationResult = `Successfully logged in ${user.username}.`;
    this.data.setUser(user);
    setTimeout(() => this.router.navigate(['/profile']), 1500);
  }

  private passesformValidation(): boolean {
    if (!this.password.length) {
      this.operationResult = `Password must not be empty.`;
      return false;
    }
    if (!this.username.trim()) {
      this.operationResult = `Username must not be empty.`;
      return false;
    }

    return true;
  }
}
