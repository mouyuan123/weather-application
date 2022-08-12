import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { WeatherService } from 'src/app/services/weather.service';
import { countriesList } from 'src/app/countries';

@Component({
  selector: 'app-add-weather',
  templateUrl: './add-weather.component.html',
  styleUrls: ['./add-weather.component.css']
})
export class AddWeatherComponent implements OnInit {
  // Stores the countries that match the search filter
  countries$!: Observable<string[]>;
  //  Subject can act as both Observables and Observer ( set its latest value by itself using .next() )
  private searchTerm = new Subject<string>();
  countries: string[] = countriesList;

  constructor(private ws: WeatherService) { }

  // Catch each <input> value in the HTML template using subject
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

  searchWeatherbyCountryName(country: string): void{

    console.log(country);
  }

}
