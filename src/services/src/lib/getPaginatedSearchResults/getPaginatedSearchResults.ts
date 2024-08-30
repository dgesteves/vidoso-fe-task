import { axiosInstance } from '../axiosInstance/axiosInstance';
import {
  ELEMENTS_PER_PAGE,
  FETCH_ERROR,
  INITIAL_PAGE,
  POSTS_ROUTE,
  TOTAL_COUNT_HEADER,
  USERS_ROUTE,
} from '@vidoso-fe-task/constants';
import {
  getPaginatedSearchResultsParams,
  PaginatedSearchResults,
} from '@vidoso-fe-task/types';

export async function getPaginatedSearchResults({
  pageParam = INITIAL_PAGE,
  searchTerm,
  elementsPerPage = ELEMENTS_PER_PAGE,
  endpoint = USERS_ROUTE,
}: getPaginatedSearchResultsParams): Promise<PaginatedSearchResults> {
  try {
    const response = await axiosInstance.get(endpoint, {
      params: {
        _page: pageParam,
        _limit: elementsPerPage,
        name_like:
          endpoint === USERS_ROUTE && searchTerm ? searchTerm : undefined,
        title_like:
          endpoint === POSTS_ROUTE && searchTerm ? searchTerm : undefined,
      },
    });

    const totalCount = Number(response.headers[TOTAL_COUNT_HEADER]);
    const totalPages = Math.ceil(totalCount / elementsPerPage);
    const currentPage = pageParam;
    const nextPage =
      currentPage < totalPages ? currentPage + INITIAL_PAGE : null;
    const prevPage =
      currentPage > INITIAL_PAGE ? currentPage - INITIAL_PAGE : null;
    const hasNextPage = currentPage < totalPages;
    const hasPrevPage = currentPage > INITIAL_PAGE;

    return {
      results: response.data,
      totalPages,
      currentPage,
      nextPage,
      prevPage,
      hasNextPage,
      hasPrevPage,
    };
  } catch (error) {
    console.error(FETCH_ERROR, error);
    throw new Error(FETCH_ERROR);
  }
}
