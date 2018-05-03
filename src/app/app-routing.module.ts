import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import  { CarsComponent} from "./cars/cars.component";
import { DashboardComponent} from "./dashboard/dashboard.component";
import {CarDetailComponent} from "./car-detail/car-detail.component";
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component'

const routes: Routes = [
  { path: 'home', component: HomeComponent,canActivate:[AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard] },
  { path: 'detail/:name', component: CarDetailComponent,canActivate:[AuthGuard]},
  { path: 'cars', component: CarsComponent,canActivate:[AuthGuard] },
  {path: 'signup', component: SignUpComponent},
  {path: 'login', component: SignInComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
