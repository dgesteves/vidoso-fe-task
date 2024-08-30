import { PaginationButton } from '@vidoso-fe-task/ui';

type ButtonListProps = {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

export function ButtonList({
  totalPages,
  currentPage,
  setCurrentPage,
}: ButtonListProps) {
  return (
    <div className="flex items-center w-full">
      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;

        return (
          <PaginationButton
            key={page}
            isSelected={currentPage === page}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </PaginationButton>
        );
      })}
    </div>
  );
}
