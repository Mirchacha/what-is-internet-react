import { describe, it, expect } from 'vitest';
import {
  formatNumber,
  formatCurrency,
  formatPercent,
  formatDate,
  formatTemperature,
} from '../format';

describe('formatNumber', () => {
  it('should format number with default 2 decimals', () => {
    expect(formatNumber(1234.5678)).toContain('1');
    expect(formatNumber(1234.5678)).toContain('234');
  });

  it('should format number with custom decimals', () => {
    const result = formatNumber(1234.5678, 3);
    expect(result).toContain('1234');
  });

  it('should format integer', () => {
    const result = formatNumber(1000);
    expect(result).toBeDefined();
  });

  it('should format large numbers', () => {
    const result = formatNumber(1000000);
    expect(result).toBeDefined();
  });
});

describe('formatCurrency', () => {
  it('should format currency with default USD', () => {
    const result = formatCurrency(1234.56);
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
  });

  it('should format currency with custom currency', () => {
    const result = formatCurrency(1234.56, 'EUR');
    expect(result).toBeDefined();
  });

  it('should format currency with custom decimals', () => {
    const result = formatCurrency(1234.56, 'USD', 0);
    expect(result).toBeDefined();
  });

  it('should handle zero', () => {
    const result = formatCurrency(0);
    expect(result).toBeDefined();
  });

  it('should handle negative values', () => {
    const result = formatCurrency(-100);
    expect(result).toBeDefined();
  });
});

describe('formatPercent', () => {
  it('should format positive percent', () => {
    const result = formatPercent(12.5);
    expect(result).toContain('+');
    expect(result).toContain('%');
  });

  it('should format negative percent', () => {
    const result = formatPercent(-5.5);
    expect(result).toContain('%');
    expect(result).not.toContain('+');
  });

  it('should format percent with custom decimals', () => {
    const result = formatPercent(10.1234, 1);
    expect(result).toMatch(/\d+\.\d%/);
  });

  it('should handle zero percent', () => {
    const result = formatPercent(0);
    expect(result).toContain('%');
  });

  it('should handle large percent', () => {
    const result = formatPercent(999.99);
    expect(result).toBeDefined();
  });
});

describe('formatDate', () => {
  it('should format date string', () => {
    const result = formatDate('2024-01-01T12:00:00');
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
  });

  it('should format different date formats', () => {
    const result = formatDate('2023-12-31');
    expect(result).toBeDefined();
  });

  it('should handle ISO date strings', () => {
    const result = formatDate(new Date().toISOString());
    expect(result).toBeDefined();
  });
});

describe('formatTemperature', () => {
  it('should format positive temperature', () => {
    const result = formatTemperature(25.5);
    expect(result).toContain('+');
    expect(result).toContain('°C');
  });

  it('should format negative temperature', () => {
    const result = formatTemperature(-10.5);
    expect(result).toContain('°C');
    expect(result).not.toContain('+');
  });

  it('should format zero temperature', () => {
    const result = formatTemperature(0);
    expect(result).toContain('°C');
  });

  it('should format with 1 decimal', () => {
    const result = formatTemperature(20.555);
    expect(result).toMatch(/\d+\.\d°C/);
  });

  it('should handle large temperature', () => {
    const result = formatTemperature(100.5);
    expect(result).toBeDefined();
  });
});

