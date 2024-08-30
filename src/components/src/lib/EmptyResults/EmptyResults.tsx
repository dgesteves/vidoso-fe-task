import { NO_RESULTS_FOUND } from '@vidoso-fe-task/constants';

type EmptyResultsProps = {
  searchQuery: string;
};

export function EmptyResults({ searchQuery }: EmptyResultsProps) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <p className="text-xl font-medium text-secondary-800">
        {NO_RESULTS_FOUND}
      </p>
      <span className={`text-lg font-normal text-primary-800`}>
        "{searchQuery}"
      </span>
    </div>
  );
}
