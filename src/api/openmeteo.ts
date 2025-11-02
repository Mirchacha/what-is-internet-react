import { requestJSON } from './http';
import type { WeatherNow } from '../types/api';

export const getWeather = (lat: number, lon: number, signal?: AbortSignal) =>
  requestJSON<WeatherNow>(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m&timezone=auto`,
    { signal }
  );

