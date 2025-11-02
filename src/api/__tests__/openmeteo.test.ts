import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getWeather } from '../openmeteo';
import { mockWeather, mockSuccessfulFetch } from '../../test/mockData';

describe('getWeather', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch weather data successfully', async () => {
    global.fetch = vi.fn().mockResolvedValue(mockSuccessfulFetch(mockWeather));

    const result = await getWeather(50.4501, 30.5234);

    expect(result).toEqual(mockWeather);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('open-meteo.com'),
      expect.any(Object)
    );
  });

  it('should include latitude and longitude in URL', async () => {
    global.fetch = vi.fn().mockResolvedValue(mockSuccessfulFetch(mockWeather));

    await getWeather(50.45, 30.52);

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('latitude=50.45'),
      expect.any(Object)
    );
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('longitude=30.52'),
      expect.any(Object)
    );
  });

  it('should request current weather parameters', async () => {
    global.fetch = vi.fn().mockResolvedValue(mockSuccessfulFetch(mockWeather));

    await getWeather(50.45, 30.52);

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('current=temperature_2m,wind_speed_10m'),
      expect.any(Object)
    );
  });

  it('should return weather data with required properties', async () => {
    global.fetch = vi.fn().mockResolvedValue(mockSuccessfulFetch(mockWeather));

    const result = await getWeather(50.45, 30.52);

    expect(result).toHaveProperty('latitude');
    expect(result).toHaveProperty('longitude');
    expect(result).toHaveProperty('current');
    expect(result.current).toHaveProperty('temperature_2m');
    expect(result.current).toHaveProperty('wind_speed_10m');
  });
});

