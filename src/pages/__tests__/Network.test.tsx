import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Network } from '../Network';
import { mockIp, mockCatFact, mockSuccessfulFetch } from '../../test/mockData';
import { getMyIp, getCatFact } from '../../api';
import * as apiModule from '../../api';

// Mock API modules
vi.mock('../../api', () => ({
  getMyIp: vi.fn(),
  getCatFact: vi.fn(),
}));

describe('Network Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should display loader initially', () => {
    // @ts-expect-error - mocking async function
    vi.mocked(getMyIp).mockResolvedValue(mockIp);
    vi.mocked(getCatFact).mockResolvedValue(mockCatFact);

    render(<Network />);
    expect(screen.getByText('Завантаження...')).toBeInTheDocument();
  });

  it('should display IP and cat fact after loading', async () => {
    vi.mocked(getMyIp).mockResolvedValue(mockIp);
    vi.mocked(getCatFact).mockResolvedValue(mockCatFact);

    render(<Network />);

    await waitFor(() => {
      expect(screen.getByText(mockIp.ip)).toBeInTheDocument();
    });

    expect(screen.getByText(mockCatFact.fact)).toBeInTheDocument();
  });

  it('should display error message on fetch failure', async () => {
    vi.mocked(getMyIp).mockRejectedValue(new Error('Network error'));

    render(<Network />);

    await waitFor(() => {
      expect(screen.getByText(/помилка/i)).toBeInTheDocument();
    });
  });

  it('should call both API functions', async () => {
    vi.mocked(getMyIp).mockResolvedValue(mockIp);
    vi.mocked(getCatFact).mockResolvedValue(mockCatFact);

    render(<Network />);

    await waitFor(() => {
      expect(getMyIp).toHaveBeenCalled();
      expect(getCatFact).toHaveBeenCalled();
    });
  });

  it('should display request time after loading', async () => {
    vi.mocked(getMyIp).mockResolvedValue(mockIp);
    vi.mocked(getCatFact).mockResolvedValue(mockCatFact);

    render(<Network />);

    await waitFor(() => {
      expect(screen.getByText(/час запиту/i)).toBeInTheDocument();
    });
  });
});

