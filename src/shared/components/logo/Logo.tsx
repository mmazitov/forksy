import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

const Logo = () => {
	return (
		<Link
			to="/"
			className="flex items-center gap-2 text-xl font-bold text-foreground cursor-pointer"
		>
			<ReactSVG src="/logo.svg" />
			<span>Forksy</span>
		</Link>
	);
};

export default Logo;
