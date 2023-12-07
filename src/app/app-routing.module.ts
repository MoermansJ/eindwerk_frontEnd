import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { RegisterPageComponent } from './page/register-page/register-page.component';
import { HomePageComponent } from './page/home-page/home-page.component';
import { AccountPageComponent } from './page/account-page/account-page.component';
import { GamePageComponent } from './page/game-page/game-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'game', component: GamePageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'account', component: AccountPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
