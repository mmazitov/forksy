import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import SearchComponent from '../SearchComponent';

describe('SearchComponent', () => {
	it('should render search input with default placeholder', () => {
		render(<SearchComponent searchQuery="" onSearchChange={vi.fn()} />);

		const input = screen.getByPlaceholderText('Пошук...');
		expect(input).toBeInTheDocument();
	});

	it('should render search input with custom placeholder', () => {
		render(
			<SearchComponent
				searchQuery=""
				onSearchChange={vi.fn()}
				searchPlaceholder="Знайти продукт..."
			/>,
		);

		const input = screen.getByPlaceholderText('Знайти продукт...');
		expect(input).toBeInTheDocument();
	});

	it('should display current search query', () => {
		render(
			<SearchComponent searchQuery="test query" onSearchChange={vi.fn()} />,
		);

		const input = screen.getByDisplayValue('test query');
		expect(input).toBeInTheDocument();
	});

	it('should call onSearchChange when typing', async () => {
		const user = userEvent.setup();
		const handleChange = vi.fn();

		render(<SearchComponent searchQuery="" onSearchChange={handleChange} />);

		const input = screen.getByPlaceholderText('Пошук...');
		await user.type(input, 'test');

		expect(handleChange).toHaveBeenCalled();
		expect(handleChange).toHaveBeenCalledWith(expect.any(String));
	});

	it('should show clear button when searchQuery is not empty', () => {
		render(<SearchComponent searchQuery="test" onSearchChange={vi.fn()} />);

		const clearButton = screen.getByLabelText('Clear search');
		expect(clearButton).toBeInTheDocument();
	});

	it('should not show clear button when searchQuery is empty', () => {
		render(<SearchComponent searchQuery="" onSearchChange={vi.fn()} />);

		const clearButton = screen.queryByLabelText('Clear search');
		expect(clearButton).not.toBeInTheDocument();
	});

	it('should clear search query when clear button is clicked', async () => {
		const user = userEvent.setup();
		const handleChange = vi.fn();

		render(
			<SearchComponent
				searchQuery="test query"
				onSearchChange={handleChange}
			/>,
		);

		const clearButton = screen.getByLabelText('Clear search');
		await user.click(clearButton);

		expect(handleChange).toHaveBeenCalledWith('');
	});

	it('should render search icon', () => {
		const { container } = render(
			<SearchComponent searchQuery="" onSearchChange={vi.fn()} />,
		);

		const searchIcon = container.querySelector('svg');
		expect(searchIcon).toBeInTheDocument();
	});

	it('should have correct input styling', () => {
		render(<SearchComponent searchQuery="" onSearchChange={vi.fn()} />);

		const input = screen.getByPlaceholderText('Пошук...');
		expect(input).toHaveClass('pl-10');
	});
});
