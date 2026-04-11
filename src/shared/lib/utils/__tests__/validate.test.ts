import { describe, expect, it } from 'vitest';

import { formatPhone, normalizePhone, phoneValidate } from '../validate';

describe('phoneValidate', () => {
	it('should validate correct Ukrainian phone numbers', () => {
		expect(phoneValidate('+380501234567')).toBe(true);
		expect(phoneValidate('380501234567')).toBe(true);
		expect(phoneValidate('0501234567')).toBe(true);
	});

	it('should reject invalid phone numbers', () => {
		expect(phoneValidate('')).toBe(false);
		expect(phoneValidate('123')).toBe(false);
		expect(phoneValidate('+1234567890')).toBe(false);
		expect(phoneValidate('050123456')).toBe(false);
		expect(phoneValidate('05012345678')).toBe(false);
	});

	it('should handle phone numbers with formatting', () => {
		expect(phoneValidate('+380 (50) 123-45-67')).toBe(true);
		expect(phoneValidate('380 50 123 45 67')).toBe(true);
		expect(phoneValidate('050-123-45-67')).toBe(true);
	});

	it('should handle different operator codes', () => {
		expect(phoneValidate('0501234567')).toBe(true);
		expect(phoneValidate('0671234567')).toBe(true);
		expect(phoneValidate('0931234567')).toBe(true);
		expect(phoneValidate('0441234567')).toBe(true);
	});
});

describe('formatPhone', () => {
	it('should format complete phone numbers', () => {
		expect(formatPhone('380501234567')).toBe('+380 (50) 123-45-67');
		expect(formatPhone('0501234567')).toBe('+380 (50) 123-45-67');
		expect(formatPhone('+380501234567')).toBe('+380 (50) 123-45-67');
	});

	it('should format partial phone numbers', () => {
		expect(formatPhone('38050')).toBe('+380 (50) ');
		expect(formatPhone('380501')).toBe('+380 (50) 1');
		expect(formatPhone('38050123')).toBe('+380 (50) 123-');
		expect(formatPhone('380501234')).toBe('+380 (50) 123-4');
		expect(formatPhone('3805012345')).toBe('+380 (50) 123-45-');
	});

	it('should handle empty input', () => {
		expect(formatPhone('')).toBe('');
	});

	it('should strip non-numeric characters', () => {
		expect(formatPhone('+380 (50) 123-45-67')).toBe('+380 (50) 123-45-67');
		expect(formatPhone('380-50-123-45-67')).toBe('+380 (50) 123-45-67');
	});

	it('should normalize 0-prefixed numbers', () => {
		expect(formatPhone('0501234567')).toBe('+380 (50) 123-45-67');
		expect(formatPhone('050')).toBe('+380 (50) ');
	});

	it('should add 380 prefix if missing', () => {
		expect(formatPhone('501234567')).toBe('+380 (50) 123-45-67');
	});
});

describe('normalizePhone', () => {
	it('should normalize phone numbers to 380 format', () => {
		expect(normalizePhone('+380501234567')).toBe('380501234567');
		expect(normalizePhone('380501234567')).toBe('380501234567');
		expect(normalizePhone('0501234567')).toBe('380501234567');
	});

	it('should handle formatted input', () => {
		expect(normalizePhone('+380 (50) 123-45-67')).toBe('380501234567');
		expect(normalizePhone('050-123-45-67')).toBe('380501234567');
	});

	it('should handle empty input', () => {
		expect(normalizePhone('')).toBe('');
	});

	it('should strip all non-numeric characters', () => {
		expect(normalizePhone('+380 (50) 123-45-67')).toBe('380501234567');
		expect(normalizePhone('abc380def50ghi123jkl45mno67')).toBe('380501234567');
	});

	it('should add 380 prefix if missing', () => {
		expect(normalizePhone('501234567')).toBe('380501234567');
	});

	it('should convert 0-prefixed to 380', () => {
		expect(normalizePhone('0501234567')).toBe('380501234567');
		expect(normalizePhone('0671234567')).toBe('380671234567');
	});
});
