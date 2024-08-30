import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { PostResult } from './PostResult';
import { SearchResult } from '@vidoso-fe-task/types';

describe('PostResult', () => {
  const mockResult: SearchResult = {
    id: 1,
    title: 'Sample Title',
    body: 'Sample body text',
  };

  it('renders post title correctly', () => {
    const { getByText } = render(
      <PostResult result={mockResult} isLast={false} />
    );
    expect(getByText('Sample Title')).toBeInTheDocument();
  });

  it('renders post body correctly', () => {
    const { getByText } = render(
      <PostResult result={mockResult} isLast={false} />
    );
    expect(getByText('Sample body text')).toBeInTheDocument();
  });

  it('applies border class when not the last item', () => {
    const { container } = render(
      <PostResult result={mockResult} isLast={false} />
    );
    expect(container.firstChild).toHaveClass('border-b-2');
  });

  it('does not apply border class when it is the last item', () => {
    const { container } = render(
      <PostResult result={mockResult} isLast={true} />
    );
    expect(container.firstChild).not.toHaveClass('border-b-2');
  });

  it('applies correct classes to the container', () => {
    const { container } = render(
      <PostResult result={mockResult} isLast={false} />
    );
    expect(container.firstChild).toHaveClass('flex flex-col gap-3 w-full pb-4');
  });
});
