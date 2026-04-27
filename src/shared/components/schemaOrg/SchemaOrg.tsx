import { useEffect, useRef } from 'react';

interface SchemaOrgProps {
	schema: Record<string, unknown>;
}

export const SchemaOrg = ({ schema }: SchemaOrgProps) => {
	const scriptRef = useRef<HTMLScriptElement | null>(null);

	useEffect(() => {
		const script = document.createElement('script');
		script.type = 'application/ld+json';
		script.text = JSON.stringify(schema);
		scriptRef.current = script;
		document.head.appendChild(script);

		return () => {
			scriptRef.current?.remove();
			scriptRef.current = null;
		};
	}, [schema]);

	return null;
};
