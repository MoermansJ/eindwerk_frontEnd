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
          { label: 'play', icon: 'pi pi-fw pi-play', routerLink: '/game' },
          {
            label: 'leaderboard',
            icon: 'pi pi-fw pi-globe',
            routerLink: '/leaderboard',
          },
        ],
      },
      {
        label: 'community',
        icon: 'pi pi-fw pi-users',
        items: [
          {
            label: 'search users',
            icon: 'pi pi-fw pi-search',
            routerLink: 'search',
          },
        ],
      },
      {
        label: 'visitor',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'register',
            icon: 'pi pi-fw pi-plus-circle',
            routerLink: 'register',
          },
          { label: 'log in', icon: 'pi pi-fw pi-sign-in', routerLink: 'login' },
        ],
      },
    ];
  }

  private updateNavbarItemsWithUserInfo(navbarItems: any[], user: User) {
    navbarItems[3].label = user.username;
    navbarItems[3].items = [
      {
        label: 'profile',
        icon: 'pi pi-fw pi-user',
        routerLink: '/profile',
      },
      {
        label: 'log out',
        icon: 'pi pi-fw pi-sign-out',
        command: () => this.logout(),
      },
    ];

    return navbarItems;
  }
}
