import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PaginationButton } from './PaginationButton';
import { vi } from 'vitest';

it('renders children correctly', () => {
  const handleClick = vi.fn();
  render(<PaginationButton onClick={handleClick}>Page 1</PaginationButton>);
  expect(screen.getByText('Page 1')).toBeInTheDocument();
});

it('calls onClick when clicked', async () => {
  const user = userEvent.setup();
  const handleClick = vi.fn();
  render(<PaginationButton onClick={handleClick}>Page 1</PaginationButton>);
  await user.click(screen.getByText('Page 1'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});

it('applies selected styles when isSelected is true', () => {
  const handleClick = vi.fn();
  render(
    <PaginationButton onClick={handleClick} isSelected>
      Page 1
    </PaginationButton>
  );
  expect(screen.getByText('Page 1')).toHaveClass('bg-primary-600');
});

it('applies default styles when isSelected is false', () => {
  const handleClick = vi.fn();
  render(<PaginationButton onClick={handleClick}>Page 1</PaginationButton>);
  expect(screen.getByText('Page 1')).toHaveClass('bg-primary-400');
});

it('passes additional props to the button element', () => {
  const handleClick = vi.fn();
  render(
    <PaginationButton onClick={handleClick} aria-label="pagination-button">
      Page 1
    </PaginationButton>
  );
  expect(screen.getByLabelText('pagination-button')).toBeInTheDocument();
});
