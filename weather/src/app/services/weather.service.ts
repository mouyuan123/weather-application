/**
 * Retrieve the weather of the countries/country using OpenWeatherMap Api (Free Subscription Plan)
 * Guide to start -> https://openweathermap.org/appid
 */
import { Injectable } from '@angular/core';
import { countriesList } from '../countries';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

constructor(private http: HttpClient) { }

// // Filter search of countries
// searchCitiesWeathersbyName(cities: string[]): Subject<any>{
//   // Subject can serve as both Observable and observer (.next())
//   const citiesList = new Subject<any>();
//   cities.forEach(city => citiesList.next(this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=83939b8a3d51b9cee7d00e5732cd4509`)));
//   return citiesList;
// }

// Filter search of countries
searchCitiesWeathersbyName(city: string): Observable<any>{
  // Check whether it is a proper search after remove excess spaces from front and back
  if(!city.trim()){
    return of([]);
  }
  return of(countriesList.filter(country => country.startsWith(city)));
}
}
