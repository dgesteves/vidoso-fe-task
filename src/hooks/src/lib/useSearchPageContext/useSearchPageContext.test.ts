import { renderHook, act } from '@testing-library/react';
import { useSearchPageContext } from './useSearchPageContext';
import { useLocalStorage } from '../useLocalStorage/useLocalStorage';
import { useLocation } from 'react-router-dom';
import { vi, Mock } from 'vitest';

vi.mock('../useLocalStorage/useLocalStorage');
vi.mock('react-router-dom', () => ({
  useLocation: vi.fn(),
}));

describe('useSearchPageContext', () => {
  beforeEach(() => {
    (useLocalStorage as Mock).mockReturnValue(['', vi.fn()]);
    (useLocation as Mock).mockReturnValue({ pathname: '/search' });
  });

  it('returns initial context with empty search text', () => {
    const { result } = renderHook(() => useSearchPageContext());

    expect(result.current.outletContext).toEqual({
      searchQuery: '',
      endpoint: 'search',
    });
    expect(result.current.savedSearchText).toBe('');
  });

  it('updates context when search text is changed', () => {
    const setSavedSearchText = vi.fn();
    (useLocalStorage as Mock).mockReturnValue(['initial', setSavedSearchText]);

    const { result } = renderHook(() => useSearchPageContext());

    act(() => {
      result.current.setSavedSearchText('new search');
    });

    expect(setSavedSearchText).toHaveBeenCalledWith('new search');
  });

  it('updates context when location changes', () => {
    (useLocation as Mock).mockReturnValue({ pathname: '/new-path' });

    const { result } = renderHook(() => useSearchPageContext());

    expect(result.current.outletContext).toEqual({
      searchQuery: '',
      endpoint: 'new-path',
    });
  });

  it('handles empty pathname correctly', () => {
    (useLocation as Mock).mockReturnValue({ pathname: '' });

    const { result } = renderHook(() => useSearchPageContext());

    expect(result.current.outletContext).toEqual({
      searchQuery: '',
      endpoint: '',
    });
  });
});
