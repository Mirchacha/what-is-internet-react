import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from '../appStore';

describe('useAppStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useAppStore.setState({
      theme: 'light',
      cache: new Map(),
    });
  });

  it('should have light theme by default', () => {
    const { theme } = useAppStore.getState();
    expect(theme).toBe('light');
  });

  it('should toggle theme', () => {
    const { toggleTheme } = useAppStore.getState();
    toggleTheme();

    const { theme } = useAppStore.getState();
    expect(theme).toBe('dark');

    toggleTheme();
    expect(useAppStore.getState().theme).toBe('light');
  });

  it('should initialize with empty cache', () => {
    const { cache } = useAppStore.getState();
    expect(cache.size).toBe(0);
  });

  it('should set cache value', () => {
    const { setCache } = useAppStore.getState();
    setCache('test-key', { data: 'test' });

    const { getCache } = useAppStore.getState();
    const cached = getCache<{ data: string }>('test-key');
    expect(cached).toEqual({ data: 'test' });
  });

  it('should get cache value within TTL', () => {
    const { setCache, getCache } = useAppStore.getState();
    setCache('test-key', { value: 123 }, 10000);

    const cached = getCache<{ value: number }>('test-key', 10000);
    expect(cached).toEqual({ value: 123 });
  });

  it('should return null for expired cache', () => {
    const { setCache, getCache } = useAppStore.getState();
    setCache('test-key', { value: 123 }, -1000); // Already expired

    const cached = getCache<{ value: number }>('test-key');
    expect(cached).toBeNull();
  });

  it('should return null for non-existent cache', () => {
    const { getCache } = useAppStore.getState();
    const cached = getCache('non-existent-key');
    expect(cached).toBeNull();
  });

  it('should use default TTL if not specified', () => {
    const { setCache, getCache } = useAppStore.getState();
    setCache('default-key', { test: true });

    const cached = getCache<{ test: boolean }>('default-key');
    expect(cached).toEqual({ test: true });
  });

  it('should clear all cache', () => {
    const { setCache, clearCache, getCache } = useAppStore.getState();
    setCache('key1', { data: 1 });
    setCache('key2', { data: 2 });
    setCache('key3', { data: 3 });

    expect(getCache('key1')).not.toBeNull();
    expect(getCache('key2')).not.toBeNull();

    clearCache();

    expect(getCache('key1')).toBeNull();
    expect(getCache('key2')).toBeNull();
    expect(getCache('key3')).toBeNull();
  });

  it('should cache different types of data', () => {
    const { setCache, getCache } = useAppStore.getState();
    
    setCache('string-key', 'test string');
    setCache('number-key', 12345);
    setCache('array-key', [1, 2, 3]);
    setCache('object-key', { nested: { value: 'deep' } });

    expect(getCache<string>('string-key')).toBe('test string');
    expect(getCache<number>('number-key')).toBe(12345);
    expect(getCache<number[]>('array-key')).toEqual([1, 2, 3]);
    expect(getCache<{ nested: { value: string } }>('object-key')).toEqual({
      nested: { value: 'deep' },
    });
  });

  it('should handle multiple cache entries', () => {
    const { setCache, getCache } = useAppStore.getState();
    
    for (let i = 0; i < 10; i++) {
      setCache(`key-${i}`, { index: i });
    }

    expect(getCache<{ index: number }>('key-0')).toEqual({ index: 0 });
    expect(getCache<{ index: number }>('key-5')).toEqual({ index: 5 });
    expect(getCache<{ index: number }>('key-9')).toEqual({ index: 9 });
  });
});

