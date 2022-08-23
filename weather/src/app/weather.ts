export interface weather{
    // Determine which country is evaluated currently
    capital: string;
    // Retrieve the current state of weather of the country
    currentWeatherState: string;
    // Set the icon of the weather
    stateImg: string;
    // Retrieve the current temparature of the country
    currentTemp: number;
    // Retrieve current humidity of the country
    currentHum: number;
    // Retrieve current wind speed of the country
    currentWind: number;
    // Retrieve the maximum temparature of the country ( 3 hours interval)
    maxTemp: number;
    // Retrieve the minimum temparature of the country ( 3 hours interval)
    minTemp: number;
    // Get weather data for 5 upcoming days
    foreCast: Array<any>
    // Check whether the specific weather is added
    isAdded: boolean
}