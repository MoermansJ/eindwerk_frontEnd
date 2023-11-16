import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
})
export class NavbarComponent implements OnInit {
  //properties
  public user: string = '';

  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.data.getUser().subscribe((user: string) => {
      this.user = user;
    });
  }

  public logout(): void {
    if (!this.user) return;
    this.data.setUser('');
    localStorage.clear();
  }
}
