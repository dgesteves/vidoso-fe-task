import { clsx } from 'clsx';
import { SearchResult } from '@vidoso-fe-task/types';

type PostResultProps = {
  result: SearchResult;
  isLast: boolean;
};

export function PostResult({ result, isLast }: PostResultProps) {
  return (
    <div
      className={clsx(
        'flex flex-col gap-3 w-full pb-4',
        !isLast && 'border-b-2 border-gray-200'
      )}
    >
      <h3 className="flex text-lg font-medium text-secondary-800 capitalize">
        {result.title}
      </h3>
      <p className="flex text-base font-normal text-secondary-700">
        {result.body}
      </p>
    </div>
  );
}
