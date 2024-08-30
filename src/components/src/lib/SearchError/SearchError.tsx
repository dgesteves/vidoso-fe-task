import { SEARCH_ERROR } from '@vidoso-fe-task/constants';

type SearchErrorProps = {
  error: unknown;
};

export function SearchError({ error }: SearchErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <span className="text-2xl font-medium text-red-500">{SEARCH_ERROR}</span>
      <pre className="text-lg font-normal text-red-500 whitespace-pre-wrap">
        {(error as Error).message}
      </pre>
    </div>
  );
}
