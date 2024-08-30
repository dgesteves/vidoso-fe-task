import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { SearchIcon } from './SearchIcon';
import {
  DEFAULT_ICON_COLOR,
  DEFAULT_ICON_SIZE,
  DEFAULT_ICON_STROKE_WIDTH,
} from '@vidoso-fe-task/constants';

it('renders with default props', () => {
  const { container } = render(<SearchIcon />);
  const svg = container.querySelector('svg');
  expect(svg).toHaveAttribute('width', DEFAULT_ICON_SIZE.toString());
  expect(svg).toHaveAttribute('height', DEFAULT_ICON_SIZE.toString());
  expect(svg).toHaveAttribute('stroke', DEFAULT_ICON_COLOR);
  expect(svg).toHaveAttribute(
    'stroke-width',
    DEFAULT_ICON_STROKE_WIDTH.toString()
  );
});

it('renders with custom size', () => {
  const customSize = 32;
  const { container } = render(<SearchIcon size={customSize} />);
  const svg = container.querySelector('svg');
  expect(svg).toHaveAttribute('width', customSize.toString());
  expect(svg).toHaveAttribute('height', customSize.toString());
});

it('renders with custom color', () => {
  const customColor = '#ff0000';
  const { container } = render(<SearchIcon color={customColor} />);
  const svg = container.querySelector('svg');
  expect(svg).toHaveAttribute('stroke', customColor);
});

it('renders with custom stroke width', () => {
  const customStrokeWidth = 2;
  const { container } = render(<SearchIcon strokeWidth={customStrokeWidth} />);
  const svg = container.querySelector('svg');
  expect(svg).toHaveAttribute('stroke-width', customStrokeWidth.toString());
});
