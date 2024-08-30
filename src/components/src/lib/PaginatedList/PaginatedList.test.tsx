import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { PaginatedList } from './PaginatedList';
import { vi, Mock } from 'vitest';
import { usePaginatedSearch } from '@vidoso-fe-task/hooks';
import { USERS_ROUTE } from '@vidoso-fe-task/constants';

vi.mock('@vidoso-fe-task/hooks');

describe('PaginatedList', () => {
  it('renders SearchError when isError is true', () => {
    (usePaginatedSearch as Mock).mockReturnValue({
      isError: true,
      error: 'Error message',
    });
    const { getByText } = render(<PaginatedList />);
    expect(
      getByText((content, element) => content.includes('Search Error:'))
    ).toBeInTheDocument();
  });

  it('renders EmptyResults when there are no results and not pending', () => {
    (usePaginatedSearch as Mock).mockReturnValue({
      data: { results: [] },
      isPending: false,
      searchQuery: 'test query',
    });
    const { getByText } = render(<PaginatedList />);
    expect(
      getByText((content, element) => content.includes('No results found for'))
    ).toBeInTheDocument();
    expect(
      getByText((content, element) => content.includes('test query'))
    ).toBeInTheDocument();
  });

  it('renders ResultsList when there are results', () => {
    (usePaginatedSearch as Mock).mockReturnValue({
      data: { results: [{ id: 1, name: 'Result 1' }] },
      endpoint: USERS_ROUTE,
    });
    render(<PaginatedList />);

    expect(
      screen.getByText((content, element) => content.includes('Result 1'))
    ).toBeInTheDocument();
  });

  it('renders PaginationFooter when there are multiple pages', () => {
    (usePaginatedSearch as Mock).mockReturnValue({
      data: { totalPages: 2, hasNextPage: true, hasPrevPage: true },
      currentPage: 1,
      setCurrentPage: vi.fn(),
    });
    const { getByText } = render(<PaginatedList />);
    expect(
      getByText((content, element) => content.includes('Next'))
    ).toBeInTheDocument();
    expect(
      getByText((content, element) => content.includes('Prev'))
    ).toBeInTheDocument();
  });

  it('does not render PaginationFooter when there is only one page', () => {
    (usePaginatedSearch as Mock).mockReturnValue({
      data: { totalPages: 1 },
    });
    const { queryByText } = render(<PaginatedList />);
    expect(queryByText('Next')).toBeNull();
    expect(queryByText('Previous')).toBeNull();
  });
});
