interface SchemaOrgProps {
	schema: Record<string, unknown>;
}

export const SchemaOrg = ({ schema }: SchemaOrgProps) => {
	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
		/>
	);
};
