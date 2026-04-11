import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import BackButton from '../BackButton';

const renderWithRouter = (component: React.ReactElement) => {
	return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('BackButton', () => {
	it('should render back button with title', () => {
		renderWithRouter(<BackButton title="Назад" href="/home" />);

		expect(screen.getByText('Назад')).toBeInTheDocument();
		expect(screen.getByRole('link')).toHaveAttribute('href', '/home');
	});

	it('should render CTA button when ctaButton is true', () => {
		renderWithRouter(
			<BackButton
				title="Назад"
				href="/home"
				ctaButton={true}
				ctaButtonText="Зберегти"
			/>,
		);

		expect(screen.getByText('Зберегти')).toBeInTheDocument();
	});

	it('should not render CTA button when ctaButton is false', () => {
		renderWithRouter(
			<BackButton
				title="Назад"
				href="/home"
				ctaButton={false}
				ctaButtonText="Зберегти"
			/>,
		);

		expect(screen.queryByText('Зберегти')).not.toBeInTheDocument();
	});

	it('should call ctaButtonClick when CTA button is clicked', async () => {
		const user = userEvent.setup();
		const handleClick = vi.fn();

		renderWithRouter(
			<BackButton
				title="Назад"
				href="/home"
				ctaButton={true}
				ctaButtonText="Зберегти"
				ctaButtonClick={handleClick}
			/>,
		);

		const ctaButton = screen.getByText('Зберегти');
		await user.click(ctaButton);

		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('should disable CTA button when ctaButtonDisabled is true', () => {
		renderWithRouter(
			<BackButton
				title="Назад"
				href="/home"
				ctaButton={true}
				ctaButtonText="Зберегти"
				ctaButtonDisabled={true}
			/>,
		);

		const ctaButton = screen.getByText('Зберегти');
		expect(ctaButton).toBeDisabled();
	});

	it('should enable CTA button by default', () => {
		renderWithRouter(
			<BackButton
				title="Назад"
				href="/home"
				ctaButton={true}
				ctaButtonText="Зберегти"
			/>,
		);

		const ctaButton = screen.getByText('Зберегти');
		expect(ctaButton).not.toBeDisabled();
	});

	it('should render back icon', () => {
		renderWithRouter(<BackButton title="Назад" href="/home" />);

		const link = screen.getByRole('link');
		const svg = link.querySelector('svg');
		expect(svg).toBeInTheDocument();
	});
});
