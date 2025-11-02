export type MyIp = {
  ip: string;
};

export type CatFact = {
  fact: string;
  length: number;
};

export type CoinMarket = {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
  image: string;
};

export type WeatherNow = {
  latitude: number;
  longitude: number;
  current: {
    temperature_2m: number;
    wind_speed_10m: number;
    time: string;
  };
};

export type AppError = {
  message: string;
  status?: number;
};

