/**
 * Retrieve the weather of the countries/country using OpenWeatherMap Api (Free Subscription Plan)
 * Guide to start -> https://openweathermap.org/appid
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

constructor(private http: HttpClient) { }

// Search the weather of specific country (Accepts only Celsius format here => units='imperial')
searchWeatherByCityName(cityName: string): Subject<string>{
  const dataSub = new Subject<string>();
  this.http.get(
  `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=83939b8a3d51b9cee7d00e5732cd4509&units=imperial`)
  .subscribe((data: any) => {
      dataSub.next(data['weather']);
    })
  return dataSub;
}

getWeatherState(cityName: string): Subject<string> {
  const dataSubject = new Subject<string>();
  this.http.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=83939b8a3d51b9cee7d00e5732cd4509&units=imperial`)
    .subscribe((data: any) => {
      dataSubject.next(data['weather'][0].main);
    });
  return dataSubject;
}

getCurrentTemp(cityName: string): Subject<number> {
  const dataSubject = new Subject<number>();
  this.http.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=83939b8a3d51b9cee7d00e5732cd4509&units=imperial`)
    .subscribe((weather: any) => {
      dataSubject.next(Math.round(weather.main.temp));
    });
  return dataSubject;
}

getCurrentHum(cityName: string): Subject<number> {
  const dataSubject = new Subject<number>();
  this.http.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=83939b8a3d51b9cee7d00e5732cd4509&units=imperial`)
    .subscribe((weather: any) => {
      console.log(weather);
      dataSubject.next(weather.main.humidity);
    });
  return dataSubject;
}

getCurrentWind(cityName: string): Subject<number>  {
  const dataSubject = new Subject<number>();
  this.http.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=83939b8a3d51b9cee7d00e5732cd4509&units=imperial`)
    .subscribe((weather: any) => {
      dataSubject.next(Math.round(weather.wind.speed));
    });
  return dataSubject;
}

getMaxTemp(cityName: string): Subject<number>  {
  const dataSubject = new Subject<number>();
  let max: number;
  this.http.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=83939b8a3d51b9cee7d00e5732cd4509&units=imperial`)
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

getMinTemp(cityName: string): Subject<number>  {
  const dataSubject = new Subject<number>();
  let min: number;
  this.http.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=83939b8a3d51b9cee7d00e5732cd4509&units=imperial`)
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

getForecast(cityName: string): Subject<Array<any>>  {
  const dataSubject = new Subject<Array<any>>();
  this.http.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=83939b8a3d51b9cee7d00e5732cd4509&units=imperial`)
    .subscribe((weather: any) => {
      dataSubject.next(weather.list);
    });
  return dataSubject;
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


