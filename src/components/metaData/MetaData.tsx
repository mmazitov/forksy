import { Link, Meta, Title } from 'react-head';

interface MetaDataProps {
	title: string;
	description: string;
	image?: string;
	url?: string;
	type?: 'website' | 'article' | 'product';
	author?: string;
	keywords?: string[];
}

const truncateDescription = (text: string, maxLength: number = 160): string => {
	if (!text) return '';
	if (text.length <= maxLength) return text;
	return text.substring(0, maxLength - 3).trim() + '...';
};

export const MetaData = ({
	title,
	description,
	image = 'https://forksy.com/og-image.jpg',
	url = typeof window !== 'undefined' ? window.location.href : '',
	type = 'website',
	author,
	keywords = [],
}: MetaDataProps) => {
	const siteTitle = 'Forksy';
	const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
	const truncatedDescription = truncateDescription(description);

	return (
		<>
			{/* Basic Meta Tags */}
			<Title>{fullTitle}</Title>
			<Meta name="description" content={truncatedDescription} />
			<Meta name="keywords" content={keywords.join(', ')} />
			{author && <Meta name="author" content={author} />}
			<Meta name="viewport" content="width=device-width, initial-scale=1" />

			{/* Open Graph Tags */}
			<Meta property="og:title" content={fullTitle} />
			<Meta property="og:description" content={truncatedDescription} />
			<Meta property="og:type" content={type} />
			<Meta property="og:url" content={url} />
			<Meta property="og:image" content={image} />
			<Meta property="og:site_name" content="Forksy" />

			{/* Twitter Card Tags */}
			<Meta name="twitter:card" content="summary_large_image" />
			<Meta name="twitter:title" content={fullTitle} />
			<Meta name="twitter:description" content={truncatedDescription} />
			<Meta name="twitter:image" content={image} />

			{/* Canonical URL */}
			<Link rel="canonical" href={url} />

			{/* Additional SEO Meta Tags */}
			<Meta name="robots" content="index, follow" />
			<Meta name="language" content="Ukrainian" />
			<Meta httpEquiv="X-UA-Compatible" content="IE=edge" />
		</>
	);
};

export default MetaData;
