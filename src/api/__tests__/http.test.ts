import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { requestJSON } from '../http';
import {
  mockSuccessfulFetch,
  mockFailedFetch,
  mockNetworkError,
} from '../../test/mockData';

describe('requestJSON', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should successfully fetch and parse JSON', async () => {
    const mockData = { id: 1, name: 'Test' };
    global.fetch = vi.fn().mockResolvedValue(mockSuccessfulFetch(mockData));

    const result = await requestJSON<typeof mockData>('https://api.test.com/data');

    expect(result).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.test.com/data',
      expect.objectContaining({
        headers: { accept: 'application/json' },
      })
    );
  });

  it('should handle HTTP errors', async () => {
    global.fetch = vi.fn().mockResolvedValue(mockFailedFetch(404));

    await expect(requestJSON('https://api.test.com/data')).rejects.toThrow('HTTP 404');
  });

  it('should handle network errors with retry', async () => {
    global.fetch = vi
      .fn()
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce(mockSuccessfulFetch({ success: true }));

    const result = await requestJSON('https://api.test.com/data');

    expect(result).toEqual({ success: true });
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it('should retry only once by default', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    await expect(requestJSON('https://api.test.com/data', { retries: 1 })).rejects.toThrow();

    expect(global.fetch).toHaveBeenCalledTimes(2); // Initial + 1 retry
  });

  it('should respect retry parameter', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    await expect(requestJSON('https://api.test.com/data', { retries: 2 })).rejects.toThrow();

    expect(global.fetch).toHaveBeenCalledTimes(3); // Initial + 2 retries
  });

  it('should timeout after specified time', async () => {
    global.fetch = vi.fn().mockImplementation(() => new Promise(() => {})); // Never resolves

    await expect(
      requestJSON('https://api.test.com/data', { timeoutMs: 100 })
    ).rejects.toThrow();

    expect(global.fetch).toHaveBeenCalled();
  });

  it('should use AbortSignal when provided', async () => {
    const mockData = { test: 'data' };
    global.fetch = vi.fn().mockResolvedValue(mockSuccessfulFetch(mockData));
    const abortController = new AbortController();

    await requestJSON('https://api.test.com/data', { signal: abortController.signal });

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.test.com/data',
      expect.objectContaining({
        signal: expect.any(AbortSignal),
      })
    );
  });

  it('should abort request when signal is aborted', async () => {
    const abortController = new AbortController();
    abortController.abort();

    global.fetch = vi.fn().mockImplementation(() => new Promise(() => {}));

    await expect(
      requestJSON('https://api.test.com/data', { signal: abortController.signal })
    ).rejects.toThrow();
  });
});

