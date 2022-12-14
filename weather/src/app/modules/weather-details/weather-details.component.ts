import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { PageModeService } from 'src/app/services/page-mode.service';
import { WeatherService } from 'src/app/services/weather.service';
// To check which capital's weather details are viewed
import { ActivatedRoute, Router } from '@angular/router';
import { forecast } from 'src/app/forecast';
import { Subject, takeUntil } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { ErrorSuccessMessageService } from 'src/app/services/error-success-message.service';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css', '../../../styles.css']
})
export class WeatherDetailsComponent implements OnInit, OnDestroy {

  isDarkMode!: boolean;
  // Specify which capital is clicked
  clickedCapital?: string;
  // Generate details of weather for specific capital when it is clicked
  currentWeatherState!: string;
  stateImg!: string;
  currentTemp!: number;
  currentHum!: number;
  currentWind!: number;
  maxTemp!: number;
  minTemp!: number;
  // Record<string, any> => Explicitily tells the browser that an object is using key-value pair, {} with specific data type (E.g., key: string, value: any).
  // It creates a plain object using {}
  forecast: Record<string,any> = {};
  // Determine the current day
  today!: string;
  // Check whether the APi fetch the weather completely
  isLoading = true;
  // Check whether it is mobile version
  isMobile!: boolean;
  // Retrieve the image of the capital from the Firebase Storage
  capitalUrl!: string;
  private readonly unsubscribe$: Subject<void> = new Subject();

  constructor
  (
    private pms: PageModeService, 
    private ws: WeatherService, 
    private router: Router, 
    private ar: ActivatedRoute, 
    private firebase: FirebaseService,
    private imageService: ImageUploadService,
    private message: ErrorSuccessMessageService
  ) { }

  @HostListener('window: resize', ['$event'])
  onResize(event: any){
    if(window.innerWidth < 768){
      this.isMobile = true;
    }
    else{
      this.isMobile = false;
    }
  }


  ngOnInit(): void {
    if(window.innerWidth < 768){
      this.isMobile = true;
    }
    else{
      this.isMobile = false;
    }
    this.getPageMode();
    this.getClickedCapitalDetails();
  }

  getPageMode(): void{
    this.pms.getPageMode().pipe(takeUntil(this.unsubscribe$)).subscribe(pageMode => this.isDarkMode = pageMode);
  }

  getCapitalUrl(): void{
    this.isLoading = true;
    this.imageService.retrieveImage(this.clickedCapital!)
    .then(imageUrl => {this.capitalUrl = imageUrl; this.isLoading = false})
    .catch(error => 
    {
      switch (error.code) 
      {
        case 'storage/object-not-found': this.message.showFailure("Image file doesn't exist / not supported currently"); break;
        case 'storage/unauthorized': this.message.showFailure("User doesn't have permission to access the object"); break;
        default: this.message.showFailure("Unknown error occurred, inspect the server response"); break;
      }
    }
  );
  }

