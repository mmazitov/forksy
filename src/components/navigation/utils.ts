import { useLocation } from 'react-router-dom';

// Utility function to check if a path is active
export const useIsActive = () => {
	const location = useLocation();

	return (path: string) => {
		// Exact match for home page
		if (path === '/' && location.pathname === '/') {
			return true;
		}

		// For other pages, check if the current path starts with the given path
		// and is either an exact match or followed by a slash
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
