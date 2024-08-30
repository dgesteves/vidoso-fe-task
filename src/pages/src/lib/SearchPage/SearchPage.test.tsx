import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchPage } from './SearchPage';
import { useRedirect, useSearchPageContext } from '@vidoso-fe-task/hooks';
import { ROOT_ROUTE, USERS_ROUTE } from '@vidoso-fe-task/constants';
import { vi, Mock } from 'vitest';

vi.mock('@vidoso-fe-task/hooks', async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>;
  return {
    ...actual,
    useRedirect: vi.fn(),
    useSearchPageContext: vi.fn().mockReturnValue({
      outletContext: {},
      savedSearchText: '',
      setSavedSearchText: vi.fn(),
    }),
    useDebouncedValue: vi.fn(),
  };
});

describe('SearchPage', () => {
  it('calls useRedirect with ROOT_ROUTE and USERS_ROUTE', () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    expect(useRedirect).toHaveBeenCalledWith(ROOT_ROUTE, USERS_ROUTE);
  });

  it('renders SearchHeader with correct props', () => {
    const mockContext = {
      outletContext: {},
      savedSearchText: 'test',
      setSavedSearchText: vi.fn(),
    };
    (useSearchPageContext as Mock).mockReturnValue(mockContext);

    const { getByText } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    expect(
      getByText(
        (content, element) =>
          element?.tagName.toLowerCase() === 'input' &&
          (element as HTMLInputElement).value === 'test'
      )
    ).toBeInTheDocument();
  });

  it('renders NavigationTabs', () => {
    (useSearchPageContext as Mock).mockReturnValue({
      outletContext: {},
      savedSearchText: '',
      setSavedSearchText: vi.fn(),
    });

    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    expect(container.querySelector('nav')).toBeInTheDocument();
  });
});
