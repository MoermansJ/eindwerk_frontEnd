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

  public register(): void {
    if (!this.passesFormValidation()) return;

    const url = 'http://localhost:8080/auth/register';
    const registerDetails = {
      username: this.username,
      password: this.password,
    };

    this.http.post<User>(url, registerDetails).subscribe({
      next: (response) => {
        this.operationResult = `Successfully registered ${response.username}.`;
      },
      error: (error: HttpErrorResponse) => (this.operationResult = error.error),
    });
  }

  private passesFormValidation(): boolean {
    if (this.password.length <= 6) {
      this.operationResult = `Password must be at least 7 characters.`;
      return false;
    }
    if (!this.username.trim()) {
      this.operationResult = `Username must not be empty.`;
      return false;
    }

    return true;
  }
}
