import { FC, useEffect, useState } from 'react';
import { getTopCoins } from '../api/coingecko';
import { formatCurrency, formatPercent } from '../utils/format';
import { Card } from '../components/Card';
import { Loader } from '../components/Loader';
import { ErrorMessage } from '../components/ErrorMessage';
import { AppError, CoinMarket } from '../types';
import { useAppStore } from '../store/appStore';

export const Crypto: FC = () => {
  const [data, setData] = useState<CoinMarket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AppError | null>(null);
  const { getCache, setCache } = useAppStore();

  useEffect(() => {
    const controller = new AbortController();

    const fetchCoins = async () => {
      try {
        setLoading(true);
        setError(null);

        // Перевіряємо кеш
        const cacheKey = 'top-coins';
        const cached = getCache<CoinMarket[]>(cacheKey, 60000); // 60 секунд
        if (cached) {
          setData(cached);
          setLoading(false);
          return;
        }

        const coins = await getTopCoins('usd', 10, controller.signal);
        setData(coins);
        setCache(cacheKey, coins, 60000);
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

    fetchCoins();

    return () => {
      controller.abort();
    };
  }, [getCache, setCache]);

  return (
    <div className="page-container">
      <Card title="Топ криптовалют">
        {loading && <Loader />}
        {error && <ErrorMessage error={error} />}
        {data.length > 0 && (
          <div className="crypto-list">
            {data.map((coin) => (
              <div key={coin.id} className="crypto-item">
                <div className="crypto-header">
                  <img src={coin.image} alt={coin.name} className="crypto-image" />
                  <div className="crypto-info">
                    <h3>{coin.name}</h3>
                    <span className="crypto-symbol">{coin.symbol.toUpperCase()}</span>
                  </div>
                </div>
                <div className="crypto-data">
                  <div className="price">{formatCurrency(coin.current_price, 'USD')}</div>
                  <div
                    className={`change ${coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}`}
                  >
                    {formatPercent(coin.price_change_percentage_24h)}
                  </div>
                  <div className="market-cap">
                    Кап: {formatCurrency(coin.market_cap, 'USD', 0)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

