import { getPaginatedSearchResults } from './getPaginatedSearchResults';
import { axiosInstance } from '../axiosInstance/axiosInstance';
import { vi, Mock } from 'vitest';
import {
  FETCH_ERROR,
  INITIAL_PAGE,
  POSTS_ROUTE,
  USERS_ROUTE,
  TOTAL_COUNT_HEADER,
} from '@vidoso-fe-task/constants';

vi.mock('../axiosInstance/axiosInstance');

it('returns paginated results for users endpoint', async () => {
  (axiosInstance.get as Mock).mockResolvedValue({
    data: [{ id: 1, name: 'John Doe' }],
    headers: { [TOTAL_COUNT_HEADER]: '10' },
  });

  const result = await getPaginatedSearchResults({
    searchTerm: 'John',
    endpoint: USERS_ROUTE,
  });

  expect(result).toEqual({
    results: [{ id: 1, name: 'John Doe' }],
    totalPages: 1,
    currentPage: INITIAL_PAGE,
    nextPage: null,
    prevPage: null,
    hasNextPage: false,
    hasPrevPage: false,
  });
});

it('returns paginated results for posts endpoint', async () => {
  (axiosInstance.get as Mock).mockResolvedValue({
    data: [{ id: 1, title: 'Post Title' }],
    headers: { [TOTAL_COUNT_HEADER]: '10' },
  });

  const result = await getPaginatedSearchResults({
    searchTerm: 'Post',
    endpoint: POSTS_ROUTE,
  });

  expect(result).toEqual({
    results: [{ id: 1, title: 'Post Title' }],
    totalPages: 1,
    currentPage: INITIAL_PAGE,
    nextPage: null,
    prevPage: null,
    hasNextPage: false,
    hasPrevPage: false,
  });
});

it('handles empty search results', async () => {
  (axiosInstance.get as Mock).mockResolvedValue({
    data: [],
    headers: { [TOTAL_COUNT_HEADER]: '0' },
  });

  const result = await getPaginatedSearchResults({
    searchTerm: 'NonExistent',
    endpoint: USERS_ROUTE,
  });

  expect(result).toEqual({
    results: [],
    totalPages: 0,
    currentPage: INITIAL_PAGE,
    nextPage: null,
    prevPage: null,
    hasNextPage: false,
    hasPrevPage: false,
  });
});

// Error will be thrown on the console when the test run!!!
it('throws an error when the request fails', async () => {
  (axiosInstance.get as Mock).mockRejectedValue(new Error('Network Error'));

  await expect(
    getPaginatedSearchResults({
      searchTerm: 'Error',
      endpoint: USERS_ROUTE,
    })
  ).rejects.toThrow(FETCH_ERROR);
});
