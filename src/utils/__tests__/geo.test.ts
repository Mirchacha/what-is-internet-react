import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getNavigatorPosition } from '../geo';

describe('getNavigatorPosition', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should reject when geolocation is not available', async () => {
    // @ts-expect-error - testing error case
    delete navigator.geolocation;

    await expect(getNavigatorPosition()).rejects.toThrow('Геолокація не підтримується');
  });

  it('should resolve with position when geolocation is available', async () => {
    const mockPosition = {
      coords: {
        latitude: 50.4501,
        longitude: 30.5234,
        accuracy: 10,
      },
      timestamp: Date.now(),
    };

    navigator.geolocation.getCurrentPosition = vi.fn((success) => {
      success(mockPosition);
    });

    const result = await getNavigatorPosition();

    expect(result).toEqual(mockPosition);
    expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      expect.objectContaining({
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      })
    );
  });

  it('should reject when geolocation fails', async () => {
    navigator.geolocation.getCurrentPosition = vi.fn((success, error) => {
      if (error) error(new Error('Permission denied'));
    });

    await expect(getNavigatorPosition()).rejects.toThrow();
  });

  it('should call with correct options', async () => {
    const mockPosition = {
      coords: { latitude: 0, longitude: 0 },
      timestamp: Date.now(),
    };

    navigator.geolocation.getCurrentPosition = vi.fn((success) => {
      success(mockPosition);
    });

    await getNavigatorPosition();

    expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      expect.objectContaining({
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      })
    );
  });
});

