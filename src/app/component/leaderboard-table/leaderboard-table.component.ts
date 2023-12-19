import { Component, Input } from '@angular/core';
import { HighScore } from 'src/app/interface/HighScore';

@Component({
  selector: 'app-leaderboard-table',
  templateUrl: './leaderboard-table.component.html',
  styleUrls: ['./leaderboard-table.component.sass'],
})
export class LeaderboardTableComponent {
  @Input() public leaderboardData: HighScore[] = [];
  @Input() public boardStartIndex: number = 0;

  public updateBoardStartIndex(factor: number): void {
    if (factor == 1 && this.boardStartIndex > this.leaderboardData.length - 1)
      return;
    if (factor == -1 && this.boardStartIndex <= 0) return;

    this.boardStartIndex += factor * 10;
  }
}
