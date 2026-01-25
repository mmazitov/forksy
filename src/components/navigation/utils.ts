import { useLocation } from 'react-router-dom';

export const useIsActive = () => {
	const location = useLocation();

	return (path: string) => {
		if (path === '/' && location.pathname === '/') {
			return true;
		}

		if (path !== '/') {
			return (
				location.pathname === path ||
				(location.pathname.startsWith(path) &&
					(location.pathname.charAt(path.length) === '/' ||
						location.pathname.length === path.length))
			);
		}

		return false;
	};
};
