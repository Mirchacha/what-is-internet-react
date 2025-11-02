import { FC, useEffect, useState } from 'react';
import { getWeather } from '../api/openmeteo';
import { getNavigatorPosition } from '../utils/geo';
import { formatTemperature } from '../utils/format';
import { Card } from '../components/Card';
import { Loader } from '../components/Loader';
import { ErrorMessage } from '../components/ErrorMessage';
import { AppError } from '../types';
import { WeatherNow } from '../types/api';

export const Weather: FC = () => {
  const [data, setData] = useState<WeatherNow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AppError | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        const position = await getNavigatorPosition();
        const weather = await getWeather(
          position.coords.latitude,
          position.coords.longitude,
          controller.signal
        );

        setData(weather);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError({
            message:
              err instanceof Error ? err.message : 'Не вдалося завантажити погоду',
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="page-container">
      <Card title="Погода">
        {loading && <Loader />}
        {error && <ErrorMessage error={error} />}
        {data && (
          <div className="weather-content">
            <div className="weather-main">
              <div className="temperature">
                {formatTemperature(data.current.temperature_2m)}
              </div>
              <div className="details">
                <p>Швидкість вітру: {data.current.wind_speed_10m.toFixed(1)} м/с</p>
                <p>Час: {new Date(data.current.time).toLocaleString('uk-UA')}</p>
                <p>
                  Координати: {data.latitude.toFixed(4)}, {data.longitude.toFixed(4)}
                </p>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

