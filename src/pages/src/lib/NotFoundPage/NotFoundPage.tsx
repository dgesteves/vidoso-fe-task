// On a 404 error, this component will be rendered.
// It's a simple component that displays "Not Found", in a real application you might want to display a more user-friendly message!!
import { NOT_FOUND_ERROR } from '@vidoso-fe-task/constants';

export function NotFoundPage() {
  return <div>{NOT_FOUND_ERROR}</div>;
}
