import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

const Logo = () => {
	return (
		<Link
			to="/"
			className="text-foreground flex cursor-pointer items-center text-xl font-bold"
		>
			<ReactSVG src="/logo.svg" className="block h-[48px] w-[48px]" />
			<span>Munchio</span>
		</Link>
	);
};

export default Logo;
