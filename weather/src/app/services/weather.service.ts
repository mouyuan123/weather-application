/**
 * Retrieve the weather of the countries/country using OpenWeatherMap Api (Free Subscription Plan)
 * Guide to start -> https://openweathermap.org/appid
 */
 import { Injectable } from '@angular/core';
 import { HttpClient, HttpErrorResponse } from '@angular/common/http';
 import { catchError, Observable, of, Subject, throwError, retry } from 'rxjs';
 import { HttpHeaders } from '@angular/common/http';
 import { ErrorSuccessMessageService } from './error-success-message.service';
 import { environment } from 'src/environments/environment';
 
 @Injectable({
   providedIn: 'root'
 })
 export class WeatherService {
   capitalAdded:string[] = [];
   httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
   private readonly WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather`;
   private readonly FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast`;
   // Register free subscription for OpenWeatherMap API and get your own API Key
   private readonly WEATHER_API_KEY = environment.WEATHER_API;
 
 constructor(private http: HttpClient, private msg: ErrorSuccessMessageService) { }
 
 // Search the weather of specific capital of a country (Accepts only Celsius format here => units='metric')
 searchWeatherByCityName(cityName: string): Observable<any>{
    return this.http
    .get<any>(`${this.WEATHER_URL}?q=${cityName}&APPID=${this.WEATHER_API_KEY}&units=metric`)
    .pipe
    (
     retry(1),
     catchError(this.handleError)
    )
 }
 
 getWeatherForecast(cityName: string): Observable<any>{
   return this.http.get(
     `${this.FORECAST_URL}?q=${cityName}&APPID=${this.WEATHER_API_KEY}&units=metric`)
     .pipe
     (
       retry(1),
       catchError(this.handleError)
     )
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
 