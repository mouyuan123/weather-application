import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherDetailsRoutingModule } from './weather-details-routing.module';
import { WeatherDetailsComponent } from './weather-details.component';


@NgModule({
  declarations: [
    WeatherDetailsComponent
  ],
  imports: [
    CommonModule,
    WeatherDetailsRoutingModule
  ]
})
export class WeatherDetailsModule { }
