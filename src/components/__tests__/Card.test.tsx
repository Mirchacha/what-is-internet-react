import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from '../Card';

describe('Card', () => {
  it('should render children', () => {
    render(
      <Card>
        <div>Test Content</div>
      </Card>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should render with title', () => {
    render(
      <Card title="Test Title">
        <div>Content</div>
      </Card>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('should not render title when not provided', () => {
    render(
      <Card>
        <div>Content</div>
      </Card>
    );

    const headings = screen.queryAllByRole('heading');
    expect(headings).toHaveLength(0);
  });

  it('should apply custom className', () => {
    const { container } = render(
      <Card className="custom-class">
        <div>Content</div>
      </Card>
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should render complex content', () => {
    render(
      <Card title="Complex Card">
        <div>
          <h3>Section 1</h3>
          <p>Paragraph 1</p>
          <button>Click me</button>
        </div>
      </Card>
    );

    expect(screen.getByText('Complex Card')).toBeInTheDocument();
    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Paragraph 1')).toBeInTheDocument();
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});

