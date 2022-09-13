import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherDetailsComponent } from './weather-details.component';

const routes: Routes = [{ path: '', component: WeatherDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherDetailsRoutingModule { }
