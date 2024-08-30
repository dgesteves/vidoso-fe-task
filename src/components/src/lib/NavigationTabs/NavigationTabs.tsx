import { SearchTab } from '@vidoso-fe-task/ui';
import { NAVIGATION_TABS } from '@vidoso-fe-task/constants';

export function NavigationTabs() {
  return (
    <nav className="flex w-full">
      {NAVIGATION_TABS.map((tab) => (
        <SearchTab key={tab} tab={tab} />
      ))}
    </nav>
  );
}
