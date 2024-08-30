import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { PaginationFooter } from './PaginationFooter';
import { vi } from 'vitest';
import { NEXT_BUTTON_TEXT, PREV_BUTTON_TEXT } from '@vidoso-fe-task/constants';

describe('PaginationFooter', () => {
  it('renders previous button when hasPrevPage is true', () => {
    const setCurrentPageMock = vi.fn();
    const { getByText } = render(
      <PaginationFooter
        totalPages={5}
        currentPage={3}
        setCurrentPage={setCurrentPageMock}
        hasPrevPage={true}
        hasNextPage={true}
      />
    );
    expect(getByText(PREV_BUTTON_TEXT)).toBeInTheDocument();
  });

  it('does not render previous button when hasPrevPage is false', () => {
    const setCurrentPageMock = vi.fn();
    const { queryByText } = render(
      <PaginationFooter
        totalPages={5}
        currentPage={3}
        setCurrentPage={setCurrentPageMock}
        hasPrevPage={false}
        hasNextPage={true}
      />
    );
    expect(queryByText(PREV_BUTTON_TEXT)).toBeNull();
  });

  it('renders next button when hasNextPage is true', () => {
    const setCurrentPageMock = vi.fn();
    const { getByText } = render(
      <PaginationFooter
        totalPages={5}
        currentPage={3}
        setCurrentPage={setCurrentPageMock}
        hasPrevPage={true}
        hasNextPage={true}
      />
    );
    expect(getByText(NEXT_BUTTON_TEXT)).toBeInTheDocument();
  });

  it('does not render next button when hasNextPage is false', () => {
    const setCurrentPageMock = vi.fn();
    const { queryByText } = render(
      <PaginationFooter
        totalPages={5}
        currentPage={3}
        setCurrentPage={setCurrentPageMock}
        hasPrevPage={true}
        hasNextPage={false}
      />
    );
    expect(queryByText(NEXT_BUTTON_TEXT)).toBeNull();
  });

  it('calls setCurrentPage with correct value on previous button click', () => {
    const setCurrentPageMock = vi.fn();
    const { getByText } = render(
      <PaginationFooter
        totalPages={5}
        currentPage={3}
        setCurrentPage={setCurrentPageMock}
        hasPrevPage={true}
        hasNextPage={true}
      />
    );
    fireEvent.click(getByText(PREV_BUTTON_TEXT));
    expect(setCurrentPageMock).toHaveBeenCalled();
    expect(setCurrentPageMock.mock.calls[0][0](3)).toBe(2);
  });

  it('calls setCurrentPage with correct value on next button click', () => {
    const setCurrentPageMock = vi.fn();
    const { getByText } = render(
      <PaginationFooter
        totalPages={5}
        currentPage={3}
        setCurrentPage={setCurrentPageMock}
        hasPrevPage={true}
        hasNextPage={true}
      />
    );
    fireEvent.click(getByText(NEXT_BUTTON_TEXT));
    expect(setCurrentPageMock).toHaveBeenCalled();
    expect(setCurrentPageMock.mock.calls[0][0](3)).toBe(4);
  });
});
