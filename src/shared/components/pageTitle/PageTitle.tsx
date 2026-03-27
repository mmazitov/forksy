import { ActionButton } from '../actionButton';

import { useAuthContext } from '@/features/auth';

interface PageTitleProps {
	title: string;
	subtitle?: string;
	buttonVisible?: boolean;
	buttonDisable?: boolean;
	buttonType?: 'button' | 'link';
	buttonText?: string;
	buttonIcon?: React.ReactNode;
	onClick?: () => void;
	href?: string;
	isLoggedIn?: boolean;
	secondaryButtonVisible?: boolean;
	secondaryButtonDisable?: boolean;
	secondaryButtonText?: string;
	secondaryButtonType?: 'button' | 'link';
	secondaryButtonIcon?: React.ReactNode;
	secondaryButtonOnClick?: () => void;
	secondaryButtonHref?: string;
}

const PageTitle = ({
	title,
	subtitle,
	buttonText,
	buttonIcon,
	onClick,
	href,
	buttonType = 'button',
	buttonVisible = true,
	buttonDisable = false,
	isLoggedIn,
	secondaryButtonVisible = false,
	secondaryButtonText,
	secondaryButtonType = 'button',
	secondaryButtonIcon,
	secondaryButtonOnClick,
	secondaryButtonHref,
	secondaryButtonDisable = false,
}: PageTitleProps) => {
	const { user } = useAuthContext();
	const loggedIn = isLoggedIn !== undefined ? isLoggedIn : !!user;

	return (
		<div className="mb-8">
			<div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:justify-between md:gap-0">
				<div>
					<h1 className="text-foreground mb-2 text-4xl font-bold">{title}</h1>
					<p className="text-muted-foreground">{subtitle}</p>
				</div>

				{loggedIn && (
					<div className="flex flex-col items-stretch gap-2">
						<ActionButton
							type={buttonType}
							text={buttonText}
							icon={buttonIcon}
							onClick={onClick}
							href={href}
							disabled={buttonDisable}
							visible={buttonVisible}
						/>

						<ActionButton
							type={secondaryButtonType}
							text={secondaryButtonText}
							icon={secondaryButtonIcon}
							onClick={secondaryButtonOnClick}
							href={secondaryButtonHref}
							disabled={secondaryButtonDisable}
							visible={secondaryButtonVisible}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default PageTitle;
