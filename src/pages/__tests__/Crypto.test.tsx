import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Crypto } from '../Crypto';
import { mockCoins, mockSuccessfulFetch } from '../../test/mockData';
import { getTopCoins } from '../../api';
import { useAppStore } from '../../store/appStore';

// Mock API
vi.mock('../../api', () => ({
  getTopCoins: vi.fn(),
}));

// Mock store
vi.mock('../../store/appStore', () => ({
  useAppStore: vi.fn(),
}));

describe('Crypto Page', () => {
  const mockStore = {
    getCache: vi.fn(),
    setCache: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAppStore).mockReturnValue(mockStore);
  });

  it('should display loader initially', () => {
    vi.mocked(getTopCoins).mockResolvedValue(mockCoins);
    mockStore.getCache.mockReturnValue(null);

    render(<Crypto />);
    expect(screen.getByText('Завантаження...')).toBeInTheDocument();
  });

  it('should check cache before fetching', () => {
    mockStore.getCache.mockReturnValue(null);
    vi.mocked(getTopCoins).mockResolvedValue(mockCoins);

    render(<Crypto />);

    expect(mockStore.getCache).toHaveBeenCalled();
  });

  it('should use cached data if available', async () => {
    mockStore.getCache.mockReturnValue(mockCoins);

    render(<Crypto />);

    await waitFor(() => {
      expect(screen.queryByText('Завантаження...')).not.toBeInTheDocument();
    });

    expect(getTopCoins).not.toHaveBeenCalled();
    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
  });

  it('should fetch and display coins', async () => {
    mockStore.getCache.mockReturnValue(null);
    vi.mocked(getTopCoins).mockResolvedValue(mockCoins);

    render(<Crypto />);

    await waitFor(() => {
      expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    });

    expect(screen.getByText('Ethereum')).toBeInTheDocument();
    expect(mockStore.setCache).toHaveBeenCalled();
  });

  it('should display error on fetch failure', async () => {
    mockStore.getCache.mockReturnValue(null);
    vi.mocked(getTopCoins).mockRejectedValue(new Error('API error'));

    render(<Crypto />);

    await waitFor(() => {
      expect(screen.getByText(/помилка/i)).toBeInTheDocument();
    });
  });

  it('should display coin prices correctly', async () => {
    mockStore.getCache.mockReturnValue(null);
    vi.mocked(getTopCoins).mockResolvedValue(mockCoins);

    render(<Crypto />);

    await waitFor(() => {
      expect(screen.getByText(/50,000/i)).toBeInTheDocument();
      expect(screen.getByText(/3,000/i)).toBeInTheDocument();
    });
  });

  it('should display positive and negative changes', async () => {
    mockStore.getCache.mockReturnValue(null);
    vi.mocked(getTopCoins).mockResolvedValue(mockCoins);

    render(<Crypto />);

    await waitFor(() => {
      expect(screen.getByText(/\+2.5%/i)).toBeInTheDocument();
      expect(screen.getByText(/-1.2%/i)).toBeInTheDocument();
    });
  });
});

