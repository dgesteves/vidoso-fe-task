import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NotFoundPage, SearchPage } from '@vidoso-fe-task/pages';
import { PaginatedList } from '@vidoso-fe-task/components';
import { RouterErrorBoundary } from '../RouterErrorBoundary/RouterErrorBoundary';
import {
  NOT_FOUND_ROUTE,
  POSTS_ROUTE,
  ROOT_ROUTE,
  USERS_ROUTE,
} from '@vidoso-fe-task/constants';

// On a real-world scenario, you would have composable routes object here,
// depending on the app's needs.
export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={ROOT_ROUTE}
          element={<SearchPage />}
          errorElement={<RouterErrorBoundary />}
        >
          <Route path={USERS_ROUTE} element={<PaginatedList />} />
          <Route path={POSTS_ROUTE} element={<PaginatedList />} />
        </Route>
        <Route path={NOT_FOUND_ROUTE} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
