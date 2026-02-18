export const createSlug = (text: string): string => {
	return encodeURIComponent(
		text
			.toLowerCase()
			.trim()
			.replace(/[\s_-]+/g, '-')
			.replace(/^-+|-+$/g, ''),
	);
};

export const fromSlug = (slug: string): string => {
	return decodeURIComponent(slug)
		.replace(/-/g, ' ')
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
};
