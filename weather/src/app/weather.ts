export interface weather{
    // Determine which country is evaluated currently
    country: string;
    // Retrieve overall weather of the country
    currentWeather: string;
    // Retrieve the current state of weather of the country
    currentWeatherState: string;
    // Retrieve the current temparature of the country
    currentTemp: number;
    // Retrieve current humidity of the country
    currentHum: number;
    // Retrieve current wind speed of the country
    currentWind: string;
    // Retrieve the maximum temparature of the country ( 3 hours interval)
    maxTemp: number;
    // Retrieve the minimum temparature of the country ( 3 hours interval)
    minTemp: number;
    // Get weather data for 5 upcoming days
    foreCast: Array<any>
}