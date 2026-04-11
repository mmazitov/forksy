import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { LuSearch } from 'react-icons/lu';

import { Input } from '../input';

describe('Input', () => {
	it('should render input element', () => {
		render(<Input placeholder="Enter text" />);
		expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
	});

	it('should handle text input', async () => {
		const user = userEvent.setup();
		render(<Input placeholder="Type here" />);

		const input = screen.getByPlaceholderText('Type here');
		await user.type(input, 'Hello World');

		expect(input).toHaveValue('Hello World');
	});

	it('should call onChange handler', async () => {
		const handleChange = vi.fn();
		const user = userEvent.setup();

		render(<Input onChange={handleChange} />);

		const input = screen.getByRole('textbox');
		await user.type(input, 'a');

		expect(handleChange).toHaveBeenCalled();
	});

	it('should apply custom className', () => {
		render(<Input className="custom-input" />);
		const input = screen.getByRole('textbox');

		expect(input).toHaveClass('custom-input');
	});

	it('should support different input types', () => {
		const { rerender } = render(<Input type="email" />);
		expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');

		rerender(<Input type="number" />);
		expect(screen.getByRole('spinbutton')).toHaveAttribute('type', 'number');

		rerender(<Input type="tel" />);
		expect(screen.getByRole('textbox')).toHaveAttribute('type', 'tel');
	});

	it('should be disabled when disabled prop is true', () => {
		render(<Input disabled />);
		const input = screen.getByRole('textbox');

		expect(input).toBeDisabled();
		expect(input).toHaveClass('disabled:cursor-not-allowed');
		expect(input).toHaveClass('disabled:opacity-50');
	});

	it('should forward ref', () => {
		const ref = vi.fn();
		render(<Input ref={ref} />);

		expect(ref).toHaveBeenCalled();
		expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLInputElement);
	});

	it('should show password toggle button when showToggle is true', () => {
		render(<Input type="password" showToggle />);

		const toggleButton = screen.getByRole('button');
		expect(toggleButton).toBeInTheDocument();
	});

	it('should toggle password visibility', async () => {
		const user = userEvent.setup();
		const { container } = render(<Input type="password" showToggle />);

		const input = container.querySelector('input');
		expect(input).toHaveAttribute('type', 'password');

		const toggleButton = screen.getByRole('button');
		await user.click(toggleButton);

		expect(input).toHaveAttribute('type', 'text');

		await user.click(toggleButton);
		expect(input).toHaveAttribute('type', 'password');
	});

	it('should display custom icon when showIcon is true', () => {
		render(<Input showIcon icon={<LuSearch data-testid="search-icon" />} />);

		expect(screen.getByTestId('search-icon')).toBeInTheDocument();
	});

	it('should position icon correctly', () => {
		render(<Input showIcon icon={<LuSearch data-testid="search-icon" />} />);

		const iconWrapper = screen.getByTestId('search-icon').parentElement;
		expect(iconWrapper).toHaveClass('absolute');
		expect(iconWrapper).toHaveClass('right-4');
	});

	it('should not show toggle button by default', () => {
		render(<Input type="password" />);

		expect(screen.queryByRole('button')).not.toBeInTheDocument();
	});

	it('should not show icon by default', () => {
		const { container } = render(<Input />);

		expect(container.querySelector('.absolute')).toBeNull();
	});

	it('should pass through HTML input attributes', () => {
		render(
			<Input
				name="username"
				id="user-input"
				maxLength={20}
				required
				autoComplete="username"
			/>,
		);

		const input = screen.getByRole('textbox');
		expect(input).toHaveAttribute('name', 'username');
		expect(input).toHaveAttribute('id', 'user-input');
		expect(input).toHaveAttribute('maxLength', '20');
		expect(input).toHaveAttribute('required');
		expect(input).toHaveAttribute('autoComplete', 'username');
	});

	it('should handle placeholder text', () => {
		render(<Input placeholder="Search..." />);
		expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
	});

	it('should have correct base styles', () => {
		render(<Input />);
		const input = screen.getByRole('textbox');

		expect(input).toHaveClass('border');
		expect(input).toHaveClass('rounded-md');
		expect(input).toHaveClass('px-3');
		expect(input).toHaveClass('py-2');
	});

	it('should have focus-visible styles', () => {
		render(<Input />);
		const input = screen.getByRole('textbox');

		expect(input).toHaveClass('focus-visible:outline-none');
		expect(input).toHaveClass('focus-visible:border-ring');
	});

	it('should have hover styles', () => {
		render(<Input />);
		const input = screen.getByRole('textbox');

		expect(input).toHaveClass('hover:border-ring');
	});

	it('should wrap input in relative container', () => {
		const { container } = render(<Input />);
		const wrapper = container.querySelector('.relative');

		expect(wrapper).toBeInTheDocument();
		expect(wrapper).toHaveClass('w-full');
	});

	it('should handle controlled input', async () => {
		const handleChange = vi.fn();
		const user = userEvent.setup();

		const { rerender } = render(<Input value="" onChange={handleChange} />);

		const input = screen.getByRole('textbox');
		expect(input).toHaveValue('');

		await user.type(input, 'test');
		expect(handleChange).toHaveBeenCalled();

		rerender(<Input value="test" onChange={handleChange} />);
		expect(input).toHaveValue('test');
	});

	it('should handle uncontrolled input', async () => {
		const user = userEvent.setup();
		render(<Input defaultValue="initial" />);

		const input = screen.getByRole('textbox');
		expect(input).toHaveValue('initial');

		await user.clear(input);
		await user.type(input, 'updated');
		expect(input).toHaveValue('updated');
	});

	it('should position toggle button correctly', () => {
		render(<Input type="password" showToggle />);

		const toggleButton = screen.getByRole('button');
		expect(toggleButton).toHaveClass('absolute');
		expect(toggleButton).toHaveClass('right-[10px]');
	});

	it('should not interfere with input when toggle button is clicked', async () => {
		const user = userEvent.setup();
		const { container } = render(<Input type="password" showToggle />);

		const input = container.querySelector('input') as HTMLInputElement;
		await user.type(input, 'password123');

		expect(input).toHaveValue('password123');

		const toggleButton = screen.getByRole('button');
		await user.click(toggleButton);

		expect(input).toHaveValue('password123');
	});
});
