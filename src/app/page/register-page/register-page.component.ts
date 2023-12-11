import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from 'src/app/interface/User';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.sass'],
})
export class RegisterPageComponent {
  public username: string = '';
  public password: string = '';
  public operationResult: string = '';

  constructor(private http: HttpClient) {}

  public register(username: string, password: string): void {
    if (!username || !password) return;

    const url = 'http://localhost:8080/auth/register';
    const registerDetails = { username: username, password: password };

    this.http.post<User>(url, registerDetails).subscribe({
      next: (response) => {
        this.operationResult = `Successfully registered ${response.username}.`;
      },
      error: (error: HttpErrorResponse) => (this.operationResult = error.error),
    });
  }
}
