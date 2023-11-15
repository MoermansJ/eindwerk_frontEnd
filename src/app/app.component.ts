import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthTokenDTO } from './interface/AuthTokenDTO';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  title = 'Eindwerk Jonathan Moermans';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    //logging in user based on localstorage credentials
    const lsUsername = localStorage.getItem('username') as string;
    const lsToken = localStorage.getItem('token') as string;

    const authToken: AuthTokenDTO = { username: lsUsername, token: lsToken };

    if (!lsToken || !lsUsername) {
      return;
    }

    const url = 'http://localhost:8080/auth/validateToken';
    this.http.post(url, authToken).subscribe({
      next: (response: any) => console.log('token is valid? ', response),
      error: (error: HttpErrorResponse) => console.log(error.error),
    });
  }
}
