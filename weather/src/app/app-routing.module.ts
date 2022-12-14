import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Make sure I always import the routing components in app-routing.module
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { ProfileComponent } from './components/profile/profile.component';

// Authentication guard to protect the inner page of the website from unauthorized access
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo:'/login', pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'password-reset', component: PasswordResetComponent},
  // I will use lazy-loading module to run the component that requires REST API to avoid slower loading at initial
  { path: 'add-weather', loadChildren: () => import('./modules/add-weather/add-weather.module').then(m => m.AddWeatherModule), canActivate: [AuthGuard] },
  { path: 'weather-details', loadChildren: () => import('./modules/weather-details/weather-details.module').then(m => m.WeatherDetailsModule), canActivate: [AuthGuard] },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
