import { Injectable } from '@angular/core';
import { Weather } from '../weather.model';
import { Forescast } from '../forescast.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import * as OAuth from 'oauth-1.0a';

@Injectable()
export class WeatherService {
  private appId = 'eXTc7b62';
  private consumerKey = 'dj0yJmk9eEVBZlA1SkthRFJuJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTIw';
  private consumerSecret = '0445d02b513093f8c65dbf42a2c79c1eec8128aa';
  private urlApi_part1 = 'https://weather-ydn-yql.media.yahoo.com/forecastrss?location=';

  constructor(private _http: HttpClient) { }

  public getWeatherInfo(cityName: string): Observable<any> {
    const oauth = new OAuth({
        consumer: {
            hash_function: function (base_string, key) {
                return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
            }
        });
    const request_data = {
        url:`${this.urlApi_part1}${cityName}&format=json`,
        method: 'GET'
    };
    const headerAuthorization = oauth.toHeader(oauth.authorize(request_data)).Authorization;
    const url = `${this.urlApi_part1}${cityName}&format=json`;
    let headers = new HttpHeaders();
    headers = headers.append('Yahoo-App-Id', this.appId);
    headers = headers.append('Authorization', headerAuthorization);
    headers = headers.append('Access-Control-Allow-Origin', '*');
    console.log(url);
    return this._http.get(url, { headers: headers });
  }

  public mapResult(result: any): Weather {
    const weatherInfo = new Weather();
    weatherInfo.city = `${result.location.city}, ${result.location.country}`;
    weatherInfo.date = result.forecasts[0].date;
    weatherInfo.humidity = result.currentobservation.atmosphere.humidity;
    weatherInfo.info = result.currentobservation.condition.text;
    weatherInfo.maxtemperature = result.forecasts[0].high;
    weatherInfo.mintemperature = result.forecasts[0].low;
    weatherInfo.pressure = result.currentobservation.atmosphere.pressure;
    weatherInfo.sunrise = result.currentobservation.astronomy.sunrise;
    weatherInfo.sunset = result.currentobservation.astronomy.sunset;
    weatherInfo.temperature = result.currentobservation.condition.temperature;
    weatherInfo.winddirection = result.currentobservation.wind.direction;
    weatherInfo.windspeed = result.currentobservation.wind.speed;
    weatherInfo.forecasts = new Array<Forescast>();
    for (const forecast of result.forecasts) {
      const newForecast = new Forescast();
      newForecast.date = forecast.date;
      newForecast.day = forecast.day;
      newForecast.maxTemperature = forecast.high;
      newForecast.minTemperature = forecast.low;
      newForecast.info = forecast.text;
      weatherInfo.forecasts.push(newForecast);
    }
    return weatherInfo;
  }
}
