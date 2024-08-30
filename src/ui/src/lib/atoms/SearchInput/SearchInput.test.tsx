import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchInput } from './SearchInput';
import { INPUT_PLACEHOLDER } from '@vidoso-fe-task/constants';
import { vi } from 'vitest';

describe('SearchInput', () => {
  it('renders the input with the correct placeholder', () => {
    const handleChange = vi.fn();
    render(<SearchInput value="" onChange={handleChange} />);
    expect(screen.getByPlaceholderText(INPUT_PLACEHOLDER)).toBeInTheDocument();
  });

  it('calls onChange when the input value changes', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<SearchInput value="" onChange={handleChange} />);
    const input = screen.getByPlaceholderText(INPUT_PLACEHOLDER);
    await user.type(input, 'test');
    expect(handleChange).toHaveBeenCalledTimes(4);
  });

  it('displays the correct value in the input', () => {
    const handleChange = vi.fn();
    render(<SearchInput value="initial value" onChange={handleChange} />);
    expect(screen.getByDisplayValue('initial value')).toBeInTheDocument();
  });

  it('does not call onChange when the input is disabled', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<SearchInput value="" onChange={handleChange} />);
    const input = screen.getByPlaceholderText(INPUT_PLACEHOLDER);
    input.setAttribute('disabled', 'true');
    await user.type(input, 'test');
    expect(handleChange).not.toHaveBeenCalled();
  });
});
