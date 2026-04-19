import { ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuthContext } from '@/features/auth';
import { Card, CardContent } from '@/shared/components';
import { Loader } from '@/shared/components/loader';
import Modal from '@/shared/components/modal/Modal';
import { MODAL_TYPES } from '@/shared/constants';
import { useModal } from '@/shared/hooks';

interface ProtectedRouteProps {
	children: ReactNode;
	fallback?: ReactNode;
}

const ProtectedRoute = ({ children, fallback }: ProtectedRouteProps) => {
	const { user, isLoading } = useAuthContext();
	const { isOpen: authModalOpen, setIsOpen: setAuthModalOpen } = useModal();
	const navigate = useNavigate();
	const location = useLocation();

	const isInvitationRoute = location.pathname.includes('/accept-invitation/');

	useEffect(() => {
		if (!isLoading && !user) {
			if (isInvitationRoute) {
				setAuthModalOpen(true);
			} else {
				navigate('/', { replace: true });
			}
		}
	}, [isLoading, user, setAuthModalOpen, navigate, isInvitationRoute]);

	if (isLoading) {
		return (
			fallback || (
				<div className="container mx-auto max-w-md px-4 py-8">
					<Card>
						<CardContent className="flex flex-col items-center justify-center space-y-4 py-12">
							<Loader />
							<p className="text-muted-foreground text-center">
								Завантаження...
							</p>
						</CardContent>
					</Card>
				</div>
			)
		);
	}

	if (!user) {
		if (!isInvitationRoute) {
			return null;
		}

		return (
			<>
				<div className="container mx-auto max-w-md px-4 py-8">
					<Card>
						<CardContent className="flex flex-col items-center justify-center space-y-4 py-12">
							<Loader />
							<p className="text-muted-foreground text-center">
								Потрібна авторизація...
							</p>
						</CardContent>
					</Card>
				</div>
				<Modal
					modalType={MODAL_TYPES.AUTH_MODAL}
					open={authModalOpen}
					onOpenChange={setAuthModalOpen}
				/>
			</>
		);
	}

	return <>{children}</>;
};

export default ProtectedRoute;
