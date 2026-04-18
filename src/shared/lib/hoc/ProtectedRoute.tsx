import { ReactNode, useEffect } from 'react';

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

	useEffect(() => {
		if (!isLoading && !user) {
			setAuthModalOpen(true);
		}
	}, [isLoading, user, setAuthModalOpen]);

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
