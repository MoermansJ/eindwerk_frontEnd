import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HighScore } from 'src/app/interface/HighScore';
import { User } from 'src/app/interface/User';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.sass'],
})
export class ProfilePageComponent {
  public highscore: HighScore | undefined;
  public username: string = '';

  constructor(private http: HttpClient) {
    this.username = localStorage.getItem('username') as string;
    this.fetchHighScoreByUser(this.username);
  }

  private fetchHighScoreByUser(username: String): void {
    const url = `http://localhost:8080/highscore/getHighScoreByUsername?username=${username}`;
    this.http.get<HighScore>(url).subscribe({
      next: (response) => (this.highscore = response),
      // error: (error: HttpErrorResponse) => console.log(error.message),
    });
  }
}
