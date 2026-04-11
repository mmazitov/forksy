import { renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useAuthState } from '../useAuthState';

const mockUser = {
	id: '1',
	email: 'test@example.com',
	name: 'Test User',
	role: 'USER' as const,
};

const mockAdminUser = {
	...mockUser,
	role: 'ADMIN' as const,
};

describe('useAuthState', () => {
	beforeEach(() => {
		global.fetch = vi.fn();
		window.localStorage.clear();
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('should initialize with no user and loading state', () => {
		const { result } = renderHook(() => useAuthState());

		expect(result.current.user).toBeNull();
		expect(result.current.isAuthenticated).toBe(false);
		expect(result.current.isAdmin).toBe(false);
	});

	it('should set user on login', async () => {
		const { result } = renderHook(() => useAuthState());

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});

		result.current.login(mockUser);

		await waitFor(() => {
			expect(result.current.user).toEqual(mockUser);
			expect(result.current.isAuthenticated).toBe(true);
			expect(result.current.isAdmin).toBe(false);
		});

		const stored = window.localStorage.getItem('user');
		expect(stored).toBe(JSON.stringify(mockUser));
	});

	it('should identify admin users correctly', async () => {
		const { result } = renderHook(() => useAuthState());

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});

		result.current.login(mockAdminUser);

		await waitFor(() => {
			expect(result.current.isAdmin).toBe(true);
		});
	});

	it('should clear user on logout', async () => {
		(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
			ok: true,
		});

		const { result } = renderHook(() => useAuthState());

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});

		result.current.login(mockUser);

		await waitFor(() => {
			expect(result.current.user).toEqual(mockUser);
		});

		result.current.logout();

		await waitFor(() => {
			expect(result.current.user).toBeNull();
			expect(result.current.isAuthenticated).toBe(false);
		});

		expect(window.localStorage.getItem('user')).toBeNull();
	});

	it('should attempt refresh on mount if user in localStorage', async () => {
		window.localStorage.setItem('user', JSON.stringify(mockUser));

		(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
			ok: true,
		});

		const { result } = renderHook(() => useAuthState());

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});

		expect(global.fetch).toHaveBeenCalledWith(
			expect.stringContaining('/auth/refresh'),
			expect.objectContaining({
				method: 'POST',
				credentials: 'include',
			}),
		);

		await waitFor(() => {
			expect(result.current.user).toEqual(mockUser);
		});
	});

	it('should logout if refresh fails', async () => {
		window.localStorage.setItem('user', JSON.stringify(mockUser));

		(global.fetch as ReturnType<typeof vi.fn>)
			.mockResolvedValueOnce({
				ok: false,
			})
			.mockResolvedValueOnce({
				ok: true,
			});

		const { result } = renderHook(() => useAuthState());

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});

		expect(result.current.user).toBeNull();
		expect(window.localStorage.getItem('user')).toBeNull();
	});

	it('should handle refresh network errors', async () => {
		window.localStorage.setItem('user', JSON.stringify(mockUser));

		(global.fetch as ReturnType<typeof vi.fn>)
			.mockRejectedValueOnce(new Error('Network error'))
			.mockResolvedValueOnce({
				ok: true,
			});

		const { result } = renderHook(() => useAuthState());

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});

		expect(result.current.user).toBeNull();
		expect(window.localStorage.getItem('user')).toBeNull();
	});

	it('should handle corrupted localStorage data', async () => {
		window.localStorage.setItem('user', 'invalid-json');

		(global.fetch as ReturnType<typeof vi.fn>)
			.mockResolvedValueOnce({
				ok: true,
			})
			.mockResolvedValueOnce({
				ok: true,
			});

		const { result } = renderHook(() => useAuthState());

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});

		expect(result.current.user).toBeNull();
	});
});
