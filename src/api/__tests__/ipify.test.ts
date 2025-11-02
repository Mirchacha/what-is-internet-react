import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getMyIp } from '../ipify';
import { mockIp, mockSuccessfulFetch } from '../../test/mockData';

describe('getMyIp', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch IP address successfully', async () => {
    global.fetch = vi.fn().mockResolvedValue(mockSuccessfulFetch(mockIp));

    const result = await getMyIp();

    expect(result).toEqual(mockIp);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('api.ipify.org'),
      expect.any(Object)
    );
  });

  it('should pass AbortSignal when provided', async () => {
    const abortController = new AbortController();
    global.fetch = vi.fn().mockResolvedValue(mockSuccessfulFetch(mockIp));

    await getMyIp(abortController.signal);

    expect(global.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        signal: expect.any(AbortSignal),
      })
    );
  });
});

