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
	buttonMobileVisible?: boolean;
	secondaryButtonVisible?: boolean;
	secondaryButtonDisable?: boolean;
	secondaryButtonText?: string;
	secondaryButtonType?: 'button' | 'link';
	secondaryButtonIcon?: React.ReactNode;
	secondaryButtonOnClick?: () => void;
	secondaryButtonHref?: string;
	secondaryButtonMobileVisible?: boolean;
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
	buttonMobileVisible = true,
	secondaryButtonVisible = false,
	secondaryButtonText,
	secondaryButtonType = 'button',
	secondaryButtonIcon,
	secondaryButtonOnClick,
	secondaryButtonHref,
	secondaryButtonDisable = false,
	secondaryButtonMobileVisible = true,
}: PageTitleProps) => {
	const { user } = useAuthContext();
	const loggedIn = isLoggedIn !== undefined ? isLoggedIn : !!user;

	return (
		<div className="mb-8">
			<div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:justify-between md:gap-0">
				<div>
					<h1 className="text-foreground mb-2 text-4xl leading-tight font-bold">
						{title}
					</h1>
					<p className="text-muted-foreground text-base leading-relaxed">
						{subtitle}
					</p>
				</div>

				{loggedIn && (
					<div className="flex flex-row items-stretch gap-2">
						<ActionButton
							type={buttonType}
							text={buttonText}
							icon={buttonIcon}
							onClick={onClick}
							href={href}
							disabled={buttonDisable}
							visible={buttonVisible}
							mobileVisible={buttonMobileVisible}
						/>

						<ActionButton
							type={secondaryButtonType}
							text={secondaryButtonText}
							icon={secondaryButtonIcon}
							onClick={secondaryButtonOnClick}
							href={secondaryButtonHref}
							disabled={secondaryButtonDisable}
							visible={secondaryButtonVisible}
							mobileVisible={secondaryButtonMobileVisible}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default PageTitle;
