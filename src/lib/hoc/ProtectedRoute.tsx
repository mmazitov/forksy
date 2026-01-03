import { useAuthContext } from '@/hooks';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
	children: ReactNode;
	fallback?: ReactNode;
}

const ProtectedRoute = ({ children, fallback }: ProtectedRouteProps) => {
	const { user, isLoading } = useAuthContext();

	if (isLoading) {
		return (
			fallback || (
				<div className="flex min-h-screen items-center justify-center">
					Завантаження...
				</div>
			)
		);
	}

	if (!user) {
		return <Navigate to="/" />;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
