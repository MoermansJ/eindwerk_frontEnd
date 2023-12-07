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
export class ProfilePageComponent implements OnInit {
  public highscore: HighScore | null = null;

  constructor(private http: HttpClient, private data: DataService) {}

  public ngOnInit(): void {
    const username = localStorage.getItem('username') as string;
    this.fetchHighScoreByUser(username);
  }

  private fetchHighScoreByUser(username: String): void {
    const url = `http://localhost:8080/highscore/getHighScoreByUsername?username=${username}`;
    this.http.get(url).subscribe({
      next: (response) => (this.highscore = response as HighScore),
      error: (error: HttpErrorResponse) => console.log(error.message),
    });
  }
}
