import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';
import { vi } from 'vitest';

it('returns initial value if localStorage is empty', () => {
  localStorage.clear();
  const { result } = renderHook(() => useLocalStorage('key', 'initial'));
  expect(result.current[0]).toBe('initial');
});

it('returns stored value from localStorage', () => {
  localStorage.setItem('key', JSON.stringify('stored'));
  const { result } = renderHook(() => useLocalStorage('key', 'initial'));
  expect(result.current[0]).toBe('stored');
});

it('updates localStorage when value is set', () => {
  localStorage.clear();
  const { result } = renderHook(() => useLocalStorage('key', 'initial'));
  act(() => {
    result.current[1]('updated');
  });
  expect(localStorage.getItem('key')).toBe(JSON.stringify('updated'));
  expect(result.current[0]).toBe('updated');
});

// This test will log an error to the console when it runs.
it('handles JSON parse error gracefully', () => {
  localStorage.setItem('key', 'invalid JSON');
  const { result } = renderHook(() => useLocalStorage('key', 'initial'));
  expect(result.current[0]).toBe('initial');
});

// This test will log an error to the console when it runs.
it('handles localStorage setItem error gracefully', () => {
  const setItemMock = vi
    .spyOn(Storage.prototype, 'setItem')
    .mockImplementation(() => {
      throw new Error('setItem error');
    });
  const { result } = renderHook(() => useLocalStorage('key', 'initial'));
  act(() => {
    result.current[1]('updated');
  });
  expect(result.current[0]).toBe('initial');
  setItemMock.mockRestore();
});
