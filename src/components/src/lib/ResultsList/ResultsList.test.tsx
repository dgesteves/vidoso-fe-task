import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ResultsList } from './ResultsList';
import { SearchResult } from '@vidoso-fe-task/types';
import { POSTS_ROUTE, USERS_ROUTE } from '@vidoso-fe-task/constants';

describe('ResultsList', () => {
  const mockUserResult: SearchResult = { id: 1, name: 'John Doe' };
  const mockPostResult: SearchResult = {
    id: 2,
    title: 'Sample Title',
    body: 'Sample body text',
  };

  it('renders user results correctly', () => {
    const { getByText } = render(
      <ResultsList
        results={[mockUserResult]}
        endpoint={USERS_ROUTE}
        hasMorePages={false}
      />
    );
    expect(getByText('John Doe')).toBeInTheDocument();
  });

  it('renders post results correctly', () => {
    const { getByText } = render(
      <ResultsList
        results={[mockPostResult]}
        endpoint={POSTS_ROUTE}
        hasMorePages={false}
      />
    );
    expect(getByText('Sample Title')).toBeInTheDocument();
    expect(getByText('Sample body text')).toBeInTheDocument();
  });

  it('applies correct height class when there are more pages', () => {
    const { container } = render(
      <ResultsList
        results={[mockUserResult]}
        endpoint={USERS_ROUTE}
        hasMorePages={true}
      />
    );
    expect(container.firstChild).not.toBeNull();
    if (container.firstChild) {
      expect(container.firstChild).toHaveClass('h-[calc(100vh-168px)]');
    }
  });

  it('applies correct height class when there are no more pages', () => {
    const { container } = render(
      <ResultsList
        results={[mockUserResult]}
        endpoint={USERS_ROUTE}
        hasMorePages={false}
      />
    );
    expect(container.firstChild).not.toBeNull();
    if (container.firstChild) {
      expect(container.firstChild).toHaveClass('h-[calc(100vh-128px)]');
    }
  });

  it('renders empty list correctly', () => {
    const { container } = render(
      <ResultsList results={[]} endpoint={USERS_ROUTE} hasMorePages={false} />
    );
    expect(container.firstChild).not.toBeNull();
    if (container.firstChild) {
      expect(container.firstChild.childNodes.length).toBe(0);
    }
  });
});
