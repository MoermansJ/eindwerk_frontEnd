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
}
