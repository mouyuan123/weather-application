import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddWeatherComponent } from './add-weather.component';

const routes: Routes = [{ path: '', component: AddWeatherComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddWeatherRoutingModule { }
