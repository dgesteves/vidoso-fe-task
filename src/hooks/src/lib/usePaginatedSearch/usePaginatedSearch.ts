import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getPaginatedSearchResults } from '@vidoso-fe-task/services';
import {
  PaginatedSearchResults,
  PAGINATION_OUTLET_CONTEXT,
} from '@vidoso-fe-task/types';
import { ELEMENTS_PER_PAGE, INITIAL_PAGE } from '@vidoso-fe-task/constants';

export function usePaginatedSearch() {
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);

  const { searchQuery, endpoint } =
    useOutletContext<PAGINATION_OUTLET_CONTEXT>();

  const { isError, error, data, isPending } = useQuery<PaginatedSearchResults>({
    queryKey: ['paginatedSearchResults', currentPage, endpoint, searchQuery],
    queryFn: () =>
      getPaginatedSearchResults({
        pageParam: currentPage,
        searchTerm: searchQuery,
        elementsPerPage: ELEMENTS_PER_PAGE,
        endpoint,
      }),
    placeholderData: keepPreviousData,
    retry: false,
  });

  useEffect(() => {
    setCurrentPage(INITIAL_PAGE);
  }, [searchQuery, endpoint]);

  return {
    currentPage,
    setCurrentPage,
    endpoint,
    searchQuery,
    isError,
    error,
    data,
    isPending,
  };
}
