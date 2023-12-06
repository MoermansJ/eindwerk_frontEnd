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
    this.getUserFromLocalStorageCredentials();
  }

  private getUserFromLocalStorageCredentials(): void {
    const lsUsername = localStorage.getItem('username') as string;
    const lsToken = localStorage.getItem('token') as string;
    const authToken = { username: lsUsername, token: lsToken } as AuthTokenDTO;

    if (!lsToken || !lsUsername) {
      localStorage.clear();
      return;
    }

    this.validateToken(authToken);
  }

  private validateToken(authToken: AuthTokenDTO) {
    const url = 'http://localhost:8080/auth/validateToken';
    this.http.post(url, authToken).subscribe({
      next: (response: any) => {
        this.data.setUser(response);
      },
      error: (error: HttpErrorResponse) => {
        console.log('Token validation failed - log in again');
        console.error(error.error);
        localStorage.clear();
      },
    });
  }
}
