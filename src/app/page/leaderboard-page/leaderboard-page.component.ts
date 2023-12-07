import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HighScore } from 'src/app/interface/HighScore';

@Component({
  selector: 'app-leaderboard-page',
  templateUrl: './leaderboard-page.component.html',
  styleUrls: ['./leaderboard-page.component.sass'],
})
export class LeaderboardPageComponent implements OnInit {
  public leaderboard: HighScore[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const url = 'http://localhost:8080/highscore/getTop10HighScores';
    this.http.get<HighScore[]>(url).subscribe({
      next: (response) => (this.leaderboard = response),
      error: (error: HttpErrorResponse) => console.log(error.message),
    });
  }
}
