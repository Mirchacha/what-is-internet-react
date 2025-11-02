import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorMessage } from '../ErrorMessage';

describe('ErrorMessage', () => {
  it('should render error message as string', () => {
    render(<ErrorMessage error="Something went wrong" />);

    expect(screen.getByText('Помилка')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('should render error message as AppError object', () => {
    render(<ErrorMessage error={{ message: 'Network error', status: 500 }} />);

    expect(screen.getByText('Помилка')).toBeInTheDocument();
    expect(screen.getByText('Network error')).toBeInTheDocument();
    expect(screen.getByText('HTTP 500')).toBeInTheDocument();
  });

  it('should not render status when not provided', () => {
    render(<ErrorMessage error={{ message: 'Simple error' }} />);

    expect(screen.getByText('Simple error')).toBeInTheDocument();
    expect(screen.queryByText(/HTTP/)).not.toBeInTheDocument();
  });

  it('should render retry button when onRetry is provided', () => {
    const onRetry = vi.fn();
    render(<ErrorMessage error="Error" onRetry={onRetry} />);

    expect(screen.getByText('Спробувати ще раз')).toBeInTheDocument();
  });

  it('should not render retry button when onRetry is not provided', () => {
    render(<ErrorMessage error="Error" />);

    expect(screen.queryByText('Спробувати ще раз')).not.toBeInTheDocument();
  });

  it('should call onRetry when retry button is clicked', async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    render(<ErrorMessage error="Error" onRetry={onRetry} />);

    const retryButton = screen.getByText('Спробувати ще раз');
    await user.click(retryButton);

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('should render error icon', () => {
    const { container } = render(<ErrorMessage error="Error" />);

    const icon = container.querySelector('.error-icon');
    expect(icon).toBeInTheDocument();
  });
});

