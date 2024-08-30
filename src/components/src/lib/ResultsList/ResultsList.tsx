import { SearchResult } from '@vidoso-fe-task/types';
import { clsx } from 'clsx';
import { POSTS_ROUTE, USERS_ROUTE } from '@vidoso-fe-task/constants';
import { UserResult } from '../UserResult/UserResult';
import { PostResult } from '../PostResult/PostResult';

type ResultsListProps = {
  results: SearchResult[];
  endpoint: string;
  hasMorePages: boolean;
};

export function ResultsList({
  results,
  endpoint,
  hasMorePages,
}: ResultsListProps) {
  return (
    <ul
      className={clsx(
        'flex flex-col w-full justify-evenly overflow-y-auto pt-3',
        hasMorePages ? 'h-[calc(100vh-168px)]' : 'h-[calc(100vh-128px)]'
      )}
    >
      {results.map((result, index) => (
        <li className="flex w-full px-6 py-2" key={result.id}>
          {endpoint === USERS_ROUTE && (
            <UserResult result={result} isLast={index === results.length - 1} />
          )}
          {endpoint === POSTS_ROUTE && (
            <PostResult result={result} isLast={index === results.length - 1} />
          )}
        </li>
      ))}
    </ul>
  );
}
