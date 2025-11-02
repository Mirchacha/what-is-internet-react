import { requestJSON } from './http';
import type { CoinMarket } from '../types/api';

export const getTopCoins = (
  vs = 'usd',
  perPage = 10,
  signal?: AbortSignal
) =>
  requestJSON<CoinMarket[]>(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vs}&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=false&price_change_percentage=24h`,
    { signal }
  );

