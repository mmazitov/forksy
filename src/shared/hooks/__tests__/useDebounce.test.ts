import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useDebounce } from '../useDebounce';

describe('useDebounce', () => {
	it('should return initial value immediately', () => {
		const { result } = renderHook(() => useDebounce('initial', 500));
		expect(result.current).toBe('initial');
	});

	it('should debounce value changes', async () => {
		const { result, rerender } = renderHook(
			({ value, delay }) => useDebounce(value, delay),
			{
				initialProps: { value: 'initial', delay: 500 },
			},
		);

		expect(result.current).toBe('initial');

		rerender({ value: 'updated', delay: 500 });
		expect(result.current).toBe('initial');

		await waitFor(
			() => {
				expect(result.current).toBe('updated');
			},
			{ timeout: 600 },
		);
	});

	it('should handle multiple rapid changes', async () => {
		const { result, rerender } = renderHook(
			({ value }) => useDebounce(value, 300),
			{
				initialProps: { value: 'first' },
			},
		);

		rerender({ value: 'second' });
		rerender({ value: 'third' });
		rerender({ value: 'fourth' });

		expect(result.current).toBe('first');

		await waitFor(
			() => {
				expect(result.current).toBe('fourth');
			},
			{ timeout: 400 },
		);
	});

	it('should work with different data types', async () => {
		const { result, rerender } = renderHook(
			({ value }) => useDebounce(value, 200),
			{
				initialProps: { value: 0 },
			},
		);

		expect(result.current).toBe(0);

		rerender({ value: 42 });

		await waitFor(
			() => {
				expect(result.current).toBe(42);
			},
			{ timeout: 300 },
		);
	});

	it('should cleanup timeout on unmount', () => {
		const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');

		const { unmount } = renderHook(() => useDebounce('test', 500));

		unmount();

		expect(clearTimeoutSpy).toHaveBeenCalled();
		clearTimeoutSpy.mockRestore();
	});

	it('should use default delay from constants', async () => {
		const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
			initialProps: { value: 'initial' },
		});

		rerender({ value: 'updated' });

		await waitFor(
			() => {
				expect(result.current).toBe('updated');
			},
			{ timeout: 600 },
		);
	});
});
