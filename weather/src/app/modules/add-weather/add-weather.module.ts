import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddWeatherRoutingModule } from './add-weather-routing.module';
import { AddWeatherComponent } from './add-weather.component';


@NgModule({
  declarations: [
    AddWeatherComponent
  ],
  imports: [
    CommonModule,
    AddWeatherRoutingModule
  ]
})
export class AddWeatherModule { }
