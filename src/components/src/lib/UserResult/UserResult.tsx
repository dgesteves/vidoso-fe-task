import { clsx } from 'clsx';
import { SearchResult } from '@vidoso-fe-task/types';

type UserResultProps = {
  result: SearchResult;
  isLast: boolean;
};

export function UserResult({ result, isLast }: UserResultProps) {
  return (
    <div
      className={clsx(
        'flex gap-5 items-center w-full pb-4',
        !isLast && 'border-b-2 border-gray-200'
      )}
    >
      <span className="w-14 h-14 bg-secondary-400 rounded-full" />
      <h3 className="flex text-lg font-medium text-secondary-800">
        {result.name}
      </h3>
    </div>
  );
}
