import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { NavigationTabs } from './NavigationTabs';
import { NAVIGATION_TABS } from '@vidoso-fe-task/constants';
import { vi } from 'vitest';
import { SearchTab } from '@vidoso-fe-task/ui';

vi.mock('@vidoso-fe-task/ui', () => ({
  SearchTab: vi.fn(() => <div />),
}));

describe('NavigationTabs', () => {
  it('renders without crashing', () => {
    render(<NavigationTabs />);
  });

  it('renders the correct number of tabs', () => {
    const { container } = render(<NavigationTabs />);
    expect(container.querySelectorAll('div').length).toBe(
      NAVIGATION_TABS.length
    );
  });

  it('passes the correct tab prop to each SearchTab', () => {
    render(<NavigationTabs />);
    NAVIGATION_TABS.forEach((tab, index) => {
      expect(SearchTab).toHaveBeenNthCalledWith(index + 1, { tab }, {});
    });
  });

  it('renders no tabs if NAVIGATION_TABS is empty', () => {
    vi.mock('@vidoso-fe-task/constants', () => ({
      NAVIGATION_TABS: [],
    }));
    const { container } = render(<NavigationTabs />);
    expect(container.querySelectorAll('div').length).toBe(0);
  });
});
