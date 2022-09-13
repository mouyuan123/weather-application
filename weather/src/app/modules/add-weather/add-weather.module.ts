import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddWeatherRoutingModule } from './add-weather-routing.module';
import { AddWeatherComponent } from './add-weather.component';


@NgModule({
  declarations: [
    AddWeatherComponent
  ],
  imports: [
    CommonModule,
    AddWeatherRoutingModule,
    FormsModule
  ]
})
export class AddWeatherModule { }
