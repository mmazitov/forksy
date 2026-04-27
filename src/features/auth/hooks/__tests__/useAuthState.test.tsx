/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useAuthState } from '../useAuthState';

import * as graphql from '@/shared/api/graphql';
import * as apollo from '@/shared/api/apollo';

const mockUser = {
	__typename: 'User' as const,
	id: '1',
	email: 'test@example.com',
	name: 'Test User',
	role: 'USER' as const,
	avatar: null,
	phone: null,
	diet: null,
	allergy: null,
	dislike: null,
	createdAt: '2024-01-01',
	updatedAt: '2024-01-01',
	dishesCount: 0,
	productsCount: 0,
	favoriteProducts: [],
	favoriteDishes: [],
};

const mockAdminUser = {
	...mockUser,
	role: 'ADMIN' as const,
};

describe('useAuthState', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('should initialize with no user when me query returns null', async () => {
		vi.spyOn(graphql, 'useMeQuery').mockReturnValue({
			data: { me: null },
			loading: false,
			refetch: vi.fn(),
		} as any);

		vi.spyOn(graphql, 'useLogoutMutation').mockReturnValue([vi.fn()] as any);

		const { result } = renderHook(() => useAuthState());

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});

		expect(result.current.user).toBeNull();
		expect(result.current.isAuthenticated).toBe(false);
		expect(result.current.isAdmin).toBe(false);
	});

	it('should load user from me query', async () => {
		vi.spyOn(graphql, 'useMeQuery').mockReturnValue({
			data: { me: mockUser },
			loading: false,
			refetch: vi.fn(),
		} as any);

		vi.spyOn(graphql, 'useLogoutMutation').mockReturnValue([vi.fn()] as any);

		const { result } = renderHook(() => useAuthState());

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});

		expect(result.current.user).toEqual(mockUser);
		expect(result.current.isAuthenticated).toBe(true);
		expect(result.current.isAdmin).toBe(false);
	});

	it('should identify admin users correctly', async () => {
		vi.spyOn(graphql, 'useMeQuery').mockReturnValue({
			data: { me: mockAdminUser },
			loading: false,
			refetch: vi.fn(),
		} as any);

		vi.spyOn(graphql, 'useLogoutMutation').mockReturnValue([vi.fn()] as any);

		const { result } = renderHook(() => useAuthState());

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});

		expect(result.current.isAdmin).toBe(true);
	});

	it('should call logout mutation and clear cache', async () => {
		const mockLogout = vi.fn().mockResolvedValue({});
		const mockResetStore = vi.fn().mockResolvedValue(undefined);

		vi.spyOn(graphql, 'useMeQuery').mockReturnValue({
			data: { me: mockUser },
			loading: false,
			refetch: vi.fn(),
		} as any);

		vi.spyOn(graphql, 'useLogoutMutation').mockReturnValue([mockLogout] as any);
		vi.spyOn(apollo.client, 'resetStore').mockImplementation(mockResetStore);

		const { result } = renderHook(() => useAuthState());

		await waitFor(() => {
			expect(result.current.user).toEqual(mockUser);
		});

		await result.current.logout();

		expect(mockLogout).toHaveBeenCalled();
		expect(mockResetStore).toHaveBeenCalled();
	});

	it('should refetch user on login', async () => {
		const mockRefetch = vi.fn().mockResolvedValue({ data: { me: mockUser } });

		vi.spyOn(graphql, 'useMeQuery').mockReturnValue({
			data: { me: null },
			loading: false,
			refetch: mockRefetch,
		} as any);

		vi.spyOn(graphql, 'useLogoutMutation').mockReturnValue([vi.fn()] as any);

		const { result } = renderHook(() => useAuthState());

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});

		expect(result.current.user).toBeNull();

		await result.current.login();

		expect(mockRefetch).toHaveBeenCalled();
	});

	it('should handle logout errors gracefully', async () => {
		const mockLogout = vi.fn().mockRejectedValue(new Error('Logout failed'));
		const mockResetStore = vi.fn().mockResolvedValue(undefined);

		vi.spyOn(graphql, 'useMeQuery').mockReturnValue({
			data: { me: mockUser },
			loading: false,
			refetch: vi.fn(),
		} as any);

		vi.spyOn(graphql, 'useLogoutMutation').mockReturnValue([mockLogout] as any);
		vi.spyOn(apollo.client, 'resetStore').mockImplementation(mockResetStore);

		const { result } = renderHook(() => useAuthState());

		await waitFor(() => {
			expect(result.current.user).toEqual(mockUser);
		});

		await result.current.logout();

		expect(mockResetStore).toHaveBeenCalled();
	});

	it('should handle me query errors', async () => {
		vi.spyOn(graphql, 'useMeQuery').mockReturnValue({
			data: undefined,
			loading: false,
			refetch: vi.fn(),
			error: new Error('Network error'),
		} as any);

		vi.spyOn(graphql, 'useLogoutMutation').mockReturnValue([vi.fn()] as any);

		const { result } = renderHook(() => useAuthState());

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});

		expect(result.current.user).toBeNull();
	});
});
