import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Make sure I always import the routing components in app-routing.module
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', redirectTo:'/login', pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'add-weather', loadChildren: () => import('./modules/add-weather/add-weather.module').then(m => m.AddWeatherModule) },
  { path: 'weather-details/:code', loadChildren: () => import('./modules/weather-details/weather-details.module').then(m => m.WeatherDetailsModule) }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
