import { useAuth } from '@/hooks';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
	children: ReactNode;
	fallback?: ReactNode;
}

const ProtectedRoute = ({ children, fallback }: ProtectedRouteProps) => {
	const { user, isLoading } = useAuth();

	if (isLoading) {
		return (
			fallback || (
				<div className="flex items-center justify-center min-h-screen">
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
