import { Component, OnInit } from '@angular/core';
import { PageModeService } from 'src/app/services/page-mode.service';
import { weather } from 'src/app/weather';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css','../../../styles.css']
})
export class HomeComponent implements OnInit{
  weatherLists?: weather[];
  isDarkMode!: boolean;

  constructor(private pm: PageModeService, private ws: WeatherService) { }

  ngOnInit(): void {
    // this.ws.getWeathers().subscribe(lists => this.weatherLists = lists);
    this.getPageMode();
  }

  /**
   * As a projection to get the page mode from the "PageModeService"
   * Projection: Get the data from a producer to process the data / carry out other business logic
   *             while retaining the original data source
   */
  getPageMode(): void{
    this.pm.getPageMode().subscribe(pageMode => this.isDarkMode = pageMode);
  }
}
