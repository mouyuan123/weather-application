import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Make sure I always import the routing components in app-routing.module
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo:'/home', pathMatch:'full'},
  { path: 'home', component: HomeComponent },
  { path: 'add-weather', loadChildren: () => import('./modules/add-weather/add-weather.module').then(m => m.AddWeatherModule) },
  { path: 'weather-details/:code', loadChildren: () => import('./modules/weather-details/weather-details.module').then(m => m.WeatherDetailsModule) }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
