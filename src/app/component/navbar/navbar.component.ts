import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { User } from 'src/app/interface/User';
import { DataService } from 'src/app/service/data.service';
import { CookieService as NgxCookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
})
export class NavbarComponent implements OnInit {
  public user: User | null = null;
  public items: MenuItem[] = [];

  constructor(
    private data: DataService,
    private router: Router,
    private cookieService: NgxCookieService
  ) {
    this.initialiseMenuWithDefaultSettings();
  }

  ngOnInit(): void {
    this.data.getUser().subscribe((user: User | null) => {
      this.user = user;
      this.initialiseMenuWithDefaultSettings();
      if (user !== null) {
        this.addUserConfigurationToMenu();
      }
    });
  }

  public logout(): void {
    localStorage.clear();
    this.cookieService.delete('sessionId');
    this.data.setUser(null);
    this.initialiseMenuWithDefaultSettings();
    this.router.navigate(['']);
  }

  private initialiseMenuWithDefaultSettings(): void {
    this.items = [
      {
        label: 'home',
        icon: 'pi pi-fw pi-home',
        routerLink: '/',
      },
      {
        label: 'game',
        icon: 'pi pi-fw pi-box',
        items: [
          { label: 'play', routerLink: '/game' },
          { label: 'leaderboard', routerLink: '/leaderboard' },
        ],
      },
      {
        label: 'account',
        icon: 'pi pi-fw pi-user',
        items: [
          { label: 'log in', routerLink: 'login' },
          { label: 'register', routerLink: 'register' },
        ],
      },
    ];
  }

  private addUserConfigurationToMenu(): void {
    if (this.user == null) return;

    this.items[2].label = this.user?.username;
    this.items[2].items = [
      { label: 'profile', routerLink: '/profile' },
      { label: 'log out', command: () => this.logout() },
    ];
  }
}
