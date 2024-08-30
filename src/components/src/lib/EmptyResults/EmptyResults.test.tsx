import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { EmptyResults } from './EmptyResults';
import { NO_RESULTS_FOUND } from '@vidoso-fe-task/constants';

describe('EmptyResults', () => {
  it('renders no results found message correctly', () => {
    const { getByText } = render(<EmptyResults searchQuery="test" />);
    expect(getByText(NO_RESULTS_FOUND)).toBeInTheDocument();
  });

  it('renders search query correctly', () => {
    const { getByText } = render(<EmptyResults searchQuery="test" />);
    expect(getByText('"test"')).toBeInTheDocument();
  });

  it('applies correct classes to the container', () => {
    const { container } = render(<EmptyResults searchQuery="test" />);
    expect(container.firstChild).toHaveClass(
      'flex flex-col justify-center items-center w-full h-full'
    );
  });

  it('applies correct classes to the no results found message', () => {
    const { getByText } = render(<EmptyResults searchQuery="test" />);
    expect(getByText(NO_RESULTS_FOUND)).toHaveClass(
      'text-xl font-medium text-secondary-800'
    );
  });

  it('applies correct classes to the search query', () => {
    const { getByText } = render(<EmptyResults searchQuery="test" />);
    expect(getByText('"test"')).toHaveClass(
      'text-lg font-normal text-primary-800'
    );
  });
});
