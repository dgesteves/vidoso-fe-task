import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { useRedirect } from './useRedirect';

function TestComponent({
  fromPath,
  toPath,
}: {
  fromPath: string;
  toPath: string;
}) {
  useRedirect(fromPath, toPath);
  return <div>Test Component</div>;
}

describe('useRedirect hook', () => {
  test("redirects from 'fromPath' to 'toPath'", () => {
    const fromPath = '/from';
    const toPath = '/to';

    const { container } = render(
      <MemoryRouter initialEntries={[fromPath]}>
        <Routes>
          <Route
            path={fromPath}
            element={<TestComponent fromPath={fromPath} toPath={toPath} />}
          />
          <Route path={toPath} element={<div>Redirected to {toPath}</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(container.innerHTML).toMatch('Redirected to /to');
  });

  test("does not redirect when not on 'fromPath'", () => {
    const fromPath = '/from';
    const toPath = '/to';
    const initialPath = '/another-path';

    const { container } = render(
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route
            path={fromPath}
            element={<TestComponent fromPath={fromPath} toPath={toPath} />}
          />
          <Route
            path={initialPath}
            element={<div>Initial Path {initialPath}</div>}
          />
          <Route path={toPath} element={<div>Redirected to {toPath}</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(container.innerHTML).toMatch('Initial Path /another-path');
  });
});
