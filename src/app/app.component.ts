import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthTokenDTO } from './interface/AuthTokenDTO';
import { DataService } from './service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  title = 'Eindwerk Jonathan Moermans';

  constructor(private http: HttpClient, private data: DataService) {}

  ngOnInit(): void {
    //logging in user based on localstorage credentials
    const lsUsername = localStorage.getItem('username') as string;
    const lsToken = localStorage.getItem('token') as string;

    const authToken: AuthTokenDTO = { username: lsUsername, token: lsToken };

    if (!lsToken || !lsUsername) {
      localStorage.clear();
      return;
    }

    const url = 'http://localhost:8080/auth/validateToken';
    this.http.post(url, authToken).subscribe({
      next: (response: any) => {
        console.log('Token validated - REMOVE THIS CLG', response);
        this.data.setUser(lsUsername);
      },
      error: (error: HttpErrorResponse) => {
        console.log('Token validation failed - log in again');
        console.error(error.error);
        localStorage.clear();
      },
    });
  }
}
