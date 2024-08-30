import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { UserResult } from './UserResult';
import { SearchResult } from '@vidoso-fe-task/types';

describe('UserResult', () => {
  const mockResult: SearchResult = { id: 1, name: 'John Doe' };

  it('renders user name correctly', () => {
    const { getByText } = render(
      <UserResult result={mockResult} isLast={false} />
    );
    expect(getByText('John Doe')).toBeInTheDocument();
  });

  it('applies border class when not the last item', () => {
    const { container } = render(
      <UserResult result={mockResult} isLast={false} />
    );
    expect(container.firstChild).toHaveClass('border-b-2');
  });

  it('does not apply border class when it is the last item', () => {
    const { container } = render(
      <UserResult result={mockResult} isLast={true} />
    );
    expect(container.firstChild).not.toHaveClass('border-b-2');
  });

  it('applies correct classes to the container', () => {
    const { container } = render(
      <UserResult result={mockResult} isLast={false} />
    );
    expect(container.firstChild).toHaveClass(
      'flex gap-5 items-center w-full pb-4'
    );
  });

  it('renders placeholder avatar correctly', () => {
    const { container } = render(
      <UserResult result={mockResult} isLast={false} />
    );
    expect(
      container.querySelector('.w-14.h-14.bg-secondary-400.rounded-full')
    ).toBeInTheDocument();
  });
});
