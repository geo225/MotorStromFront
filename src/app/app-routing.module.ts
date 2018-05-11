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
import { CarAddComponent } from './car-add/car-add.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard', component: HomeComponent,canActivate:[AuthGuard],
    children: [{ path: '', component: DashboardComponent }]
  },

  { path: 'detail/:name', component: HomeComponent,canActivate:[AuthGuard],
    children: [{ path: '', component: CarDetailComponent }]
  },
  { path: 'Newcar', component: HomeComponent,canActivate:[AuthGuard],
    children: [{ path: '', component: CarAddComponent  }]
  },
  { path: 'cars', component: HomeComponent,canActivate:[AuthGuard],
    children: [{ path: '', component: CarsComponent }]
  },
  { path: 'users', component: HomeComponent,canActivate:[AuthGuard],
    children: [{ path: '', component: UserListComponent }]
  },
  {
    path: 'signup', component: UserComponent,
    children: [{ path: '', component: SignUpComponent }]
  },
  {
    path: 'login', component: UserComponent,
    children: [{ path: '', component: SignInComponent }]
  },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
