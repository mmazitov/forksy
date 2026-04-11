import { renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useAuthState } from '../hooks/useAuthState';

const mockUser = {
	id: '1',
	email: 'test@example.com',
	name: 'Test User',
	role: 'USER' as const,
};

describe('Auth Flow Integration', () => {
	beforeEach(() => {
		global.fetch = vi.fn();
		window.localStorage.clear();
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('should complete full auth flow: login → refresh → logout', async () => {
		const { result } = renderHook(() => useAuthState());

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});

		expect(result.current.user).toBeNull();
		expect(result.current.isAuthenticated).toBe(false);

		result.current.login(mockUser);

		await waitFor(() => {
			expect(result.current.user).toEqual(mockUser);
			expect(result.current.isAuthenticated).toBe(true);
		});

		const storedUser = window.localStorage.getItem('user');
		expect(storedUser).toBe(JSON.stringify(mockUser));

		(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
			ok: true,
		});

		const { result: refreshResult } = renderHook(() => useAuthState());

		await waitFor(() => {
			expect(refreshResult.current.isLoading).toBe(false);
		});

		expect(global.fetch).toHaveBeenCalledWith(
			expect.stringContaining('/auth/refresh'),
			expect.objectContaining({
				method: 'POST',
				credentials: 'include',
			}),
		);

		await waitFor(() => {
			expect(refreshResult.current.user).toEqual(mockUser);
			expect(refreshResult.current.isAuthenticated).toBe(true);
		});

		(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
			ok: true,
		});

		refreshResult.current.logout();

		await waitFor(() => {
			expect(refreshResult.current.user).toBeNull();
			expect(refreshResult.current.isAuthenticated).toBe(false);
		});

		expect(window.localStorage.getItem('user')).toBeNull();

		expect(global.fetch).toHaveBeenCalledWith(
			expect.stringContaining('/graphql'),
			expect.objectContaining({
				method: 'POST',
				credentials: 'include',
				body: expect.stringContaining('logout'),
			}),
		);
	});

	it('should handle failed refresh and auto-logout', async () => {
		window.localStorage.setItem('user', JSON.stringify(mockUser));

		(global.fetch as ReturnType<typeof vi.fn>)
			.mockResolvedValueOnce({
				ok: false,
				status: 401,
			})
			.mockResolvedValueOnce({
				ok: true,
			});

		const { result } = renderHook(() => useAuthState());

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});

		expect(result.current.user).toBeNull();
		expect(result.current.isAuthenticated).toBe(false);
		expect(window.localStorage.getItem('user')).toBeNull();
	});

	it('should handle network errors during refresh', async () => {
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

	it('should persist user across page reloads with successful refresh', async () => {
		window.localStorage.setItem('user', JSON.stringify(mockUser));

		(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
			ok: true,
		});

		const { result: firstMount } = renderHook(() => useAuthState());

		await waitFor(() => {
			expect(firstMount.current.isLoading).toBe(false);
		});

		expect(firstMount.current.user).toEqual(mockUser);

		(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
			ok: true,
		});

		const { result: secondMount } = renderHook(() => useAuthState());

		await waitFor(() => {
			expect(secondMount.current.isLoading).toBe(false);
		});

		expect(secondMount.current.user).toEqual(mockUser);
		expect(secondMount.current.isAuthenticated).toBe(true);
	});

	it('should handle logout errors gracefully', async () => {
		const { result } = renderHook(() => useAuthState());

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});

		result.current.login(mockUser);

		await waitFor(() => {
			expect(result.current.user).toEqual(mockUser);
		});

		(global.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
			new Error('Logout failed'),
		);

		result.current.logout();

		await waitFor(() => {
			expect(result.current.user).toBeNull();
			expect(window.localStorage.getItem('user')).toBeNull();
		});
	});

	it('should handle concurrent login/logout operations', async () => {
		const { result } = renderHook(() => useAuthState());

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});

		result.current.login(mockUser);

		(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
			ok: true,
		});

		result.current.logout();

		await waitFor(() => {
			expect(result.current.user).toBeNull();
		});
	});
});
