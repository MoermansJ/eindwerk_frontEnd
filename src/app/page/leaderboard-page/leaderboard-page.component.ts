import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { HighScore } from 'src/app/interface/HighScore';

@Component({
  selector: 'app-leaderboard-page',
  templateUrl: './leaderboard-page.component.html',
  styleUrls: ['./leaderboard-page.component.sass'],
})
export class LeaderboardPageComponent {
  public leaderboard: HighScore[] = [];
  public highscore: HighScore[] = [];
  public first: number = 0;
  public rows: number = 10;
  public totalRecords: number = 0;
  private paginationCounter: number = 0;

  constructor(private http: HttpClient) {
    this.fetchLeaderboard();
    this.fetchHighScoreByUser(localStorage.getItem('username') as string);
  }

  private fetchLeaderboard(): void {
    const url = `http://localhost:8080/highscore/getAllHighScores`;

    this.http.get<HighScore[]>(url).subscribe({
      next: (response) => {
        this.leaderboard = response;
      },
      // next: (response: any) => (this.leaderboard = response?.content),
      // next: (response) => console.log(response),
      error: (error: HttpErrorResponse) => console.log(error.error),
    });
  }

  private fetchHighScoreByUser(username: String): void {
    if (!username) return;

    const url = `http://localhost:8080/highscore/getHighScoreByUsername?username=${username}`;

    this.http.get<HighScore>(url).subscribe({
      next: (response) => (this.highscore = Array.of(response)),
      error: (error: HttpErrorResponse) => console.log(error.error),
    });
  }

  public onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
  }
}
