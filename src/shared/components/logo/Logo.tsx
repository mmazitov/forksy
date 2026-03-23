import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

const Logo = () => {
	return (
		<Link
			to="/"
			className="text-foreground flex cursor-pointer items-center gap-2 text-xl font-bold"
		>
			<ReactSVG src="/logo.svg" width={32} height={32} />
			<span>Forklet</span>
		</Link>
	);
};

export default Logo;
