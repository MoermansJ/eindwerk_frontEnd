import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.sass'],
})
export class RegisterPageComponent {
  public username: string = '';
  public password: string = '';
  public result: string = '';

  constructor(private http: HttpClient) {}

  public register(): void {
    const url = 'http://localhost:8080/auth/register';
    this.http
      .post(url, {
        username: this.username,
        password: this.password,
      })
      .subscribe({
        next: (response: any) => console.log(response),
        error: (error: HttpErrorResponse) => (this.result = error.error),
      });
  }
}
