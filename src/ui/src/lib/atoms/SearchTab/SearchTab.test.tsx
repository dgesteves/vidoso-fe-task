import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { SearchTab } from './SearchTab';

it('renders with default tab', () => {
  const { container } = render(
    <BrowserRouter>
      <SearchTab tab="home" />
    </BrowserRouter>
  );
  const navLink = container.querySelector('a');
  expect(navLink).toHaveTextContent('home');
  expect(navLink).toHaveAttribute('href', '/home');
});

it('applies active class when tab is active', async () => {
  const user = userEvent.setup();
  render(
    <BrowserRouter>
      <SearchTab tab="home" />
    </BrowserRouter>
  );
  const navLink = screen.getByText('home');
  await user.click(navLink);
  expect(navLink).toHaveClass('bg-primary-600');
});

it('applies inactive class when tab is not active', () => {
  const { container } = render(
    <BrowserRouter>
      <SearchTab tab="about" />
    </BrowserRouter>
  );
  const navLink = container.querySelector('a');
  expect(navLink).toHaveClass('bg-primary-400');
});

it('renders with custom tab name', () => {
  const { container } = render(
    <BrowserRouter>
      <SearchTab tab="custom-tab" />
    </BrowserRouter>
  );
  const navLink = container.querySelector('a');
  expect(navLink).toHaveTextContent('custom-tab');
  expect(navLink).toHaveAttribute('href', '/custom-tab');
});