  getClickedCapitalDetails(): void{
    this.isLoading = true;
    // Retrieve the current capital clicked from the query params of the URL
    this.clickedCapital = this.ar.snapshot.queryParams['country'];
    if(this.clickedCapital){
      this.getCapitalUrl();
      this.ws.searchWeatherByCityName(this.clickedCapital).subscribe((weather: any) =>
  {
    this.currentWeatherState = weather['weather'][0].main;
    switch(this.currentWeatherState){
      case "Clouds": this.stateImg = '../../assets/images/cloudy-weather.png'; break;
      case 'Rain' ||'Drizzle': this.stateImg = '../../assets/images/heavy-rain-weather.png'; break;
      case 'Storm' || 'Thunderstorm': this.stateImg = '../../assets/images/storm-weather.png'; break;
      case 'Sunny' || 'Clear': this.stateImg ='../../assets/images/sunny-weather.png'; break;
      default: this.stateImg = '../../assets/images/snowing-weather.png';
    };
    this.currentTemp = Math.round(weather.main.temp);
    this.currentHum = weather.main.humidity;
    this.currentWind = Math.round(weather.wind.speed);
  })
  this.ws.getWeatherForecast(this.clickedCapital).pipe(takeUntil(this.unsubscribe$)).subscribe((forecast: any) =>
  {
    /* RETRIEVE THE MAXIMUM & MINIMUM TEMPERATURE OF TODAY*/ 
    let max = forecast.list[0].main.temp;
    let min = forecast.list[0].main.temp;
    forecast.list.forEach((value: any) => {
      if (max < value.main.temp) {
        max = value.main.temp;
      }
      if( min > value.main.temp){
        min = value.main.temp
      }
    });
    this.maxTemp = Math.round(max);
    this.minTemp = Math.round(min)
    
    /* RETRIEVE THE FORECAST WEATHER FOR NEXT 5 DAYS */
    let forecastOfFiveDays = forecast.list;
    // Retrieve the current day of the week (E.g., days[2] = Tue)
    const todayNumberInWeek = new Date().getDay();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.today = days[todayNumberInWeek];
    forecastOfFiveDays.forEach((forecast: any) =>
    {
      // toDateString() => returns current day in format of (Day Month dateOfDay Year)
      const date: string = new Date(forecast['dt_txt']).toDateString().split(' ')[0];
      // Skip the current day of the week because it will always be displayed
      if(date !== this.today){
        if(this.forecast[date]){
          this.addWeatherStateCounter(forecast.weather[0].main, date);
          this.forecast[date].counter++;
          this.forecast[date].avgTemp +=  forecast.main.temp;
        }
        else{
          let forecasting: forecast = 
          {
            CloudsCounter: 0,
            RainCounter: 0,
            DrizzleCounter: 0,
            MistCounter: 0,
            StormCounter: 0,
            ThunderstormCounter: 0,
            SunnyCounter: 0,
            ClearCounter: 0,
            HazeCounter: 0,
            FogCounter: 0,
            SmokeCounter: 0,
            SnowCounter: 0,
            avgTemp: forecast.main.temp,
            counter: 1,
            predictedState: '',
            stateImg: ''
          }
          this.forecast[date] = forecasting
          this.addWeatherStateCounter(forecast.weather[0].main, date);
        }
      }
    });
    // Loop through the key value of each key-value pair
    Object.keys(this.forecast).forEach(day =>
      {
        // Retrieve the average temperature among the forecast of 5 days
        this.forecast[day].avgTemp = Math.round(this.forecast[day].avgTemp / this.forecast[day].counter);
        // Retrieve the highest occurences among the weather state counters
        let highest: number = Math.max
        (
          this.forecast[day].CloudsCounter, 
          this.forecast[day].RainCounter, 
          this.forecast[day].DrizzleCounter, 
          this.forecast[day].MistCounter, 
          this.forecast[day].StormCounter, 
          this.forecast[day].ThunderstormCounter, 
          this.forecast[day].SunnyCounter, 
          this.forecast[day].ClearCounter,
          this.forecast[day].HazeCounter, 
          this.forecast[day].FogCounter, 
          this.forecast[day].SmokeCounter, 
          this.forecast[day].SnowCounter
        );
        // Set the forecast weather state and state image corresponding to the weather with the highest occurences
        switch(true){
          case highest === this.forecast[day].CloudsCounter: this.forecast[day]['predictedState'] = 'Clouds'; this.forecast[day]['stateImg'] = '../../../assets/images/cloudy-weather.png'; break;
          case highest === this.forecast[day].RainCounter: this.forecast[day]['predictedState'] = 'Rain'; this.forecast[day]['stateImg'] = '../../../assets/images/heavy-rain-weather.png'; break;
          case highest === this.forecast[day].DrizzleCounter: this.forecast[day]['predictedState'] = 'Drizzle'; this.forecast[day]['stateImg'] = '../../../assets/images/heavy-rain-weather.png'; break;
          case highest === this.forecast[day].MistCounter: this.forecast[day]['predictedState'] = 'Mist'; this.forecast[day]['stateImg'] = '../../../assets/images/heavy-rain-weather.png'; break;
          case highest === this.forecast[day].StormCounter: this.forecast[day]['predictedState'] = 'Storm'; this.forecast[day]['stateImg'] = '../../../assets/images/storm-weather.png'; break;
          case highest === this.forecast[day].ThunderstormCounter: this.forecast[day]['predictedState'] = 'Thunderstorm'; this.forecast[day]['stateImg'] = '../../../assets/images/storm-weather.png'; break;
          case highest === this.forecast[day].SunnyCounter: this.forecast[day]['predictedState'] = 'Sunny'; this.forecast[day]['stateImg'] = '../../../assets/images/sunny-weather.png'; break;
          case highest === this.forecast[day].ClearCounter: this.forecast[day]['predictedState'] = 'Clear'; this.forecast[day]['stateImg'] = '../../../assets/images/sunny-weather.png'; break;
          case highest === this.forecast[day].HazeCounter: this.forecast[day]['predictedState'] = 'Haze'; this.forecast[day]['stateImg'] = '../../../assets/images/haze.png'; break;
          case highest === this.forecast[day].FogCounter: this.forecast[day]['predictedState'] = 'Fog'; this.forecast[day]['stateImg'] = '../../../assets/images/haze.png'; break;
          case highest === this.forecast[day].SmokeCounter: this.forecast[day]['predictedState'] = 'Smoke'; this.forecast[day]['stateImg'] = '../../../assets/images/haze.png'; break;
          default: this.forecast[day]['predictedState'] = 'Snow'; this.forecast[day]['stateImg'] = '../../../assets/images/snowing-weather.png'; break;
        }
      })
      this.isLoading = false;
  })
    }
  }

  // Increment the weather counter by 1 whenever it appears in the forecast of same day
  addWeatherStateCounter(weatherState: string, day: string): void{
    switch(weatherState){
      case 'Clouds': this.forecast[day].CloudsCounter++; break;
      case 'Rain': this.forecast[day].RainCounter++; break;
      case 'Drizzle': this.forecast[day].DrizzleCounter++; break;
      case 'Mist': this.forecast[day].MistCounter++; break;
      case 'Storm': this.forecast[day].StormCounter++; break;
      case 'Thunderstorm': this.forecast[day].ThunderstormCounter++; break;
      case 'Sunny': this.forecast[day].SunnyCounter++; break;
      case 'Clear': this.forecast[day].ClearCounter++; break;
      case 'Haze': this.forecast[day].HazeCounter++; break;
      case 'Fog': this.forecast[day].FogCounter++; break;
      case 'Smoke': this.forecast[day].SmokeCounter++; break;
      default: this.forecast[day].SnowCounter++; break;
    }
  }

  // By default, "keyvalue" pipe will sort the map/array/record based on the key. Returning 0 will avoid it to do the default sorting.
  returnZero(){
    return 0;
  }

  deleteWeather(): void{
    this.isLoading = true;
    this.firebase.removeUserCapitalWeather(this.clickedCapital!)
    // .then() => When the capital removal is done, only navigate back to the home page
    .then(deleted => 
      {if(deleted){
        this.router.navigate(['/home']);
      }
      this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
