import { Button } from '@/components';
import { LuArrowBigLeft } from 'react-icons/lu';
import { Link } from 'react-router-dom';

interface BackButtonProps {
	title: string;
	href: string;
}

const BackButton = ({ title, href }: BackButtonProps) => {
	return (
		<Link to={href}>
			<Button variant="ghost" className="mb-6 gap-2">
				<LuArrowBigLeft className="h-4 w-4" />
				{title}
			</Button>
		</Link>
	);
};

export default BackButton;
