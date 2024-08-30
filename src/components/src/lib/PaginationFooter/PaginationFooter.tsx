import { Dispatch, SetStateAction } from 'react';
import { PaginationButton } from '@vidoso-fe-task/ui';
import { ButtonList } from '../ButtonList/ButtonList';
import {
  INITIAL_PAGE,
  NEXT_BUTTON_TEXT,
  PREV_BUTTON_TEXT,
} from '@vidoso-fe-task/constants';

type PaginationFooterProps = {
  totalPages: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  hasPrevPage: boolean;
  hasNextPage: boolean;
};

export function PaginationFooter({
  totalPages,
  currentPage,
  setCurrentPage,
  hasPrevPage,
  hasNextPage,
}: PaginationFooterProps) {
  const handlePrevClick = () => {
    setCurrentPage((prev) => prev - INITIAL_PAGE);
  };

  const handleNextClick = () => {
    setCurrentPage((prev) => prev + INITIAL_PAGE);
  };

  return (
    <footer className="flex w-full items-center">
      {hasPrevPage && (
        <PaginationButton onClick={handlePrevClick}>
          {PREV_BUTTON_TEXT}
        </PaginationButton>
      )}
      <ButtonList
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
      {hasNextPage && (
        <PaginationButton onClick={handleNextClick}>
          {NEXT_BUTTON_TEXT}
        </PaginationButton>
      )}
    </footer>
  );
}
