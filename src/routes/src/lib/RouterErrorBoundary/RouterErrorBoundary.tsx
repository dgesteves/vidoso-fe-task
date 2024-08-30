import {
  isRouteErrorResponse,
  useRouteError,
  ErrorResponse,
} from 'react-router-dom';
import {
  UNAUTHORIZED_ERROR,
  UNAUTHORIZED_ERROR_STATUS,
} from '@vidoso-fe-task/constants';

// On a real-world scenario, you would have a more complex error handling component here,
// and multiple error boundaries in your app.
export function RouterErrorBoundary() {
  const error = useRouteError() as ErrorResponse;

  if (
    isRouteErrorResponse(error && error.status === UNAUTHORIZED_ERROR_STATUS)
  ) {
    return (
      <div>
        <h1>{error.status}</h1>
        <p>{error.data || UNAUTHORIZED_ERROR}</p>
      </div>
    );
  }
}
