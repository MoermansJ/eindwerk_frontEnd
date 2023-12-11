import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { User } from 'src/app/interface/User';
import { DataService } from 'src/app/service/data.service';
import { NavbarMenu } from './NavbarMenu';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
})
export class NavbarComponent {
  public user: User | undefined;
  public items: MenuItem[] = [];

  constructor(private data: DataService, private navbarMenu: NavbarMenu) {
    this.items = this.navbarMenu.items;
    this.initialiseSubscriptions();
  }

  private initialiseSubscriptions(): void {
    this.data
      .getUser()
      .subscribe(
        (response) =>
          (this.items = this.navbarMenu.getNavbarItemsWithUserInfo(
            response as User
          ))
      );
  }
}
