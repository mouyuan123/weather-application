import { Component, OnInit } from '@angular/core';
import { PageModeService } from 'src/app/services/page-mode.service';
import { WeatherService } from 'src/app/services/weather.service';
// To check which capital's weather details are viewed
import { ActivatedRoute } from '@angular/router';
import { forecast } from 'src/app/forecast';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css']
})
export class WeatherDetailsComponent implements OnInit {

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

  constructor(private pms: PageModeService, private ws: WeatherService, private ar: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPageMode();
    this.getClickedCapitalDetails();
  }

  getPageMode(): void{
    this.pms.getPageMode().subscribe(pageMode => this.isDarkMode = pageMode);
  }

  getClickedCapitalDetails(): void{
    this.clickedCapital = this.ar.snapshot.queryParams['country'];
    if(this.clickedCapital){
      this.ws.getWeatherState(this.clickedCapital).subscribe(state => {this.currentWeatherState = state; 
        switch(this.currentWeatherState){
          case "Clouds": this.stateImg = '../../assets/images/cloudy-weather.png'; break;
          case 'Rain' ||'Drizzle': this.stateImg = '../../assets/images/heavy-rain-weather.png'; break;
          case 'Storm' || 'Thunderstorm': this.stateImg = '../../assets/images/storm-weather.png'; break;
          case 'Sunny' || 'Clear': this.stateImg ='../../assets/images/sunny-weather.png'; break;
          default: this.stateImg = '../../assets/images/snowing-weather.png';
        }});
      this.ws.getCurrentTemp(this.clickedCapital).subscribe(temp => this.currentTemp = temp);
      this.ws.getCurrentHum(this.clickedCapital).subscribe(humidity => this.currentHum = humidity);
      this.ws.getCurrentWind(this.clickedCapital).subscribe(windSpeed => this.currentWind = windSpeed);
      this.ws.getMaxTemp(this.clickedCapital).subscribe(maxTemp => this.maxTemp = maxTemp);
      this.ws.getMinTemp(this.clickedCapital).subscribe(minTemp => this.minTemp = minTemp);
      this.ws.getForecast(this.clickedCapital).subscribe(forecastOfFiveDays =>
        {
          // Retrieve the current day of the week (E.g., days[2] = Tue)
          const todayNumberInWeek = new Date().getDay();
          const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
          this.today = days[todayNumberInWeek];
          forecastOfFiveDays.forEach(forecast =>
          {
            // toDateStrin() => returns current day in format of (Day Month dateOfDay Year)
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
          Object.keys(this.forecast).forEach(day =>
            {
              this.forecast[day].avgTemp = Math.round(this.forecast[day].avgTemp / this.forecast[day].counter);
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
                this.forecast[day].SnowCounter
              );
              switch(true){
                case highest === this.forecast[day].CloudsCounter: this.forecast[day]['predictedState'] = 'Clouds'; this.forecast[day]['stateImg'] = '../../../assets/images/cloudy-weather.png'; break;
                case highest === this.forecast[day].RainCounter: this.forecast[day]['predictedState'] = 'Rain'; this.forecast[day]['stateImg'] = '../../../assets/images/heavy-rain-weather.png'; break;
                case highest === this.forecast[day].DrizzleCounter: this.forecast[day]['predictedState'] = 'Drizzle'; this.forecast[day]['stateImg'] = '../../../assets/images/heavy-rain-weather.png'; break;
                case highest === this.forecast[day].MistCounter: this.forecast[day]['predictedState'] = 'Mist'; this.forecast[day]['stateImg'] = '../../../assets/images/heavy-rain-weather.png'; break;
                case highest === this.forecast[day].StormCounter: this.forecast[day]['predictedState'] = 'Storm'; this.forecast[day]['stateImg'] = '../../../assets/images/storm-weather.png'; break;
                case highest === this.forecast[day].ThunderstormCounter: this.forecast[day]['predictedState'] = 'Thunderstorm'; this.forecast[day]['stateImg'] = '../../../assets/images/storm-weather.png'; break;
                case highest === this.forecast[day].SunnyCounter: this.forecast[day]['predictedState'] = 'Sunny'; this.forecast[day]['stateImg'] = '../../../assets/images/sunny-weather.png'; break;
                case highest === this.forecast[day].ClearCounter: this.forecast[day]['predictedState'] = 'Clear'; this.forecast[day]['stateImg'] = '../../../assets/images/sunny-weather.png'; break;
                default: this.forecast[day]['predictedState'] = 'Snow'; this.forecast[day]['stateImg'] = '../../../assets/images/snowing-weather.png'; break;
              }
            })
            console.log(this.forecast);
      });
    }
  }

  addWeatherStateCounter(weatherState: string, day: string): void{
    console.log(weatherState);
    switch(weatherState){
      case 'Clouds': this.forecast[day].CloudsCounter++; break;
      case 'Rain': this.forecast[day].RainCounter++; break;
      case 'Drizzle': this.forecast[day].DrizzleCounter++; break;
      case 'Mist': this.forecast[day].MistCounter++; break;
      case 'Storm': this.forecast[day].StormCounter++; break;
      case 'Thunderstorm': this.forecast[day].ThunderstormCounter++; break;
      case 'Sunny': this.forecast[day].SunnyCounter++; break;
      case 'Clear': this.forecast[day].ClearCounter++; break;
      default: this.forecast[day].SnowCounter++; break;
    }
  }
}
