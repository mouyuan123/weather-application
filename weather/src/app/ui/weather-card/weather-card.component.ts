import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, TitleStrategy } from '@angular/router';
import { PageModeService } from 'src/app/services/page-mode.service';
import { WeatherService } from 'src/app/services/weather.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css', '../../../styles.css']
})
export class WeatherCardComponent implements OnInit, OnDestroy {
  isDarkMode!: boolean;
  private readonly unsubscribe$: Subject<void> = new Subject();
  // Store the weather information of each capital in corresponding inde of different array
  @Input() capital!: string;
  currentWeatherState!: string;
  currentTemp!: number;
  currentHum!: number;
  currentWind!: number;
  maxTemp!: number;
  minTemp!: number;

  constructor
  (
    private router: Router,
    private pms: PageModeService,
    private ws: WeatherService
  ) { }

  ngOnInit(): void {
    this.getPageMode();
    this.getCapitalWeather(this.capital);
  }

  getCapitalWeather(capital: string): void{
    this.ws.searchWeatherByCityName(this.capital).subscribe((weather: any) =>
    {
      this.currentWeatherState = weather['weather'][0].main;
      this.currentTemp = Math.round(weather.main.temp);
      this.currentHum = weather.main.humidity;
      this.currentWind = Math.round(weather.wind.speed);
    })
    this.ws.getWeatherForecast(this.capital).pipe(takeUntil(this.unsubscribe$)).subscribe((forecast: any) =>
    {
      let max =forecast.list[0].main.temp;
      forecast.list.forEach((value: any) => {
        if (max < value.main.temp) {
          max = value.main.temp;
        }
      });
      this.maxTemp = Math.round(max)
      let min = forecast.list[0].main.temp;
      forecast.list.forEach((value: any) => {
        if (min > value.main.temp) {
          min = value.main.temp;
        }
      });
      this.minTemp = Math.round(min)
    })
  }

  getPageMode(): void{
    this.pms.getPageMode().pipe(takeUntil(this.unsubscribe$)).subscribe(mode => this.isDarkMode = mode);
  }

  viewWeatherDetails(capital: string): void{
    this.router.navigate(['/weather-details'], {queryParams:{country: capital}})
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
