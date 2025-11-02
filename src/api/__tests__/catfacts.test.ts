import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getCatFact } from '../catfacts';
import { mockCatFact, mockSuccessfulFetch } from '../../test/mockData';

describe('getCatFact', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch cat fact successfully', async () => {
    global.fetch = vi.fn().mockResolvedValue(mockSuccessfulFetch(mockCatFact));

    const result = await getCatFact();

    expect(result).toEqual(mockCatFact);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('catfact.ninja'),
      expect.any(Object)
    );
  });

  it('should have fact and length properties', async () => {
    global.fetch = vi.fn().mockResolvedValue(mockSuccessfulFetch(mockCatFact));

    const result = await getCatFact();

    expect(result.fact).toBeDefined();
    expect(result.length).toBeDefined();
  });
});

