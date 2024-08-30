import { renderHook, act } from '@testing-library/react';
import { usePaginatedSearch } from './usePaginatedSearch';
import { useOutletContext } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { INITIAL_PAGE } from '@vidoso-fe-task/constants';
import { vi, Mock } from 'vitest';

vi.mock('react-router-dom', () => ({
  useOutletContext: vi.fn(),
}));

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
  keepPreviousData: vi.fn(),
}));

vi.mock('@vidoso-fe-task/services', () => ({
  getPaginatedSearchResults: vi.fn(),
}));

describe('usePaginatedSearch', () => {
  beforeEach(() => {
    (useOutletContext as Mock).mockReturnValue({
      searchQuery: '',
      endpoint: 'search',
    });
    (useQuery as Mock).mockReturnValue({
      isError: false,
      error: null,
      data: null,
      isPending: false,
    });
  });

  it('returns initial state correctly', () => {
    const { result } = renderHook(() => usePaginatedSearch());

    expect(result.current.currentPage).toBe(INITIAL_PAGE);
    expect(result.current.endpoint).toBe('search');
    expect(result.current.searchQuery).toBe('');
    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.data).toBeNull();
    expect(result.current.isPending).toBe(false);
  });

  it('fetches data with correct parameters', () => {
    renderHook(() => usePaginatedSearch());

    expect(useQuery).toHaveBeenCalledWith({
      queryKey: ['paginatedSearchResults', INITIAL_PAGE, 'search', ''],
      queryFn: expect.any(Function),
      placeholderData: expect.any(Function),
      retry: false,
    });
  });

  it('updates currentPage when setCurrentPage is called', () => {
    const { result } = renderHook(() => usePaginatedSearch());

    act(() => {
      result.current.setCurrentPage(2);
    });

    expect(result.current.currentPage).toBe(2);
  });

  it('resets currentPage when searchQuery changes', () => {
    (useOutletContext as Mock).mockReturnValue({
      searchQuery: 'new query',
      endpoint: 'search',
    });

    const { result } = renderHook(() => usePaginatedSearch());

    expect(result.current.currentPage).toBe(INITIAL_PAGE);
  });

  it('resets currentPage when endpoint changes', () => {
    (useOutletContext as Mock).mockReturnValue({
      searchQuery: '',
      endpoint: 'new-endpoint',
    });

    const { result } = renderHook(() => usePaginatedSearch());

    expect(result.current.currentPage).toBe(INITIAL_PAGE);
  });

  it('handles error state correctly', () => {
    (useQuery as Mock).mockReturnValue({
      isError: true,
      error: new Error('Test error'),
      data: null,
      isPending: false,
    });

    const { result } = renderHook(() => usePaginatedSearch());

    expect(result.current.isError).toBe(true);
    expect(result.current.error).toEqual(new Error('Test error'));
  });

  it('handles pending state correctly', () => {
    (useQuery as Mock).mockReturnValue({
      isError: false,
      error: null,
      data: null,
      isPending: true,
    });

    const { result } = renderHook(() => usePaginatedSearch());

    expect(result.current.isPending).toBe(true);
  });

  it('returns data correctly when query is successful', () => {
    const mockData = { results: [], total: 0 };
    (useQuery as Mock).mockReturnValue({
      isError: false,
      error: null,
      data: mockData,
      isPending: false,
    });

    const { result } = renderHook(() => usePaginatedSearch());

    expect(result.current.data).toEqual(mockData);
  });
});
