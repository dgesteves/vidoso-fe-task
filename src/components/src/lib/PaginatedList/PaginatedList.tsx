import { usePaginatedSearch } from '@vidoso-fe-task/hooks';
import { PaginationFooter } from '../PaginationFooter/PaginationFooter';
import { EmptyResults } from '../EmptyResults/EmptyResults';
import { SearchError } from '../SearchError/SearchError';
import { ResultsList } from '../ResultsList/ResultsList';

export function PaginatedList() {
  const {
    currentPage,
    setCurrentPage,
    endpoint,
    searchQuery,
    isError,
    error,
    data,
    isPending,
  } = usePaginatedSearch();

  if (isError) {
    return <SearchError error={error} />;
  }

  return (
    <section className="flex justify-between flex-col h-full w-full">
      {data?.results?.length === 0 && !isPending && (
        <EmptyResults searchQuery={searchQuery} />
      )}
      {data?.results?.length !== 0 && (
        <ResultsList
          results={data?.results ?? []}
          endpoint={endpoint}
          hasMorePages={(data?.totalPages ?? 0) > 1}
        />
      )}
      {(data?.totalPages ?? 0) > 1 && (
        <PaginationFooter
          hasNextPage={data?.hasNextPage ?? false}
          hasPrevPage={data?.hasPrevPage ?? false}
          totalPages={data?.totalPages ?? 0}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </section>
  );
}
