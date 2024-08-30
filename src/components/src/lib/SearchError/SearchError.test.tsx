import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { SearchError } from './SearchError';
import { SEARCH_ERROR } from '@vidoso-fe-task/constants';

describe('SearchError', () => {
  it('renders error message correctly', () => {
    const error = new Error('Sample error message');
    const { getByText } = render(<SearchError error={error} />);
    expect(getByText('Sample error message')).toBeInTheDocument();
  });

  it('renders default search error text', () => {
    const error = new Error('Sample error message');
    const { getByText } = render(<SearchError error={error} />);
    expect(getByText(SEARCH_ERROR)).toBeInTheDocument();
  });

  it('handles non-error objects gracefully', () => {
    const error = { message: 'Non-error object message' };
    const { getByText } = render(<SearchError error={error} />);
    expect(getByText('Non-error object message')).toBeInTheDocument();
  });

  it('handles empty error object gracefully', () => {
    const error = {};
    const { container } = render(<SearchError error={error} />);
    const preElement = container.querySelector('pre');
    expect(preElement).not.toBeNull();
    if (preElement) {
      expect(preElement.textContent).toBe('');
    }
  });

  it('applies correct classes to the container', () => {
    const error = new Error('Sample error message');
    const { container } = render(<SearchError error={error} />);
    expect(container.firstChild).toHaveClass(
      'flex flex-col items-center justify-center h-full w-full'
    );
  });

  it('applies correct classes to the error message', () => {
    const error = new Error('Sample error message');
    const { container } = render(<SearchError error={error} />);
    const spanElement = container.querySelector('span');
    expect(spanElement).not.toBeNull();
    if (spanElement) {
      expect(spanElement).toHaveClass('text-2xl font-medium text-red-500');
    }
    const preElement = container.querySelector('pre');
    expect(preElement).not.toBeNull();
    if (preElement) {
      expect(preElement).toHaveClass(
        'text-lg font-normal text-red-500 whitespace-pre-wrap'
      );
    }
  });
});
