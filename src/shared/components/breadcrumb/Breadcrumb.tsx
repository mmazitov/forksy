import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { SchemaOrg } from '@/shared/components';
import {
	type BreadcrumbItem,
	generateBreadcrumbSchema,
} from '@/shared/lib/utils/schemaOrg';

interface BreadcrumbProps {
	items: BreadcrumbItem[];
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
	const schema = generateBreadcrumbSchema(items);

	return (
		<>
			<SchemaOrg schema={schema} />
			<nav aria-label="Breadcrumb" className="mb-4">
				<ol className="flex items-center gap-2 text-sm text-muted-foreground">
					{items.map((item, index) => (
						<li key={item.url} className="flex items-center gap-2">
							{index > 0 && <ChevronRight className="h-4 w-4" />}
							{index === items.length - 1 ? (
								<span className="font-medium text-foreground">{item.name}</span>
							) : (
								<Link
									to={item.url}
									className="hover:text-foreground transition-colors"
								>
									{item.name}
								</Link>
							)}
						</li>
					))}
				</ol>
			</nav>
		</>
	);
};
