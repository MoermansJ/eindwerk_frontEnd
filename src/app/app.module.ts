import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { RegisterPageComponent } from './page/register-page/register-page.component';
import { HomePageComponent } from './page/home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CookiePopupComponent } from './component/cookie-popup/cookie-popup.component';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { PasswordModule } from 'primeng/password';
import { PanelMenuModule } from 'primeng/panelmenu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GamePageComponent } from './page/game-page/game-page.component';
import { StyleClassModule } from 'primeng/styleclass';
import { ProfilePageComponent } from './page/profile-page/profile-page.component';
import { LeaderboardPageComponent } from './page/leaderboard-page/leaderboard-page.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { TetrisComponent } from './component/tetris/tetris.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    CookiePopupComponent,
    GamePageComponent,
    ProfilePageComponent,
    LeaderboardPageComponent,
    TetrisComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ButtonModule,
    MenubarModule,
    SplitButtonModule,
    PasswordModule,
    PanelMenuModule,
    StyleClassModule,
    BreadcrumbModule,
    TableModule,
    CardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
