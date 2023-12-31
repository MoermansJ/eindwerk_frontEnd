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
import { TetrisComponent } from './component/tetris/component/tetris.component';
import { PaginatorModule } from 'primeng/paginator';
import { SliderModule } from 'primeng/slider';
import { Panel, PanelModule } from 'primeng/panel';
import { FieldsetModule } from 'primeng/fieldset';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SearchPageComponent } from './page/search-page/search-page.component';
import { UserSearchCardComponent } from './component/user-search-card/user-search-card.component';
import { LeaderboardTableComponent } from './component/leaderboard-table/leaderboard-table.component';
import { LeaderboardUserHighscoreComponent } from './component/leaderboard-user-highscore/leaderboard-user-highscore.component';

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
    SearchPageComponent,
    UserSearchCardComponent,
    LeaderboardTableComponent,
    LeaderboardUserHighscoreComponent,
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
    PaginatorModule,
    SliderModule,
    FieldsetModule,
    PanelModule,
    ProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
