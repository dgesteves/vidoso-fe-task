import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { ButtonList } from './ButtonList';
import { vi } from 'vitest';

describe('ButtonList', () => {
  it('renders correct number of buttons', () => {
    const setCurrentPageMock = vi.fn();
    const { getAllByRole } = render(
      <ButtonList
        totalPages={5}
        currentPage={1}
        setCurrentPage={setCurrentPageMock}
      />
    );
    expect(getAllByRole('button').length).toBe(5);
  });

  it('highlights the current page button', () => {
    const setCurrentPageMock = vi.fn();
    const { getByText } = render(
      <ButtonList
        totalPages={5}
        currentPage={3}
        setCurrentPage={setCurrentPageMock}
      />
    );
    expect(getByText('3')).toHaveClass('bg-primary-600');
  });

  it('calls setCurrentPage with correct page number on button click', () => {
    const setCurrentPageMock = vi.fn();
    const { getByText } = render(
      <ButtonList
        totalPages={5}
        currentPage={1}
        setCurrentPage={setCurrentPageMock}
      />
    );
    fireEvent.click(getByText('4'));
    expect(setCurrentPageMock).toHaveBeenCalledWith(4);
  });

  it('renders no buttons when totalPages is zero', () => {
    const setCurrentPageMock = vi.fn();
    const { container } = render(
      <ButtonList
        totalPages={0}
        currentPage={1}
        setCurrentPage={setCurrentPageMock}
      />
    );
    expect(container.firstChild).not.toBeNull();
    if (container.firstChild) {
      expect(container.firstChild.childNodes.length).toBe(0);
    }
  });

  it('does not highlight any button if currentPage is out of range', () => {
    const setCurrentPageMock = vi.fn();
    const { getAllByRole } = render(
      <ButtonList
        totalPages={5}
        currentPage={10}
        setCurrentPage={setCurrentPageMock}
      />
    );
    getAllByRole('button').forEach((button) => {
      expect(button).not.toHaveClass('bg-primary-600');
    });
  });
});
