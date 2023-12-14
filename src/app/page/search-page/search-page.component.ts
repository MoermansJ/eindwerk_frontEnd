import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Friendship } from 'src/app/interface/Friendship';
import { User } from 'src/app/interface/User';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.sass'],
})
export class SearchPageComponent {
  public searchInput: string = '';
  public searchedProfile: User | undefined;

  constructor(private http: HttpClient) {}

  public searchForUser(): void {
    const url = `http://localhost:8080/search/searchForUserByUsername?username=${this.searchInput}`;
    this.http.get<User>(url).subscribe({
      next: (response) => (this.searchedProfile = response),
      error: (error: HttpErrorResponse) => console.log(error.error),
    });
  }

  public sendFriendRequest(friendUsername: string): void {
    const url = `http://localhost:8080/friendship/addFriendship`;
    const myUsername = localStorage.getItem('username');
    const newFriendship = {
      usernameA: myUsername,
      usernameB: friendUsername,
    } as Friendship;

    this.sendFriendRequestHttpRequest(url, newFriendship);
  }

  private sendFriendRequestHttpRequest(
    url: string,
    friendship: Friendship
  ): void {
    this.http.post<Friendship>(url, friendship).subscribe({
      next: (response) => console.log(response),
      error: (error: HttpErrorResponse) => console.log(console.error),
    });
  }
}
