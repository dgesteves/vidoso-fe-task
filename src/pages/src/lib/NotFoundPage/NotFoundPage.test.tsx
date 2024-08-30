import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { NotFoundPage } from './NotFoundPage';
import { NOT_FOUND_ERROR } from '@vidoso-fe-task/constants';

describe('NotFoundPage', () => {
  it('renders the NOT_FOUND_ERROR message', () => {
    const { getByText } = render(<NotFoundPage />);
    expect(getByText(NOT_FOUND_ERROR)).toBeInTheDocument();
  });

  it('does not render any other text', () => {
    const { queryByText } = render(<NotFoundPage />);
    expect(queryByText('Some other text')).not.toBeInTheDocument();
  });
});
