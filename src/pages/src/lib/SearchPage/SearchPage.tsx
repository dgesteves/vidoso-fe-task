import { Outlet } from 'react-router-dom';
import { useRedirect, useSearchPageContext } from '@vidoso-fe-task/hooks';
import { NavigationTabs, SearchHeader } from '@vidoso-fe-task/components';
import { ROOT_ROUTE, USERS_ROUTE } from '@vidoso-fe-task/constants';

export function SearchPage() {
  useRedirect(ROOT_ROUTE, USERS_ROUTE);

  const { outletContext, savedSearchText, setSavedSearchText } =
    useSearchPageContext();

  return (
    <main className="flex flex-col w-screen h-screen overflow-hidden">
      <SearchHeader
        savedSearchText={savedSearchText}
        setSavedSearchText={setSavedSearchText}
      />
      <NavigationTabs />
      <Outlet context={outletContext} />
    </main>
  );
}
