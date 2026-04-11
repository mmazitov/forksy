import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import FavoriteButton from '../FavoriteButton';

describe('FavoriteButton', () => {
	it('should render favorite button', () => {
		render(<FavoriteButton isFavorite={false} onClick={vi.fn()} />);

		const button = screen.getByRole('button');
		expect(button).toBeInTheDocument();
	});

	it('should show filled heart when isFavorite is true', () => {
		render(<FavoriteButton isFavorite={true} onClick={vi.fn()} />);

		const button = screen.getByRole('button');
		const svg = button.querySelector('svg');
		expect(svg).toHaveClass('fill-current');
	});

	it('should show outlined heart when isFavorite is false', () => {
		render(<FavoriteButton isFavorite={false} onClick={vi.fn()} />);

		const button = screen.getByRole('button');
		const svg = button.querySelector('svg');
		expect(svg).not.toHaveClass('fill-current');
	});

	it('should call onClick when clicked', async () => {
		const user = userEvent.setup();
		const handleClick = vi.fn();

		render(<FavoriteButton isFavorite={false} onClick={handleClick} />);

		const button = screen.getByRole('button');
		await user.click(button);

		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('should prevent event propagation', async () => {
		const user = userEvent.setup();
		const handleClick = vi.fn();
		const handleParentClick = vi.fn();

		render(
			<div onClick={handleParentClick}>
				<FavoriteButton isFavorite={false} onClick={handleClick} />
			</div>,
		);

		const button = screen.getByRole('button');
		await user.click(button);

		expect(handleClick).toHaveBeenCalledTimes(1);
		expect(handleParentClick).not.toHaveBeenCalled();
	});

	it('should apply custom className', () => {
		render(
			<FavoriteButton
				isFavorite={false}
				onClick={vi.fn()}
				className="custom-class"
			/>,
		);

		const button = screen.getByRole('button');
		expect(button).toHaveClass('custom-class');
	});

	it('should apply red color when isFavorite is true', () => {
		render(<FavoriteButton isFavorite={true} onClick={vi.fn()} />);

		const button = screen.getByRole('button');
		expect(button).toHaveClass('text-red-500');
	});

	it('should not apply red color when isFavorite is false', () => {
		render(<FavoriteButton isFavorite={false} onClick={vi.fn()} />);

		const button = screen.getByRole('button');
		expect(button).not.toHaveClass('text-red-500');
	});
});
