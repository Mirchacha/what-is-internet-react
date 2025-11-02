import { FC, useEffect, useState } from 'react';
import { getMyIp } from '../api/ipify';
import { getCatFact } from '../api/catfacts';
import { Card } from '../components/Card';
import { Loader } from '../components/Loader';
import { ErrorMessage } from '../components/ErrorMessage';
import { AppError } from '../types';
import { MyIp, CatFact } from '../types/api';

export const Network: FC = () => {
  const [ipData, setIpData] = useState<MyIp | null>(null);
  const [catFact, setCatFact] = useState<CatFact | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AppError | null>(null);
  const [requestTime, setRequestTime] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const startTime = performance.now();

        const [ip, fact] = await Promise.all([
          getMyIp(controller.signal),
          getCatFact(controller.signal),
        ]);

        const endTime = performance.now();
        setRequestTime(Math.round(endTime - startTime));

        setIpData(ip);
        setCatFact(fact);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError({
            message:
              err instanceof Error ? err.message : 'Не вдалося завантажити дані',
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="page-container">
      <Card title="Мережа">
        {loading && <Loader />}
        {error && <ErrorMessage error={error} />}
        {(ipData || catFact) && (
          <div className="network-content">
            {ipData && (
              <div className="info-block">
                <h3>Ваш публічний IP</h3>
                <p className="ip-address">{ipData.ip}</p>
              </div>
            )}
            {catFact && (
              <div className="info-block">
                <h3>Випадковий факт про котів</h3>
                <p className="cat-fact">{catFact.fact}</p>
              </div>
            )}
            {requestTime !== null && (
              <div className="info-block">
                <p className="request-time">
                  Час запиту: {requestTime} мс
                </p>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

