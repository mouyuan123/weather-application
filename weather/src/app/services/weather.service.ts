/**
 * Retrieve the weather of the countries/country using OpenWeatherMap Api (Free Subscription Plan)
 * Guide to start -> https://openweathermap.org/appid
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of, Subject, throwError, retry } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { ErrorSuccessMessageService } from './error-success-message.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  capitalAdded:string[] = [];
  httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json'})};

constructor(private http: HttpClient, private msg: ErrorSuccessMessageService) { }

// Search the weather of specific capital of a country (Accepts only Celsius format here => units='metric')
searchWeatherByCityName(cityName: string): Observable<any>{
   return this.http
   .get<any>(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=83939b8a3d51b9cee7d00e5732cd4509&units=metric`)
   .pipe
   (
    retry(1),
    catchError(this.handleError)
   )
}

// Retrieve the state of the weather (E.g., Clear, Cloudy, Rain)
getWeatherState(cityName: string): Subject<string> {
  const dataSubject = new Subject<string>();
  this.http.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=83939b8a3d51b9cee7d00e5732cd4509&units=metric`)
    .pipe
    (
      retry(1),
      catchError(this.handleError)
    )
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
    .pipe
    (
      retry(1),
      catchError(this.handleError)
    )
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
    .pipe
    (
      retry(1),
      catchError(this.handleError)
    )
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
    .pipe
    (
      retry(1),
      catchError(this.handleError)
    )
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
    .pipe
    (
      retry(1),
      catchError(this.handleError)
    )
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
    .pipe
    (
      retry(1),
      catchError(this.handleError)
    )
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
    .pipe
    (
      retry(1),
      catchError(this.handleError)
    )
    .subscribe((weather: any) => {
      dataSubject.next(weather.list);
    });
  return dataSubject;
}

// Return the error message as an Observable to the user if the application fails to fetch data from OpenWeatherMap API (after retrying 1 more time)
// This handleError() is to ensure the application continues to work even it fails to fetch the data
private handleError(error: HttpErrorResponse){
  let errorMsg = '';
  if(error.status === 0){
    // Catch the client-side error (E.g., network issues)
    errorMsg = error.error.message;
    this.msg.showFailure(errorMsg);
  }
  else{
    // Catch the server-side error (E.g., In my case, the call to API exceeds the maximum limit of free plan of OpenWeatherMap API)
    errorMsg = error.message;
    this.msg.showFailure(`Error code: ${error.status}\nMessage: ${error.message}`);
  }
  return throwError(() => new Error(`An error has occured: ${errorMsg}`));
}

}


// // Filter search of countries
// searchCountriesName(city: string): Observable<any>{
//   // Check whether it is a proper search after remove excess spaces from front and back
//   if(!city.trim()){
//     return of([]);
//   }
//   return of(countriesList.filter(country => country.startsWith(city)));
// }


