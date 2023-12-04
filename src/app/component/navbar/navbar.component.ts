import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
})
export class NavbarComponent implements OnInit {
  public user: string = '';
  public items: MenuItem[] = [];

  constructor(private data: DataService, private router: Router) {}

  ngOnInit(): void {
    this.data.getUser().subscribe((user: string) => {
      this.user = user;
      this.initialiseMenu(user);
    });
  }

  public logout(): void {
    if (!this.user) return;
    localStorage.clear();
    this.data.setUser('');
    this.router.navigate(['']);
  }

  private initialiseMenu(user: string): void {
    this.initialiseMenuWithDefaultSettings();

    if (!user) {
      return;
    }

    this.initialiseMenuWithAccountOptions();
  }

  private initialiseMenuWithDefaultSettings(): void {
    this.items = [
      {
        label: 'Game',
        icon: 'pi pi-fw pi-box',
        routerLink: '',
      },
      {
        label: 'Account',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Log in',
            routerLink: 'login',
          },
          {
            label: 'Register',
            routerLink: 'register',
          },
        ],
      },
    ];
  }

  private initialiseMenuWithAccountOptions(): void {
    this.items[1].label = this.user;

    this.items[1].items = [
      {
        label: 'Log out',
        command: () => this.logout(),
      },
    ];
  }
}
