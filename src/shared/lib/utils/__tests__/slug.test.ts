import { describe, expect, it } from 'vitest';

import { createSlug, fromSlug } from '../slug';

describe('createSlug', () => {
	it('should convert text to lowercase', () => {
		expect(createSlug('Hello World')).toBe('hello-world');
		expect(createSlug('UPPERCASE')).toBe('uppercase');
	});

	it('should replace spaces with hyphens', () => {
		expect(createSlug('multiple word text')).toBe('multiple-word-text');
		expect(createSlug('a b c')).toBe('a-b-c');
	});

	it('should handle multiple consecutive spaces', () => {
		expect(createSlug('multiple   spaces')).toBe('multiple-spaces');
		expect(createSlug('a    b    c')).toBe('a-b-c');
	});

	it('should trim leading and trailing spaces', () => {
		expect(createSlug('  trimmed  ')).toBe('trimmed');
		expect(createSlug('   leading')).toBe('leading');
		expect(createSlug('trailing   ')).toBe('trailing');
	});

	it('should remove leading and trailing hyphens', () => {
		expect(createSlug('-hyphen-')).toBe('hyphen');
		expect(createSlug('---multiple---')).toBe('multiple');
	});

	it('should handle underscores', () => {
		expect(createSlug('with_underscores')).toBe('with-underscores');
		expect(createSlug('multiple___underscores')).toBe('multiple-underscores');
	});

	it('should handle existing hyphens', () => {
		expect(createSlug('already-hyphenated')).toBe('already-hyphenated');
		expect(createSlug('multiple---hyphens')).toBe('multiple-hyphens');
	});

	it('should encode special characters', () => {
		expect(createSlug('Борщ')).toBe('%D0%B1%D0%BE%D1%80%D1%89');
		expect(createSlug('Café')).toBe('caf%C3%A9');
	});

	it('should handle Cyrillic text', () => {
		const slug = createSlug('Український борщ');
		expect(slug).toBe(
			'%D1%83%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D1%81%D1%8C%D0%BA%D0%B8%D0%B9-%D0%B1%D0%BE%D1%80%D1%89',
		);
		expect(decodeURIComponent(slug)).toBe('український-борщ');
	});

	it('should handle mixed content', () => {
		expect(createSlug('Mix 123 Text')).toBe('mix-123-text');
		expect(createSlug('Test_with-mixed SEPARATORS')).toBe(
			'test-with-mixed-separators',
		);
	});

	it('should handle empty string', () => {
		expect(createSlug('')).toBe('');
	});

	it('should handle single word', () => {
		expect(createSlug('word')).toBe('word');
		expect(createSlug('WORD')).toBe('word');
	});
});

describe('fromSlug', () => {
	it('should decode URL-encoded text', () => {
		expect(fromSlug('%D0%B1%D0%BE%D1%80%D1%89')).toBe('Борщ');
		expect(fromSlug('caf%C3%A9')).toBe('Café');
	});

	it('should replace hyphens with spaces', () => {
		expect(fromSlug('hello-world')).toBe('Hello World');
		expect(fromSlug('multiple-word-text')).toBe('Multiple Word Text');
	});

	it('should capitalize first letter of each word', () => {
		expect(fromSlug('test')).toBe('Test');
		expect(fromSlug('test-text')).toBe('Test Text');
		expect(fromSlug('a-b-c')).toBe('A B C');
	});

	it('should handle Cyrillic slugs', () => {
		const slug =
			'%D1%83%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D1%81%D1%8C%D0%BA%D0%B8%D0%B9-%D0%B1%D0%BE%D1%80%D1%89';
		expect(fromSlug(slug)).toBe('Український Борщ');
	});

	it('should handle plain text without encoding', () => {
		expect(fromSlug('hello-world')).toBe('Hello World');
		expect(fromSlug('test-slug')).toBe('Test Slug');
	});

	it('should handle single word', () => {
		expect(fromSlug('word')).toBe('Word');
		expect(fromSlug('test')).toBe('Test');
	});

	it('should handle empty string', () => {
		expect(fromSlug('')).toBe('');
	});

	it('should be inverse of createSlug for simple text', () => {
		const original = 'Hello World Test';
		const slug = createSlug(original);
		const restored = fromSlug(slug);
		expect(restored.toLowerCase()).toBe(original.toLowerCase());
	});

	it('should handle mixed case in slug', () => {
		expect(fromSlug('mixed-case')).toBe('Mixed Case');
	});

	it('should handle numbers', () => {
		expect(fromSlug('test-123-text')).toBe('Test 123 Text');
		expect(fromSlug('123')).toBe('123');
	});
});

describe('createSlug and fromSlug roundtrip', () => {
	it('should maintain text content through roundtrip', () => {
		const texts = [
			'Simple Text',
			'Український Борщ',
			'Multiple Word Title',
			'Test 123',
			'Café Français',
		];

		texts.forEach((text) => {
			const slug = createSlug(text);
			const restored = fromSlug(slug);
			expect(restored.toLowerCase()).toBe(text.toLowerCase());
		});
	});
});
