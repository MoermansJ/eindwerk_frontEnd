import { Component, Input } from '@angular/core';
import { HighScore } from 'src/app/interface/HighScore';

@Component({
  selector: 'app-leaderboard-user-highscore',
  templateUrl: './leaderboard-user-highscore.component.html',
  styleUrls: ['./leaderboard-user-highscore.component.sass'],
})
export class LeaderboardUserHighscoreComponent {
  @Input() public userHighscoreData: HighScore[] = [];
}
