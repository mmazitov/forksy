import { describe, expect, it } from 'vitest';

import { cn } from '../cn';

describe('cn', () => {
	it('should merge class names', () => {
		expect(cn('foo', 'bar')).toBe('foo bar');
	});

	it('should handle conditional classes', () => {
		const isActive = false;
		const isEnabled = true;
		expect(cn('foo', isActive && 'bar', 'baz')).toBe('foo baz');
		expect(cn('foo', isEnabled && 'bar', 'baz')).toBe('foo bar baz');
	});

	it('should handle objects', () => {
		expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz');
	});

	it('should handle arrays', () => {
		expect(cn(['foo', 'bar'], 'baz')).toBe('foo bar baz');
	});

	it('should merge Tailwind classes correctly', () => {
		expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
	});

	it('should handle empty inputs', () => {
		expect(cn()).toBe('');
		expect(cn('')).toBe('');
		expect(cn(undefined, null, false)).toBe('');
	});

	it('should handle complex Tailwind merging', () => {
		expect(cn('text-sm font-bold', 'text-lg')).toBe('font-bold text-lg');
		expect(cn('bg-red-500 hover:bg-blue-500', 'bg-green-500')).toBe(
			'hover:bg-blue-500 bg-green-500',
		);
	});

	it('should preserve responsive variants', () => {
		const result = cn('md:px-4', 'px-2');
		expect(result).toContain('md:px-4');
		expect(result).toContain('px-2');
	});

	it('should handle mixed inputs', () => {
		expect(
			cn('base-class', { active: true, disabled: false }, ['extra', 'classes']),
		).toBe('base-class active extra classes');
	});
});
