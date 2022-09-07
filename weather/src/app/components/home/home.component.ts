import { Component, OnInit, OnDestroy} from '@angular/core';
import { PageModeService } from 'src/app/services/page-mode.service';
import { WeatherService } from 'src/app/services/weather.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css','../../../styles.css']
})


export class HomeComponent implements OnInit, OnDestroy{
  isDarkMode!: boolean;
  // Store the weather information of each capital in corresponding inde of different array
  capitals: string[] = [];
  currentWeatherState: string[] = [];
  currentTemp: number[] = [];
  currentHum: number[] = [];
  currentWind: number[] = [];
  maxTemp: number[] = [];
  minTemp: number[] = [];
  // Destroy the subscription when the component is destroyed
  subscription!: Subscription;
  subscription2!: Subscription;
  subscription3!: Subscription;
  subscription4!: Subscription;
  subscription5!: Subscription;
  subscription6!: Subscription;
  subscription7!: Subscription;
  // Display the loading animation when the fetch from API is incomplete
  isLoading = true;

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
    this.isLoading = true;
    this.subscription = this.firebase.getUserCapitalList().subscribe((user: any) => {user.capitalList.forEach((element: any) => {
      this.capitals.push(element);
    this.subscription2 =  this.ws.getWeatherState(element).subscribe(state => this.currentWeatherState.push(state));
    this.subscription3 =  this.ws.getCurrentTemp(element).subscribe(temp => this.currentTemp.push(temp));
    this.subscription4 =  this.ws.getCurrentHum(element).subscribe(humidity => this.currentHum.push(humidity));
    this.subscription5 =  this.ws.getCurrentWind(element).subscribe(windSpeed => this.currentWind.push(windSpeed));
    this.subscription6 =  this.ws.getMaxTemp(element).subscribe(maxTemp => this.maxTemp.push(maxTemp));
    this.subscription7 =  this.ws.getMinTemp(element).subscribe(minTemp => this.minTemp.push(minTemp));
    })
    this.isLoading = false;});
  }

  viewWeatherDetails(capital: string): void{
    this.router.navigate(['/weather-details'], {queryParams:{country: capital}})
  }

  ngOnDestroy(){
    console.log(this.capitals);
    this.subscription2.unsubscribe();
    this.subscription3.unsubscribe();
    this.subscription4.unsubscribe();
    this.subscription5.unsubscribe();
    this.subscription6.unsubscribe();
    this.subscription7.unsubscribe();
    this.subscription.unsubscribe();
    this.capitals = [];
    this.currentWeatherState = [];
    this.currentTemp = [];
    this.currentHum = [];
    this.currentWind = [];
    this.maxTemp = [];
    this.minTemp = [];
  }
}
