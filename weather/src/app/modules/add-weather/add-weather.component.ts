import { UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-add-weather',
  templateUrl: './add-weather.component.html',
  styleUrls: ['./add-weather.component.css']
})
export class AddWeatherComponent implements OnInit {
  countries$!: Observable<string[]>;
  private searchTerm = new Subject<string>();

  constructor(private ws: WeatherService) { }

  search(country: string){
    console.log(country);
    this.searchTerm.next(country);
  }

  ngOnInit(): void {
    this.countries$ = this.searchTerm.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.ws.searchCitiesWeathersbyName(term.toUpperCase())));
      console.log(this.countries$);
  }

  searchWeatherbyCountryName(): void{
    
  }

}
