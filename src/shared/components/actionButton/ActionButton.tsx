import { Link } from 'react-router-dom';

import { Button } from '../ui';

interface ActionButtonProps {
	type?: 'button' | 'link';
	text?: string;
	icon?: React.ReactNode;
	onClick?: () => void;
	href?: string;
	disabled?: boolean;
	visible?: boolean;
	mobileVisible?: boolean;
}

const ActionButton = ({
	type = 'button',
	text,
	icon,
	onClick,
	href,
	disabled,
	visible,
	mobileVisible = true,
}: ActionButtonProps) => {
	if (!visible) return null;

	const content = (
		<Button
			onClick={onClick}
			className={`gap-2 ${!mobileVisible ? 'hidden md:flex' : ''}`}
			disabled={disabled}
		>
			{icon}
			{text}
		</Button>
	);

	if (type === 'link' && href) {
		return <Link to={href}>{content}</Link>;
	}

	return content;
};

export default ActionButton;
