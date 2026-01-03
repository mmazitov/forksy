import { Button } from '@/components';
import { useAuthContext } from '@/hooks';
import { Link } from 'react-router-dom';

interface PageTitleProps {
	title: string;
	subtitle?: string;
	buttonVisible?: boolean;
	buttonType?: 'button' | 'link';
	buttonText?: string;
	buttonIcon?: React.ReactNode;
	onClick?: () => void;
	href?: string;
	isLoggedIn?: boolean;
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
	isLoggedIn,
}: PageTitleProps) => {
	const { user } = useAuthContext();
	const loggedIn = isLoggedIn !== undefined ? isLoggedIn : !!user;

	return (
		<div className="mb-8">
			<div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between md:gap-0">
				<div>
					<h1 className="text-foreground mb-2 text-4xl font-bold">{title}</h1>
					<p className="text-muted-foreground">{subtitle}</p>
				</div>

				{buttonVisible && buttonType === 'button' && loggedIn && (
					<Button onClick={onClick} className="gap-2">
						{buttonIcon}
						{buttonText}
					</Button>
				)}
				{buttonVisible && buttonType === 'link' && href && loggedIn && (
					<Link to={href || '#'}>
						<Button className="gap-2">
							{buttonIcon}
							{buttonText}
						</Button>
					</Link>
				)}
			</div>
		</div>
	);
};

export default PageTitle;
