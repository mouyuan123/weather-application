import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { countriesList } from 'src/app/countries';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PageModeService } from 'src/app/services/page-mode.service';


@Component({
  selector: 'app-add-weather',
  templateUrl: './add-weather.component.html',
  styleUrls: ['./add-weather.component.css','../../../styles.css']
})
export class AddWeatherComponent implements OnInit {
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
  addedCapitals: string[] = [];
  isAdded!: boolean;

  constructor(private http: HttpClient, private ws: WeatherService, private location: Location, private pm: PageModeService) { }

  ngOnInit(): void {

    // Set the page mode based on the button toggling
    this.pm.getPageMode().subscribe(pageMode => this.isDarkMode = pageMode);
    // Get the list of "Capital" of all the countries from API (https://restcountries.com/v3.1/all)
    this.http.get('https://restcountries.com/v3.1/all')
    .subscribe((countries: any) => {countries.forEach((country: any) => {if(country.capital){ let capital = country.capital[0].toUpperCase(); this.capitals.push(capital);}});
                                    this.capitals.sort()});
}

  searchWeatherByCityName(weatherForm: NgForm): void{
    this.checkCapital(this.searchValue);
    if(this.isCapitalValid){
      this.capital = this.searchValue;
      this.ws.getWeatherState(this.capital).subscribe(state => {this.currentWeatherState = state; 
                                                                switch(this.currentWeatherState){
                                                                  case "Clouds": this.stateImg = '../../assets/images/cloudy-weather.png'; break;
                                                                  case 'Rain' ||'Drizzle': this.stateImg = '../../assets/images/heavy-rain-weather.png'; break;
                                                                  case 'Storm' || 'Thunderstorm': this.stateImg = '../../assets/images/storm-weather.png'; break;
                                                                  case 'Sunny' || 'Clear': this.stateImg ='../../assets/images/sunny-weather.png'; break;
                                                                  default: this.stateImg = '../../assets/images/snowing-weather.png';
                                                                
                                                                }});
      this.ws.getCurrentTemp(this.capital).subscribe(temp => this.currentTemp = temp);
      this.ws.getCurrentHum(this.capital).subscribe(humidity => this.currentHum = humidity);
      this.ws.getCurrentWind(this.capital).subscribe(windSpeed => this.currentWind = windSpeed);
      this.ws.getMaxTemp(this.capital).subscribe(maxTemp => this.maxTemp = maxTemp);
      this.ws.getMinTemp(this.capital).subscribe(minTemp => this.minTemp = minTemp);
      this.ws.getForecast(this.capital).subscribe(forecastOfFiveDays => this.foreCast = forecastOfFiveDays);
      // Check to enable / disable the button when "Search" icon is clicked
      this.isAddedButtonNeeded();
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

  // Add the capital that I want
  addCapitals(): void{
    this.ws.addCapitals(this.capital).subscribe(() => console.log("Add a city successfully!"));
    // Disable "Add" button when it is clicked
    this.isAddedButtonNeeded();
  }

  // Check whether the "Add" button should be disabled
  isAddedButtonNeeded(): void{
    this.ws.getCapitals().subscribe(capitals => {this.addedCapitals = capitals;
      if(this.addedCapitals.indexOf(this.capital) !== -1){
        this.isAdded = true;
      }
      else{
        this.isAdded = false;
      }
    });
  }
  // If the "Add" button is clicked, I will add the capital weather into the JSON-Server I created here
  // addWeather(): void{
  //   this.ws.addWeather(this.capital, this.currentWeatherState, this.stateImg, this.currentTemp, this.currentHum, this.currentWind, this.maxTemp, this.minTemp, this.foreCast).subscribe(() => console.log("You have added a weather successfully!"));
  //   this.addedCapitals.push(this.capital);
  // }

  // // Check whether to enable or disable "Add" button
  // isAddButtonNeeded(): boolean{
  //   console.log(this.addedCapitals);
  //   return this.addedCapitals.includes(this.capital);
  // }
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
 
