import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

vi.mock('react-loader-spinner', () => ({
	Circles: vi.fn(() => null),
}));

afterEach(() => {
	cleanup();
});
