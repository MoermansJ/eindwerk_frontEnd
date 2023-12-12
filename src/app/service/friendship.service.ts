import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Friendship } from '../interface/Friendship';

@Injectable({
  providedIn: 'root',
})
export class FriendshipService {
  private usernameA: string = '';
  private usernameB: string = '';

  constructor(private http: HttpClient) {}

  public addFriend(): void {
    const url = 'http://localhost:8080/friendship/addFriendship';
    const friendship = { usernameA: this.usernameA, usernameB: this.usernameB };

    this.http.post<Friendship>(url, friendship).subscribe({
      next: (response) => console.log(response),
      error: (error: HttpErrorResponse) => console.log(error.error),
    });
  }
}
