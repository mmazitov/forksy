import Logo from './Logo';
import Navigation from './Navigation';
import UserMenu from './UserMenu';

const Header = () => {
	return (
		<header className="border-[var(--main-color)] border-b-[1px]" role="banner">
			<div className="flex justify-between items-center py-[5px] container">
				<Logo />
				<Navigation />
				<UserMenu />
			</div>
		</header>
	);
};

export default Header;
