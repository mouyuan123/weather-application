/**
 * Retrieve the weather of the countries/country using OpenWeatherMap Api (Free Subscription Plan)
 * Guide to start -> https://openweathermap.org/appid
 */
import { Injectable } from '@angular/core';
import { countriesList } from '../countries';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

constructor(private http: HttpClient) { }

// Filter search of countries
searchCountriesName(city: string): Observable<any>{
  // Check whether it is a proper search after remove excess spaces from front and back
  if(!city.trim()){
    return of([]);
  }
  return of(countriesList.filter(country => country.startsWith(city)));
}
}


