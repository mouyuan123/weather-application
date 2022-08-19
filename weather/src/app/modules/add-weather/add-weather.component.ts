import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { countriesList } from 'src/app/countries';
import { Form, NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-add-weather',
  templateUrl: './add-weather.component.html',
  styleUrls: ['./add-weather.component.css']
})
export class AddWeatherComponent implements OnInit {
  countries: string[] = countriesList;
  // To set the initial value of search input
  searchValue = "";
  // Store the capitals of the countries fetched from the web server (https://restcountries.com/v3.1/all)
  capitals: string[] = [];
  // Check whether the user first navigating to this section
  isFirstTime = true;
  // Check whether the capital entered is valid
  isCapitalValid = true;

  constructor(private http: HttpClient, private ws: WeatherService, private location: Location) { }

  ngOnInit(): void {
    this.http.get('https://restcountries.com/v3.1/all')
    .subscribe((countries: any) => {countries.forEach((country: any) => {if(country.capital){ let capital = country.capital[0].toUpperCase(); this.capitals.push(capital);}});
                                    this.capitals.sort()});
}

  searchWeatherByCityName(weatherForm: NgForm): void{
    this.checkCapital(this.searchValue);
    if(this.isCapitalValid){
      const weather: Subject<string> = this.ws.searchWeatherByCityName(this.searchValue);
      weather.subscribe(here => console.log(here));
      this.isFirstTime = false;
      this.resetForm();
    }
    else{
      this.isFirstTime = false;
    }
  }
  
  // Reset the inout value to empty string whenever the form is submitted
  resetForm(): void{
    this.searchValue = "";
  }

  // Check whether the user choose the capital from the datalist (Only support capitals here)
  checkCapital(userInput: string): void{
    if(this.capitals.includes(userInput)){
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
 
