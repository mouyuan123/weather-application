import { Component, OnInit } from '@angular/core';
import { PageModeService } from 'src/app/services/page-mode.service';
import { weather } from 'src/app/weather';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css']
})
export class WeatherDetailsComponent implements OnInit {

  isDarkMode!: boolean;

  constructor(private pms: PageModeService, private ws: WeatherService) { }

  ngOnInit(): void {
  }

  getPageMode(): void{
    this.pms.getPageMode().subscribe(pageMode => this.isDarkMode = pageMode);
  }

}
