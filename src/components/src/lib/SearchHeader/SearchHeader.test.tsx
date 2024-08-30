import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SearchHeader } from './SearchHeader';
import { vi } from 'vitest';

vi.mock('@vidoso-fe-task/hooks', () => ({
  useDebouncedValue: vi.fn((value) => value),
}));

describe('SearchHeader', () => {
  it('renders with initial search text', () => {
    render(
      <SearchHeader
        savedSearchText="Initial search"
        setSavedSearchText={vi.fn()}
      />
    );
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('Initial search');
  });

  it('calls setSavedSearchText with debounced input', async () => {
    const setSavedSearchTextMock = vi.fn();
    render(
      <SearchHeader
        savedSearchText=""
        setSavedSearchText={setSavedSearchTextMock}
      />
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'New search text' } });

    await waitFor(() =>
      expect(setSavedSearchTextMock).toHaveBeenCalledWith('New search text')
    );
  });

  it('updates local state when typing in the input', () => {
    render(<SearchHeader savedSearchText="" setSavedSearchText={vi.fn()} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'typing...' } });

    expect(input).toHaveValue('typing...');
  });

  it('renders SearchInput with correct initial value', () => {
    render(
      <SearchHeader
        savedSearchText="Initial search"
        setSavedSearchText={vi.fn()}
      />
    );
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('Initial search');
  });
});
