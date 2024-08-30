import { renderHook, act } from '@testing-library/react';
import { useDebouncedValue } from './useDebouncedValue';
import { vi } from 'vitest';

it('returns initial value immediately', () => {
  const { result } = renderHook(() => useDebouncedValue('initial', 500));
  expect(result.current).toBe('initial');
});

it('updates value after delay', async () => {
  vi.useFakeTimers();
  const { result, rerender } = renderHook(
    ({ value, delay }) => useDebouncedValue(value, delay),
    {
      initialProps: { value: 'initial', delay: 500 },
    }
  );

  rerender({ value: 'updated', delay: 500 });
  act(() => {
    vi.advanceTimersByTime(500);
  });

  expect(result.current).toBe('updated');
  vi.useRealTimers();
});

it('does not update value before delay', () => {
  vi.useFakeTimers();
  const { result, rerender } = renderHook(
    ({ value, delay }) => useDebouncedValue(value, delay),
    {
      initialProps: { value: 'initial', delay: 500 },
    }
  );

  rerender({ value: 'updated', delay: 500 });
  act(() => {
    vi.advanceTimersByTime(300);
  });

  expect(result.current).toBe('initial');
  vi.useRealTimers();
});

it('handles changing delay', () => {
  vi.useFakeTimers();
  const { result, rerender } = renderHook(
    ({ value, delay }) => useDebouncedValue(value, delay),
    {
      initialProps: { value: 'initial', delay: 500 },
    }
  );

  rerender({ value: 'updated', delay: 1000 });
  act(() => {
    vi.advanceTimersByTime(500);
  });

  expect(result.current).toBe('initial');

  act(() => {
    vi.advanceTimersByTime(500);
  });

  expect(result.current).toBe('updated');
  vi.useRealTimers();
});
