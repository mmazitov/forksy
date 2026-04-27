import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle2, XCircle } from 'lucide-react';

import { useAcceptFamilyInvitationMutation } from '@/shared/api/graphql';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/shared/components';
import { Loader } from '@/shared/components/loader';

type InvitationStatus = 'pending' | 'success' | 'error';

const AcceptInvitation = () => {
	const navigate = useNavigate();
	const { invitationId } = useParams<{ invitationId: string }>();
	const [status, setStatus] = useState<InvitationStatus>('pending');
	const [errorMessage, setErrorMessage] = useState<string>('');
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const [acceptInvitation, { loading }] = useAcceptFamilyInvitationMutation({
		onCompleted: () => {
			setStatus('success');
			timerRef.current = setTimeout(() => navigate('/profile'), 2000);
		},
		onError: (error) => {
			setStatus('error');
			setErrorMessage(error.message || 'Не вдалося прийняти запрошення');
		},
	});

	useEffect(() => {
		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, []);

	useEffect(() => {
		if (!invitationId) {
			setStatus('error');
			setErrorMessage('Невірне посилання запрошення');
			return;
		}

		acceptInvitation({ variables: { invitationId } });
	}, [invitationId, acceptInvitation]);

	if (status === 'pending' || loading) {
		return (
			<div className="container mx-auto max-w-md px-4 py-8">
				<Card>
					<CardContent className="flex flex-col items-center justify-center space-y-4 py-12">
						<Loader />
						<p className="text-muted-foreground text-center">
							Приймаємо запрошення...
						</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	if (status === 'error') {
		return (
			<div className="container mx-auto max-w-md px-4 py-8">
				<Card>
					<CardHeader>
						<div className="flex items-center justify-center">
							<XCircle className="text-destructive h-12 w-12" />
						</div>
						<CardTitle className="text-center">Помилка</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<p className="text-muted-foreground text-center">{errorMessage}</p>
						<div className="flex justify-center">
							<Button onClick={() => navigate('/profile')}>
								Перейти до профілю
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="container mx-auto max-w-md px-4 py-8">
			<Card>
				<CardHeader>
					<div className="flex items-center justify-center">
						<CheckCircle2 className="text-primary h-12 w-12" />
					</div>
					<CardTitle className="text-center">Запрошення прийнято!</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<p className="text-muted-foreground text-center">
						Ви успішно приєдналися до сім&apos;ї
					</p>
					<p className="text-muted-foreground text-center text-sm">
						Перенаправляємо вас до профілю...
					</p>
				</CardContent>
			</Card>
		</div>
	);
};

export default AcceptInvitation;
