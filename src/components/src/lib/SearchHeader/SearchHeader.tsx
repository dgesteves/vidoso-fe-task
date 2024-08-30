import { SearchInput } from '@vidoso-fe-task/ui';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useDebouncedValue } from '@vidoso-fe-task/hooks';
import { SEARCH_DEBOUNCE_TIME } from '@vidoso-fe-task/constants';

type SearchHeaderProps = {
  savedSearchText: string;
  setSavedSearchText: (searchText: string) => void;
};

export function SearchHeader({
  savedSearchText,
  setSavedSearchText,
}: SearchHeaderProps) {
  const [searchText, setSearchText] = useState(savedSearchText);
  const debouncedSearchText = useDebouncedValue(
    searchText,
    SEARCH_DEBOUNCE_TIME
  );

  useEffect(() => {
    setSavedSearchText(debouncedSearchText);
  }, [debouncedSearchText, setSavedSearchText]);

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  }, []);

  return (
    <header className="flex px-6 py-4 bg-primary-500">
      <form onSubmit={(e) => e.preventDefault()} className="flex w-full">
        <SearchInput value={searchText} onChange={handleSearchChange} />
      </form>
    </header>
  );
}
