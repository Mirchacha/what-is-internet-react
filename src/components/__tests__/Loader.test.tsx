import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Loader } from '../Loader';

describe('Loader', () => {
  it('should render loader spinner', () => {
    const { container } = render(<Loader />);

    const loader = container.querySelector('.loader');
    expect(loader).toBeInTheDocument();
  });

  it('should display loading text', () => {
    render(<Loader />);

    expect(screen.getByText('Завантаження...')).toBeInTheDocument();
  });

  it('should have loader container', () => {
    const { container } = render(<Loader />);

    const containerDiv = container.querySelector('.loader-container');
    expect(containerDiv).toBeInTheDocument();
  });
});

