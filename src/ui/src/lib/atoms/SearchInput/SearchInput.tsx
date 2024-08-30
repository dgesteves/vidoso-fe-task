import { SearchIcon } from '../../icons/SearchIcon/SearchIcon';
import { ChangeEvent } from 'react';
import { INPUT_PLACEHOLDER } from '@vidoso-fe-task/constants';

type SearchInputProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="flex items-center w-full bg-white rounded-full px-3 py-2 gap-2 text-secondary-500 focus-within:text-secondary-800">
      <SearchIcon />
      <input
        type="text"
        placeholder={INPUT_PLACEHOLDER}
        value={value}
        onChange={onChange}
        className="w-full text-lg bg-white border-none placeholder:text-secondary-500 focus:outline-none"
      />
    </div>
  );
}
