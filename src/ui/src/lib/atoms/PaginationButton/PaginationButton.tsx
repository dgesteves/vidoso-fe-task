import { ReactNode, ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';

type PaginationButtonProps = {
  onClick: () => void;
  children: ReactNode;
  isSelected?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function PaginationButton({
  onClick,
  children,
  isSelected,
  ...props
}: PaginationButtonProps) {
  return (
    <button
      className={clsx(
        'flex flex-1 justify-center items-center py-2 px-2 text-base text-white focus:outline-none',
        isSelected
          ? 'bg-primary-600'
          : 'bg-primary-400 hover:bg-primary-500 active:bg-primary-700'
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
