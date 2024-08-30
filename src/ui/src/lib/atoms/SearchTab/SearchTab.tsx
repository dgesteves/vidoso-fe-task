import { NavLink } from 'react-router-dom';

type SearchTabProps = {
  tab: string;
};

export function SearchTab({ tab }: SearchTabProps) {
  return (
    <NavLink
      className={({ isActive }) =>
        `flex justify-center items-center flex-1 font-medium text-lg text-white py-3 focus:outline-none capitalize ${
          isActive
            ? 'bg-primary-600'
            : 'bg-primary-400 hover:bg-primary-500 active:bg-primary-700'
        }`
      }
      to={tab}
    >
      {tab}
    </NavLink>
  );
}
