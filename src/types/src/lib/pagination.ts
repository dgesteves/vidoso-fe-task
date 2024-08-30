export type getPaginatedSearchResultsParams = {
  pageParam?: number;
  searchTerm: string;
  elementsPerPage?: number;
  endpoint?: string;
};

export type SearchResult = {
  id: number;
  name?: string;
  title?: string;
  body?: string;
};

export type PaginatedSearchResults = {
  results: SearchResult[];
  totalPages: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};
