import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/utils/authOptions';

import Logo from './Logo';
import Navigation from './Navigation';
import UserMenu from './UserMenu';

const Header = async () => {
	const session = await getServerSession(authOptions);

	return (
		<header className="border-[var(--main-color)] border-b-[1px]" role="banner">
			<div className="flex justify-between items-center py-[5px] container">
				<Logo />
				<Navigation session={session} />
				<UserMenu session={session} />
			</div>
		</header>
	);
};

export default Header;
