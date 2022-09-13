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
    this.ws.getWeatherState(capital).pipe(takeUntil(this.unsubscribe$)).subscribe(state => this.currentWeatherState = state);
    this.ws.getCurrentTemp(capital).pipe(takeUntil(this.unsubscribe$)).subscribe(temp => this.currentTemp = temp);
    this.ws.getCurrentHum(capital).pipe(takeUntil(this.unsubscribe$)).subscribe(humidity => this.currentHum = humidity);
    this.ws.getCurrentWind(capital).pipe(takeUntil(this.unsubscribe$)).subscribe(windSpeed => this.currentWind = windSpeed);
    this.ws.getMaxTemp(capital).pipe(takeUntil(this.unsubscribe$)).subscribe(maxTemp => this.maxTemp = maxTemp);
    this.ws.getMinTemp(capital).pipe(takeUntil(this.unsubscribe$)).subscribe(minTemp => this.minTemp = minTemp);
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
