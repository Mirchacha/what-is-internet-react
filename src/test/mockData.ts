import type { WeatherNow, CoinMarket, MyIp, CatFact } from '../types/api';

export const mockWeather: WeatherNow = {
  latitude: 50.4501,
  longitude: 30.5234,
  current: {
    temperature_2m: 15.5,
    wind_speed_10m: 8.2,
    time: '2024-01-01T12:00',
  },
};

export const mockCoins: CoinMarket[] = [
  {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    current_price: 50000,
    market_cap: 1000000000000,
    price_change_percentage_24h: 2.5,
    image: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
  },
  {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    current_price: 3000,
    market_cap: 400000000000,
    price_change_percentage_24h: -1.2,
    image: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
  },
];

export const mockIp: MyIp = {
  ip: '192.168.1.1',
};

export const mockCatFact: CatFact = {
  fact: 'Cats have whiskers on their face.',
  length: 32,
};

// Mock successful fetch responses
export const mockSuccessfulFetch = <T>(data: T): Promise<Response> => {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(data),
  } as Response);
};

// Mock failed fetch responses
export const mockFailedFetch = (status = 500): Promise<Response> => {
  return Promise.resolve({
    ok: false,
    status,
    json: () => Promise.resolve({ message: 'Error' }),
  } as Response);
};

// Mock network error
export const mockNetworkError = (): Promise<never> => {
  return Promise.reject(new Error('Network error'));
};
