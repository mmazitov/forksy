import { LuArrowBigLeft } from 'react-icons/lu';
import { Link } from 'react-router-dom';

import { Button } from '@/shared/components';

interface BackButtonProps {
	title: string;
	href: string;
	ctaButton?: boolean;
	ctaButtonText?: string;
	ctaButtonClick?: () => void;
	ctaButtonDisabled?: boolean;
}

const BackButton = ({
	title,
	href,
	ctaButton = false,
	ctaButtonText,
	ctaButtonClick,
	ctaButtonDisabled = false,
}: BackButtonProps) => {
	return (
		<div className="mb-6 flex items-center justify-between gap-2">
			<Link to={href}>
				<Button
					variant="ghost"
					className="gap-2"
					aria-label={`Назад до ${title}`}
				>
					<LuArrowBigLeft className="h-4 w-4" aria-hidden="true" />
					{title}
				</Button>
			</Link>
			{ctaButton && (
				<Button
					variant="outline"
					size="sm"
					onClick={ctaButtonClick}
					disabled={ctaButtonDisabled}
				>
					{ctaButtonText}
				</Button>
			)}
		</div>
	);
};

export default BackButton;
