import { Component, OnInit, OnDestroy} from '@angular/core';
import { PageModeService } from 'src/app/services/page-mode.service';
import { WeatherService } from 'src/app/services/weather.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
/**
 * Used to unsubscribe the Observable / Subject whenever the component is destroyed to avoid memory leak
 * Memory Leak in my case: redundant components / elements displayed repeatedly
 * */
import { Subject, takeUntil } from 'rxjs';

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
  // Display the loading animation when the fetch from API is incomplete
  isLoading = true;
  /**
   *  readonly => Reassignment in the component class itself only
   *           => Used to define the properties of a component
   * */ 
  private readonly unsubscribe$: Subject<void> = new Subject();

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
    this.pm.getPageMode()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(pageMode => this.isDarkMode = pageMode);
  }

  /**
   * Retreive the capital list that is added by the user (to display real time weather [3 hours interval] of each capital)
   */
  getUserCapitalList(): void{
    this.isLoading = true;
    this.firebase.getUserCapitalList()
    // Make sure the takeUntil() is always the last function in pipe() => *Best practice
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((user: any) => {user.capitalList.forEach((element: any) => {
      this.capitals.push(element);
      this.ws.getWeatherState(element).pipe(takeUntil(this.unsubscribe$)).subscribe(state => this.currentWeatherState.push(state));
      this.ws.getCurrentTemp(element).pipe(takeUntil(this.unsubscribe$)).subscribe(temp => this.currentTemp.push(temp));
      this.ws.getCurrentHum(element).pipe(takeUntil(this.unsubscribe$)).subscribe(humidity => this.currentHum.push(humidity));
      this.ws.getCurrentWind(element).pipe(takeUntil(this.unsubscribe$)).subscribe(windSpeed => this.currentWind.push(windSpeed));
      this.ws.getMaxTemp(element).pipe(takeUntil(this.unsubscribe$)).subscribe(maxTemp => this.maxTemp.push(maxTemp));
      this.ws.getMinTemp(element).pipe(takeUntil(this.unsubscribe$)).subscribe(minTemp => this.minTemp.push(minTemp));
    })
    this.isLoading = false;});
  }

  viewWeatherDetails(capital: string): void{
    this.router.navigate(['/weather-details'], {queryParams:{country: capital}})
  }

  /**
   * Whenever a component is destroyed, unsubscribe$.next() emit a new value so that the observer unsubscribe
   * to the observable using takeUntil()
   */
  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
