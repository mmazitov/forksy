import { renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useFavorite } from '../useFavorite';

const mockCache = {
	identify: vi.fn(() => 'Product:1'),
	modify: vi.fn(),
};

describe('useFavorite', () => {
	const mockAddMutation = vi.fn();
	const mockRemoveMutation = vi.fn();
	const mockOnUpdate = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
		mockAddMutation.mockResolvedValue({ data: {} });
		mockRemoveMutation.mockResolvedValue({ data: {} });
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('should return current favorite state', () => {
		const { result } = renderHook(() =>
			useFavorite({
				entityType: 'Product',
				entityId: '1',
				isFavorite: true,
				addMutation: mockAddMutation,
				removeMutation: mockRemoveMutation,
			}),
		);

		expect(result.current.isFavorite).toBe(true);
	});

	it('should call addMutation when toggling from non-favorite', async () => {
		const { result } = renderHook(() =>
			useFavorite({
				entityType: 'Product',
				entityId: '1',
				isFavorite: false,
				addMutation: mockAddMutation,
				removeMutation: mockRemoveMutation,
			}),
		);

		await result.current.toggleFavorite();

		await waitFor(() => {
			expect(mockAddMutation).toHaveBeenCalledWith(
				expect.objectContaining({
					variables: { productId: '1' },
				}),
			);
			expect(mockRemoveMutation).not.toHaveBeenCalled();
		});
	});

	it('should call removeMutation when toggling from favorite', async () => {
		const { result } = renderHook(() =>
			useFavorite({
				entityType: 'Product',
				entityId: '1',
				isFavorite: true,
				addMutation: mockAddMutation,
				removeMutation: mockRemoveMutation,
			}),
		);

		await result.current.toggleFavorite();

		await waitFor(() => {
			expect(mockRemoveMutation).toHaveBeenCalledWith(
				expect.objectContaining({
					variables: { productId: '1' },
				}),
			);
			expect(mockAddMutation).not.toHaveBeenCalled();
		});
	});

	it('should use dishId for Dish entity type', async () => {
		const { result } = renderHook(() =>
			useFavorite({
				entityType: 'Dish',
				entityId: '2',
				isFavorite: false,
				addMutation: mockAddMutation,
				removeMutation: mockRemoveMutation,
			}),
		);

		await result.current.toggleFavorite();

		await waitFor(() => {
			expect(mockAddMutation).toHaveBeenCalledWith(
				expect.objectContaining({
					variables: { dishId: '2' },
				}),
			);
		});
	});

	it('should pass refetchQueries to mutation', async () => {
		const refetchQueries = [{ query: 'mockQuery' }];

		const { result } = renderHook(() =>
			useFavorite({
				entityType: 'Product',
				entityId: '1',
				isFavorite: false,
				addMutation: mockAddMutation,
				removeMutation: mockRemoveMutation,
				refetchQueries,
			}),
		);

		await result.current.toggleFavorite();

		await waitFor(() => {
			expect(mockAddMutation).toHaveBeenCalledWith(
				expect.objectContaining({
					refetchQueries,
				}),
			);
		});
	});

	it('should include optimistic response', async () => {
		const { result } = renderHook(() =>
			useFavorite({
				entityType: 'Product',
				entityId: '1',
				isFavorite: false,
				addMutation: mockAddMutation,
				removeMutation: mockRemoveMutation,
			}),
		);

		await result.current.toggleFavorite();

		await waitFor(() => {
			expect(mockAddMutation).toHaveBeenCalledWith(
				expect.objectContaining({
					optimisticResponse: expect.objectContaining({
						addToFavoritesProduct: expect.objectContaining({
							id: '1',
						}),
					}),
				}),
			);
		});
	});

	it('should call cache update function', async () => {
		const { result } = renderHook(() =>
			useFavorite({
				entityType: 'Product',
				entityId: '1',
				isFavorite: false,
				addMutation: mockAddMutation,
				removeMutation: mockRemoveMutation,
			}),
		);

		await result.current.toggleFavorite();

		await waitFor(() => {
			const updateFn = mockAddMutation.mock.calls[0][0].update;
			expect(updateFn).toBeDefined();

			updateFn(mockCache);
			expect(mockCache.modify).toHaveBeenCalled();
		});
	});

	it('should call onUpdate callback if provided', async () => {
		const { result } = renderHook(() =>
			useFavorite({
				entityType: 'Product',
				entityId: '1',
				isFavorite: false,
				addMutation: mockAddMutation,
				removeMutation: mockRemoveMutation,
				onUpdate: mockOnUpdate,
			}),
		);

		await result.current.toggleFavorite();

		await waitFor(() => {
			const updateFn = mockAddMutation.mock.calls[0][0].update;
			updateFn(mockCache);
			expect(mockOnUpdate).toHaveBeenCalledWith(mockCache);
		});
	});

	it('should handle mutation errors gracefully', async () => {
		const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
		mockAddMutation.mockRejectedValueOnce(new Error('Network error'));

		const { result } = renderHook(() =>
			useFavorite({
				entityType: 'Product',
				entityId: '1',
				isFavorite: false,
				addMutation: mockAddMutation,
				removeMutation: mockRemoveMutation,
			}),
		);

		await result.current.toggleFavorite();

		await waitFor(() => {
			expect(mockAddMutation).toHaveBeenCalled();
		});

		consoleErrorSpy.mockRestore();
	});
});
