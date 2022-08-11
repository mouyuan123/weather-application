/**
 * Retrieve the weather of the countries/country using OpenWeatherMap Api (Free Subscription Plan)
 * Guide to start -> https://openweathermap.org/appid
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

constructor(private http: HttpClient) { }
}
