import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { PageModeService } from 'src/app/services/page-mode.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Subject, takeUntil } from 'rxjs';


@Component({
selector: 'app-add-weather',
templateUrl: './add-weather.component.html',
styleUrls: ['./add-weather.component.css','../../../styles.css']
})
export class AddWeatherComponent implements OnInit, OnDestroy {
// Check the page mode
isDarkMode!: boolean;
// addedCapitals: string[] = [];
// To set the initial value of search input
searchValue = "";
// Store the capitals of the countries fetched from the web server (https://restcountries.com/v3.1/all)
capitals: string[] = [];
// Check whether the user first navigating to this section
isFirstTime = true;
// Check whether the capital entered is valid
isCapitalValid = true;
// Create a weather instance if the capital exists in OpenWeatherMap API
capital!: string;
currentWeatherState!: string;
stateImg!: string;
currentTemp!: number;
currentHum!: number;
currentWind!: number;
maxTemp!: number;
minTemp!: number;
foreCast!: Array<any>
// Check to enable / disbale "Add" button
capitalList!: string[];
isAdded!: boolean;
// Toggle between "Add" & "Added" text for submit button
btnText!: string;
//
isLoading = true;
private readonly unsubscribe$: Subject<void> = new Subject();


constructor(private http: HttpClient, private ws: WeatherService, private location: Location, private pm: PageModeService, private firebase: FirebaseService) { }

ngOnInit(): void {
  // Set the page mode based on the button toggling
  this.pm.getPageMode().pipe(takeUntil(this.unsubscribe$)).subscribe(pageMode => this.isDarkMode = pageMode);
  // Get the list of "Capital" of all the countries from API (https://restcountries.com/v3.1/all)
  this.http.get('https://restcountries.com/v3.1/all')
  .pipe(takeUntil(this.unsubscribe$))
  .subscribe((countries: any) => {countries.forEach((country: any) => {if(country.capital){ let capital = country.capital[0].toUpperCase(); this.capitals.push(capital);}});
                                  this.capitals.sort();
                                this.isLoading = false;});
  // Get the capital lists of specific user from the Firestore
  this.getUserCapitalList();
}

// Search all the relevant information of weather of a capital when "Search" button is clicked
searchWeatherByCityName(weatherForm: NgForm): void{
this.checkCapital(this.searchValue);
if(this.isCapitalValid){
  this.capital = this.searchValue;
  this.ws.getWeatherState(this.capital).pipe(takeUntil(this.unsubscribe$)).subscribe(state => {this.currentWeatherState = state; 
                                                            switch(this.currentWeatherState){
                                                              case "Clouds": this.stateImg = '../../assets/images/cloudy-weather.png'; break;
                                                              case 'Rain' ||'Drizzle': this.stateImg = '../../assets/images/heavy-rain-weather.png'; break;
                                                              case 'Storm' || 'Thunderstorm': this.stateImg = '../../assets/images/storm-weather.png'; break;
                                                              case 'Sunny' || 'Clear': this.stateImg ='../../assets/images/sunny-weather.png'; break;
                                                              default: this.stateImg = '../../assets/images/snowing-weather.png';
                                                            }});
  this.ws.getCurrentTemp(this.capital).pipe(takeUntil(this.unsubscribe$)).subscribe(temp => this.currentTemp = temp);
  this.ws.getCurrentHum(this.capital).pipe(takeUntil(this.unsubscribe$)).subscribe(humidity => this.currentHum = humidity);
  this.ws.getCurrentWind(this.capital).pipe(takeUntil(this.unsubscribe$)).subscribe(windSpeed => this.currentWind = windSpeed);
  this.ws.getMaxTemp(this.capital).pipe(takeUntil(this.unsubscribe$)).subscribe(maxTemp => this.maxTemp = maxTemp);
  this.ws.getMinTemp(this.capital).pipe(takeUntil(this.unsubscribe$)).subscribe(minTemp => this.minTemp = minTemp);
  this.toggleAddWeatherBtn();
}
this.resetForm();
this.isFirstTime = false;
}

// Reset the inout value to empty string whenever the form is submitted
resetForm(): void{
  this.searchValue = "";
}

// Check whether the user choose the capital from the datalist (Only support capitals here)
checkCapital(userInput: string): void{
  if(this.capitals.indexOf(userInput) !== -1){
    this.isCapitalValid = true;
  }
  else{
    this.isCapitalValid = false;
  }
}

// Back to the previous component's section
goBack(): void{
  // this.isFirstTime = true;
  this.location.back();
}

/**
 * Retreive the capital list that is added by the user (to display real time weather [3 hours interval] of each capital)
 */
  getUserCapitalList(): void{
  this.firebase.getUserCapitalList().pipe(takeUntil(this.unsubscribe$)).subscribe((user: any) => this.capitalList = user.capitalList);
}

// Toggle between 'Add' and 'Added' button
toggleAddWeatherBtn(): void{
  // Check whether the "Add" button should be disabled when the "Search" button is clicked
  this.isAdded = this.capitalList.indexOf(this.capital) !== -1;
  if(this.isAdded){
    this.btnText = 'Added';
  }
  else{
    this.btnText = 'Add';
  }
}

addUserCapitalWeather(capital: string): void{
  this.isLoading = true;
  this.firebase.addUserCapitalWeather(capital)
  .then(value =>{
    this.isAdded = value; 
    this.toggleAddWeatherBtn();
    this.isLoading = false;});
}

ngOnDestroy(): void {
  this.unsubscribe$.next();
  this.unsubscribe$.complete();
}
}
/** 
 *    To do search filter for data fetched from the API /server
 * 
 *    import { Observable, Subject } from 'rxjs';
    import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
* 
*    // Stores the countries that match the search filter
    countries$!: Observable<string[]>;
    //  Subject can act as both Observables and Observer ( set its latest value by itself using .next() )
    private searchTerm = new Subject<string>();

*     // Catch each <input> value in the HTML template using subject
    search(country: string){
      this.searchTerm.next(country);
    }

    ngOnInit(): void {
      this.countries$ = this.searchTerm.pipe(
        // wait 300ms after each keystroke before considering the term
        debounceTime(300),

        // ignore new term if same as previous term
        distinctUntilChanged(),

        // cancels and discards previous search observables, 
        // returning only the latest search service observable from the most recent http call every 300ms
        switchMap((term: string) => this.ws.searchCountriesName(term.toUpperCase())));
    }
*/

