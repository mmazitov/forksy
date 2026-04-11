import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Button } from '../button';

describe('Button', () => {
	it('should render button with text', () => {
		render(<Button>Click me</Button>);
		expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
	});

	it('should handle click events', async () => {
		const handleClick = vi.fn();
		const user = userEvent.setup();

		render(<Button onClick={handleClick}>Click me</Button>);

		await user.click(screen.getByRole('button'));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('should apply default variant styles', () => {
		render(<Button>Default</Button>);
		const button = screen.getByRole('button');

		expect(button).toHaveClass('bg-primary');
		expect(button).toHaveClass('text-primary-foreground');
	});

	it('should apply destructive variant styles', () => {
		render(<Button variant="destructive">Delete</Button>);
		const button = screen.getByRole('button');

		expect(button).toHaveClass('bg-destructive');
		expect(button).toHaveClass('text-destructive-foreground');
	});

	it('should apply outline variant styles', () => {
		render(<Button variant="outline">Outline</Button>);
		const button = screen.getByRole('button');

		expect(button).toHaveClass('border');
		expect(button).toHaveClass('bg-card');
	});

	it('should apply secondary variant styles', () => {
		render(<Button variant="secondary">Secondary</Button>);
		const button = screen.getByRole('button');

		expect(button).toHaveClass('bg-secondary');
		expect(button).toHaveClass('text-secondary-foreground');
	});

	it('should apply ghost variant styles', () => {
		render(<Button variant="ghost">Ghost</Button>);
		const button = screen.getByRole('button');

		expect(button).toHaveClass('hover:bg-muted');
	});

	it('should apply link variant styles', () => {
		render(<Button variant="link">Link</Button>);
		const button = screen.getByRole('button');

		expect(button).toHaveClass('text-primary');
		expect(button).toHaveClass('underline-offset-4');
	});

	it('should apply default size styles', () => {
		render(<Button>Default Size</Button>);
		const button = screen.getByRole('button');

		expect(button).toHaveClass('h-10');
		expect(button).toHaveClass('px-4');
	});

	it('should apply small size styles', () => {
		render(<Button size="sm">Small</Button>);
		const button = screen.getByRole('button');

		expect(button).toHaveClass('h-9');
		expect(button).toHaveClass('px-3');
	});

	it('should apply large size styles', () => {
		render(<Button size="lg">Large</Button>);
		const button = screen.getByRole('button');

		expect(button).toHaveClass('h-12');
		expect(button).toHaveClass('px-8');
	});

	it('should apply icon size styles', () => {
		render(<Button size="icon">Icon</Button>);
		const button = screen.getByRole('button');

		expect(button).toHaveClass('h-10');
		expect(button).toHaveClass('w-10');
	});

	it('should merge custom className', () => {
		render(<Button className="custom-class">Custom</Button>);
		const button = screen.getByRole('button');

		expect(button).toHaveClass('custom-class');
		expect(button).toHaveClass('bg-primary');
	});

	it('should be disabled when disabled prop is true', () => {
		render(<Button disabled>Disabled</Button>);
		const button = screen.getByRole('button');

		expect(button).toBeDisabled();
		expect(button).toHaveClass('disabled:pointer-events-none');
		expect(button).toHaveClass('disabled:opacity-50');
	});

	it('should not trigger onClick when disabled', async () => {
		const handleClick = vi.fn();
		const user = userEvent.setup();

		render(
			<Button disabled onClick={handleClick}>
				Disabled
			</Button>,
		);

		await user.click(screen.getByRole('button'));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it('should support asChild prop with Slot', () => {
		render(
			<Button asChild>
				<a href="/test">Link Button</a>
			</Button>,
		);

		const link = screen.getByRole('link', { name: 'Link Button' });
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute('href', '/test');
	});

	it('should forward ref', () => {
		const ref = vi.fn();
		render(<Button ref={ref}>Ref Button</Button>);

		expect(ref).toHaveBeenCalled();
		expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLButtonElement);
	});

	it('should pass through HTML button attributes', () => {
		render(
			<Button type="submit" name="submit-btn" value="submit">
				Submit
			</Button>,
		);

		const button = screen.getByRole('button');
		expect(button).toHaveAttribute('type', 'submit');
		expect(button).toHaveAttribute('name', 'submit-btn');
		expect(button).toHaveAttribute('value', 'submit');
	});

	it('should combine variant and size styles', () => {
		render(
			<Button variant="outline" size="lg">
				Outline Large
			</Button>,
		);

		const button = screen.getByRole('button');
		expect(button).toHaveClass('border');
		expect(button).toHaveClass('h-12');
		expect(button).toHaveClass('px-8');
	});

	it('should have focus-visible styles', () => {
		render(<Button>Focus</Button>);
		const button = screen.getByRole('button');

		expect(button).toHaveClass('focus-visible:outline-none');
		expect(button).toHaveClass('focus-visible:ring-2');
	});

	it('should have transition styles', () => {
		render(<Button>Transition</Button>);
		const button = screen.getByRole('button');

		expect(button).toHaveClass('transition-all');
		expect(button).toHaveClass('duration-300');
	});

	it('should render children correctly', () => {
		render(
			<Button>
				<span>Icon</span>
				<span>Text</span>
			</Button>,
		);

		expect(screen.getByText('Icon')).toBeInTheDocument();
		expect(screen.getByText('Text')).toBeInTheDocument();
	});
});
