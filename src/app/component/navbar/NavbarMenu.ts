import { Router } from '@angular/router';
import { User } from 'src/app/interface/User';
import { CookieService as NgxCookieService } from 'ngx-cookie-service';
import { DataService } from 'src/app/service/data.service';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class NavbarMenu {
  public items: any | undefined;

  constructor(
    private router: Router,
    private cookieService: NgxCookieService,
    private data: DataService
  ) {
    this.items = NavbarMenu.getDefaultItems();
  }

  public logout(): void {
    this.clearLocallySavedUserDetails();
    this.router.navigate(['']);
  }

  private clearLocallySavedUserDetails(): void {
    localStorage.clear();
    this.cookieService.delete('sessionId');
    this.data.setUser(undefined);
    this.items = NavbarMenu.getDefaultItems();
  }

  public getNavbarItemsWithUserInfo(user: User): any[] {
    const defaultItems: any[] = NavbarMenu.getDefaultItems();

    if (!user) return defaultItems;

    return this.updateNavbarItemsWithUserInfo(defaultItems, user);
  }

  private updateNavbarItemsWithUserInfo(navbarItems: any[], user: User) {
    navbarItems[2].label = user.username;
    navbarItems[2].items = [
      { label: 'profile', routerLink: '/profile' },
      { label: 'log out', command: () => this.logout() },
    ];

    return navbarItems;
  }

  private static getDefaultItems(): any {
    return [
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
        label: 'visitor',
        icon: 'pi pi-fw pi-user',
        items: [
          { label: 'log in', routerLink: 'login' },
          { label: 'register', routerLink: 'register' },
        ],
      },
    ];
  }
}
