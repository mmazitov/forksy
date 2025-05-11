import { ReactNode } from 'react';

interface PageHeaderProps {
	children?: ReactNode;
	className?: string;
	pageTitle?: string;
}

const PageHeader = ({ children, className, pageTitle }: PageHeaderProps) => {
	return (
		<header
			className={`flex justify-between items-center py-[var(--space)] ${className}`}
		>
			<h2 className="font-semibold text-xl">{pageTitle}</h2>
			{children}
		</header>
	);
};

export default PageHeader;
