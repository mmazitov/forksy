import { useState } from 'react';
import { toast } from 'sonner';

import {
	useCancelFamilyInvitationMutation,
	useFamilyMembersQuery,
	useInviteFamilyMemberMutation,
	useRemoveFamilyMemberMutation,
} from '@/shared/api/graphql';

export const useFamilyMembers = () => {
	const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);

	const { data, loading, refetch } = useFamilyMembersQuery({
		fetchPolicy: 'cache-and-network',
	});

	const [inviteMember, { loading: inviting }] = useInviteFamilyMemberMutation({
		onCompleted: () => {
			toast.success('Запрошення надіслано');
			setIsInviteDialogOpen(false);
			refetch();
		},
		onError: (error) => {
			toast.error(error.message || 'Помилка при надсиланні запрошення');
		},
	});

	const [removeMember, { loading: removing }] = useRemoveFamilyMemberMutation({
		onCompleted: () => {
			toast.success("Члена сім'ї видалено");
			refetch();
		},
		onError: (error) => {
			toast.error(error.message || "Помилка при видаленні члена сім'ї");
		},
	});

	const [cancelInvitation, { loading: canceling }] =
		useCancelFamilyInvitationMutation({
			onCompleted: () => {
				toast.success('Запрошення скасовано');
				refetch();
			},
			onError: (error) => {
				toast.error(error.message || 'Помилка при скасуванні запрошення');
			},
		});

	const handleInvite = async (email: string) => {
		await inviteMember({ variables: { email } });
	};

	const handleRemove = async (memberId: string) => {
		await removeMember({ variables: { memberId } });
	};

	const handleCancelInvitation = async (invitationId: string) => {
		await cancelInvitation({ variables: { invitationId } });
	};

	return {
		members: data?.familyMembers ?? [],
		loading,
		inviting,
		removing,
		canceling,
		isInviteDialogOpen,
		setIsInviteDialogOpen,
		handleInvite,
		handleRemove,
		handleCancelInvitation,
	};
};
