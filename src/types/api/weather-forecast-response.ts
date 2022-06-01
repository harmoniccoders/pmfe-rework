/* tslint:disable */
import { WeatherForecast } from './weather-forecast';

export type WeatherForecastResponse<
  TCode extends 200 = 200,
  TContentType extends 'text/plain' | 'application/json' | 'text/json' =
    | 'text/plain'
    | 'application/json'
    | 'text/json'
> = TCode extends 200
  ? TContentType extends 'text/plain'
    /**
     * Success
     */
    ? Array<WeatherForecast>
    : TContentType extends 'application/json'
      /**
       * Success
       */
    ? Array<WeatherForecast>
    : TContentType extends 'text/json'
      /**
       * Success
       */
    ? Array<WeatherForecast>
    : any
  : any;
