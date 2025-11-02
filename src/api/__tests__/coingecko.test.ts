import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getTopCoins } from '../coingecko';
import { mockCoins, mockSuccessfulFetch } from '../../test/mockData';

describe('getTopCoins', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch top coins successfully with default params', async () => {
    global.fetch = vi.fn().mockResolvedValue(mockSuccessfulFetch(mockCoins));

    const result = await getTopCoins();

    expect(result).toEqual(mockCoins);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('coingecko.com'),
      expect.any(Object)
    );
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('vs_currency=usd'),
      expect.any(Object)
    );
  });

  it('should use custom vs_currency parameter', async () => {
    global.fetch = vi.fn().mockResolvedValue(mockSuccessfulFetch(mockCoins));

    await getTopCoins('eur', 10);

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('vs_currency=eur'),
      expect.any(Object)
    );
  });

  it('should use custom perPage parameter', async () => {
    global.fetch = vi.fn().mockResolvedValue(mockSuccessfulFetch(mockCoins));

    await getTopCoins('usd', 20);

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('per_page=20'),
      expect.any(Object)
    );
  });

  it('should return array of coins with required properties', async () => {
    global.fetch = vi.fn().mockResolvedValue(mockSuccessfulFetch(mockCoins));

    const result = await getTopCoins();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('id');
    expect(result[0]).toHaveProperty('name');
    expect(result[0]).toHaveProperty('current_price');
  });
});

