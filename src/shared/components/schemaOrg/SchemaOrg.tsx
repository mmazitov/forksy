import { useEffect } from 'react';

interface SchemaOrgProps {
	schema: Record<string, unknown>;
}

export const SchemaOrg = ({ schema }: SchemaOrgProps) => {
	useEffect(() => {
		const script = document.createElement('script');
		script.type = 'application/ld+json';
		script.textContent = JSON.stringify(schema);
		script.setAttribute('data-schema-org', 'true');
		document.head.appendChild(script);

		return () => {
			const existingScript = document.head.querySelector(
				'script[data-schema-org="true"]',
			);
			if (existingScript) {
				document.head.removeChild(existingScript);
			}
		};
	}, [schema]);

	return null;
};
