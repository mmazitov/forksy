import { renderHook, act, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useLocalStorage } from '../useLocalStorage';

describe('useLocalStorage', () => {
	beforeEach(() => {
		window.localStorage.clear();
		vi.clearAllMocks();
	});

	it('should initialize with default value when localStorage is empty', () => {
		const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

		expect(result.current[0]).toBe('default');
	});

	it('should initialize with stored value when available', () => {
		window.localStorage.setItem('test-key', JSON.stringify('stored'));

		const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

		expect(result.current[0]).toBe('stored');
	});

	it('should update localStorage when value changes', () => {
		const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

		act(() => {
			result.current[1]('updated');
		});

		expect(result.current[0]).toBe('updated');
		expect(window.localStorage.getItem('test-key')).toBe(
			JSON.stringify('updated'),
		);
	});

	it('should support functional updates', () => {
		const { result } = renderHook(() => useLocalStorage('counter', 0));

		act(() => {
			result.current[1]((prev) => prev + 1);
		});

		expect(result.current[0]).toBe(1);

		act(() => {
			result.current[1]((prev) => prev + 1);
		});

		expect(result.current[0]).toBe(2);
	});

	it('should handle complex objects', () => {
		const complexObject = {
			name: 'Test',
			nested: { value: 42 },
			array: [1, 2, 3],
		};

		const { result } = renderHook(() =>
			useLocalStorage('complex', complexObject),
		);

		expect(result.current[0]).toEqual(complexObject);

		const updated = { ...complexObject, name: 'Updated' };

		act(() => {
			result.current[1](updated);
		});

		expect(result.current[0]).toEqual(updated);
		expect(JSON.parse(window.localStorage.getItem('complex')!)).toEqual(
			updated,
		);
	});

	it('should remove value from localStorage', () => {
		const { result } = renderHook(() => useLocalStorage('test-key', 'value'));

		act(() => {
			result.current[1]('new-value');
		});

		expect(window.localStorage.getItem('test-key')).toBe(
			JSON.stringify('new-value'),
		);

		act(() => {
			result.current[2]();
		});

		expect(result.current[0]).toBe('value');
		expect(window.localStorage.getItem('test-key')).toBeNull();
	});

	it('should handle corrupted localStorage data', () => {
		const consoleWarnSpy = vi
			.spyOn(console, 'warn')
			.mockImplementation(() => {});

		window.localStorage.setItem('test-key', 'invalid-json');

		const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

		expect(result.current[0]).toBe('default');
		expect(consoleWarnSpy).toHaveBeenCalled();

		consoleWarnSpy.mockRestore();
	});

	it('should sync across storage events', async () => {
		const { result } = renderHook(() => useLocalStorage('sync-key', 'initial'));

		const newValue = 'synced-value';
		const storageEvent = new StorageEvent('storage', {
			key: 'sync-key',
			newValue: JSON.stringify(newValue),
			storageArea: window.localStorage,
		});

		act(() => {
			window.dispatchEvent(storageEvent);
		});

		await waitFor(() => {
			expect(result.current[0]).toBe(newValue);
		});
	});

	it('should ignore storage events for different keys', () => {
		const { result } = renderHook(() => useLocalStorage('key-a', 'value-a'));

		const storageEvent = new StorageEvent('storage', {
			key: 'key-b',
			newValue: JSON.stringify('value-b'),
			storageArea: window.localStorage,
		});

		act(() => {
			window.dispatchEvent(storageEvent);
		});

		expect(result.current[0]).toBe('value-a');
	});

	it('should work with different data types', () => {
		const { result: boolResult } = renderHook(() =>
			useLocalStorage('bool', false),
		);
		const { result: numberResult } = renderHook(() =>
			useLocalStorage('number', 42),
		);
		const { result: arrayResult } = renderHook(() =>
			useLocalStorage('array', [1, 2, 3]),
		);

		expect(boolResult.current[0]).toBe(false);
		expect(numberResult.current[0]).toBe(42);
		expect(arrayResult.current[0]).toEqual([1, 2, 3]);

		act(() => {
			boolResult.current[1](true);
			numberResult.current[1](100);
			arrayResult.current[1]([4, 5, 6]);
		});

		expect(boolResult.current[0]).toBe(true);
		expect(numberResult.current[0]).toBe(100);
		expect(arrayResult.current[0]).toEqual([4, 5, 6]);
	});
});
