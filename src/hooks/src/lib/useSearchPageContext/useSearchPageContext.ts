import { useLocalStorage } from '../useLocalStorage/useLocalStorage';
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import {
  INDEX_AFTER_SLASH,
  LOCAL_STORAGE_KEY,
} from '@vidoso-fe-task/constants';
import { PAGINATION_OUTLET_CONTEXT } from '@vidoso-fe-task/types';

export function useSearchPageContext() {
  const [savedSearchText, setSavedSearchText] = useLocalStorage(
    LOCAL_STORAGE_KEY,
    String()
  );

  const location = useLocation();

  const outletContext = useMemo<PAGINATION_OUTLET_CONTEXT>(
    () => ({
      searchQuery: savedSearchText,
      endpoint: location.pathname.slice(INDEX_AFTER_SLASH),
    }),
    [savedSearchText, location.pathname]
  );

  return { outletContext, savedSearchText, setSavedSearchText };
}
