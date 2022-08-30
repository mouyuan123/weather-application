import { Component, OnInit } from '@angular/core';
import { PageModeService } from 'src/app/services/page-mode.service';
import { WeatherService } from 'src/app/services/weather.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
import { interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css','../../../styles.css']
})
export class HomeComponent implements OnInit{
  isDarkMode!: boolean;
  // Store the weather information of each capital in corresponding inde of different array
  capitals: string[] = [];
  currentWeatherState: string[] = [];
  stateImg: string[] = [];
  currentTemp: number[] = [];
  currentHum: number[] = [];
  currentWind: number[] = [];
  maxTemp: number[] = [];
  minTemp: number[] = [];

  constructor(private pm: PageModeService, private ws: WeatherService, private firebase: FirebaseService, private router: Router) { }

  ngOnInit(): void {
    this.getPageMode();
    // Retrieve the latest capital lists of a specific user (document) from users (collection) in Firestore
    this.getUserCapitalList();
  }

  /**
   * As a projection to get the page mode from the "PageModeService"
   * Projection: Get the data from a producer to process the data / carry out other business logic
   *             while retaining the original data source
   */
  getPageMode(): void{
    this.pm.getPageMode().subscribe(pageMode => this.isDarkMode = pageMode);
  }

  /**
   * Retreive the capital list that is added by the user (to display real time weather [3 hours interval] of each capital)
   */
  getUserCapitalList(): void{
    this.firebase.getUserCapitalList().subscribe((user: any) => user.capitalList.forEach((element: any) => {
      this.capitals.push(element);
      this.ws.getWeatherState(element).subscribe(state => {this.currentWeatherState.push(state); 
        switch(state){
          case "Clouds": this.stateImg.push('../../assets/images/cloudy-weather.png'); break;
          case 'Rain' ||'Drizzle': this.stateImg.push('../../assets/images/heavy-rain-weather.png'); break;
          case 'Storm' || 'Thunderstorm': this.stateImg.push( '../../assets/images/storm-weather.png'); break;
          case 'Sunny' || 'Clear': this.stateImg.push('../../assets/images/sunny-weather.png'); break;
          default: this.stateImg.push('../../assets/images/snowing-weather.png');
        }});
      this.ws.getCurrentTemp(element).subscribe(temp => this.currentTemp.push(temp));
      this.ws.getCurrentHum(element).subscribe(humidity => this.currentHum.push(humidity));
      this.ws.getCurrentWind(element).subscribe(windSpeed => this.currentWind.push(windSpeed));
      this.ws.getMaxTemp(element).subscribe(maxTemp => this.maxTemp.push(maxTemp));
      this.ws.getMinTemp(element).subscribe(minTemp => this.minTemp.push(minTemp));
    }));
  }

  viewWeatherDetails(capital: string): void{
    this.router.navigate(['/weather-details'], {queryParams:{country: capital}})
  }
}
