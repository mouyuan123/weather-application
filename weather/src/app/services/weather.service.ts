/**
 * Retrieve the weather of the countries/country using OpenWeatherMap Api (Free Subscription Plan)
 * Guide to start -> https://openweathermap.org/appid
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, Subject, tap, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { weather } from '../weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  capitalAdded:string[] = [];
  httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json'})};

constructor(private http: HttpClient) { }

// Search the weather of specific capital of a country (Accepts only Celsius format here => units='metric')
searchWeatherByCityName(cityName: string): Subject<string>{
  const dataSub = new Subject<string>();
  this.http.get(
  `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=83939b8a3d51b9cee7d00e5732cd4509&units=metric`)
  .subscribe((data: any) => {
      dataSub.next(data['weather']);
    })
  return dataSub;
}

// Retrieve the state of the weather (E.g., Clear, Cloudy, Rain)
getWeatherState(cityName: string): Subject<string> {
  const dataSubject = new Subject<string>();
  this.http.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=83939b8a3d51b9cee7d00e5732cd4509&units=metric`)
    .subscribe((data: any) => {
      dataSubject.next(data['weather'][0].main);
    });
  return dataSubject;
}

// Retrieve the current temperature of the weather in degree
getCurrentTemp(cityName: string): Subject<number> {
  const dataSubject = new Subject<number>();
  this.http.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=83939b8a3d51b9cee7d00e5732cd4509&units=metric`)
    .subscribe((weather: any) => {
      dataSubject.next(Math.round(weather.main.temp));
    });
  return dataSubject;
}

// Retrieve humidity of current weather
getCurrentHum(cityName: string): Subject<number> {
  const dataSubject = new Subject<number>();
  this.http.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=83939b8a3d51b9cee7d00e5732cd4509&units=metric`)
    .subscribe((weather: any) => {

      dataSubject.next(weather.main.humidity);
    });
  return dataSubject;
}

// Retrieve current wind speed of the weather
getCurrentWind(cityName: string): Subject<number>  {
  const dataSubject = new Subject<number>();
  this.http.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=83939b8a3d51b9cee7d00e5732cd4509&units=metric`)
    .subscribe((weather: any) => {
      dataSubject.next(Math.round(weather.wind.speed));
    });
  return dataSubject;
}

// Retrieve the maximum forecast temperature of the entire day(Free plan only supports 5 days/3h hours forecast  => Loop through 3 hours interval to extract approximate max temperature)
getMaxTemp(cityName: string): Subject<number>  {
  const dataSubject = new Subject<number>();
  let max: number;
  this.http.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=83939b8a3d51b9cee7d00e5732cd4509&units=metric`)
    .subscribe((weather: any) => {
      max = weather.list[0].main.temp;
      weather.list.forEach((value: any) => {
        if (max < value.main.temp) {
          max = value.main.temp;
        }
      });
      dataSubject.next(Math.round(max));
    });
  return dataSubject;
}

// Retrieve the minimum forecast temperature of the entire day(Free plan only supports 5 days/3h hours forecast  => Loop through 3 hours interval to extract approximate min temperature)
getMinTemp(cityName: string): Subject<number>  {
  const dataSubject = new Subject<number>();
  let min: number;
  this.http.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=83939b8a3d51b9cee7d00e5732cd4509&units=metric`)
    .subscribe((weather: any) => {
      min = weather.list[0].main.temp;
      weather.list.forEach((value: any) => {
        if (min > value.main.temp) {
          min = value.main.temp;
        }
      });
      dataSubject.next(Math.round(min));
    });
  return dataSubject;
}

// Retrieve the forecast of weather (5 days) for the capital
getForecast(cityName: string): Subject<Array<any>>  {
  const dataSubject = new Subject<Array<any>>();
  this.http.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=83939b8a3d51b9cee7d00e5732cd4509&units=metric`)
    .subscribe((weather: any) => {
      dataSubject.next(weather.list);
    });
  return dataSubject;
}

addCapitals(capitalName: string): Observable<string[]>{
  this.capitalAdded.push(capitalName);
  return of(this.capitalAdded);
}

getCapitals(): Observable<string[]>{
  return of(this.capitalAdded);
}

deleteCapitals(capitalName: string): Observable<string[]>{
  this.capitalAdded = this.capitalAdded.filter(capital => capital !== capitalName);
  return of(this.capitalAdded);
}

// // Add the weather chosen by me into the virtual database (weather.json)
// addWeather(capital:string, weatherState:string, weatherImg:string, weatherTemp:number, weatherHum:number, weatherwWind:number, maxTemp:number, minTemp:number, forecasts:Array<any>): Observable<weather>{
//   const weatherUrl = 'http://localhost:3000/weather';
//   const weather = {
//      capital: capital,
//      currentWeatherState: weatherState,
//      stateImg: weatherImg,
//      currentTemp: weatherTemp,
//      currentHum: weatherHum,
//      currentWind: weatherwWind,
//      maxTemp: maxTemp,
//      minTemp: minTemp,
//      foreCast: forecasts,
//   }
//   return this.http.post<weather>(weatherUrl, weather, this.httpOptions).pipe(catchError(err => {console.log(err); return throwError(err)}));
// }

// // Retrieve all the weathers chosen by me from the virtual database (weather.json)
// getWeathers(): Observable<weather[]>{
//   const weatherUrl = 'http://localhost:3000/weather';
//   return this.http.get<weather[]>(weatherUrl).pipe(catchError(err => {console.log(err); return throwError(err)}));
// }
}






// // Filter search of countries
// searchCountriesName(city: string): Observable<any>{
//   // Check whether it is a proper search after remove excess spaces from front and back
//   if(!city.trim()){
//     return of([]);
//   }
//   return of(countriesList.filter(country => country.startsWith(city)));
// }


