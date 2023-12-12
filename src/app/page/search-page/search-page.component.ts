import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from 'src/app/interface/User';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.sass'],
})
export class SearchPageComponent {
  public username: string = '';
  public searchResult: string = '';

  constructor(private http: HttpClient) {}

  public onChange(): void {
    const url = `http://localhost:8080/search/searchForUserByUsername?username=${this.username}`;
    this.http.get<User>(url).subscribe({
      next: (response) =>
        (this.searchResult = 'Your search result = ' + response.username),
      error: (error: HttpErrorResponse) =>
        (this.searchResult = 'Your search result = ' + error.error),
    });
  }
}
