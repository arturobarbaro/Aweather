import { Injectable } from '@angular/core';
import { Weather } from '../weather.model';
import { Forescast } from '../forescast.model';

@Injectable()
export class WeatherService {

  constructor() { }

  public getWeatherInfo(cityName: string): Weather {
    const weather = new Weather();
    weather.city = 'Madrid';
    weather.date = 'Tue, 01 May 2018 06:00 PM CEST';
    weather.humidity = 32.1;
    weather.info = 'Cloudy';
    weather.maxtemperature = 90;
    weather.mintemperature = 58;
    weather.pressure = 1080;
    weather.sunrise = '6:58 am';
    weather.sunset = '23:40 pm';
    weather.temperature = 80;
    weather.winddirection = 270;
    weather.windspeed = 26;
    weather.forecast = new Forescast();
    weather.forecast.date = '04 May 2018';
    weather.forecast.day = 'Fri';
    weather.forecast.info = 'Mostly Cloudy';
    weather.forecast.maxTemperature = 88;
    weather.forecast.minTemperature = 62;
    return weather;
  }
}
