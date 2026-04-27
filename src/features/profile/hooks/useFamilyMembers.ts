import { useState } from 'react';
import { toast } from 'sonner';

import {
	FamilyMembersDocument,
	useCancelFamilyInvitationMutation,
	useFamilyMembersQuery,
	useInviteFamilyMemberMutation,
	useRemoveFamilyMemberMutation,
} from '@/shared/api/graphql';

export const useFamilyMembers = () => {
	const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);

	const { data, loading } = useFamilyMembersQuery({
		fetchPolicy: 'cache-and-network',
	});

	const [inviteMember, { loading: inviting }] = useInviteFamilyMemberMutation({
		refetchQueries: [{ query: FamilyMembersDocument }],
		onCompleted: () => {
			toast.success('Запрошення надіслано');
			setIsInviteDialogOpen(false);
		},
		onError: (error) => {
			toast.error(error.message || 'Помилка при надсиланні запрошення');
		},
	});

	const [removeMember, { loading: removing }] = useRemoveFamilyMemberMutation({
		refetchQueries: [{ query: FamilyMembersDocument }],
		onCompleted: () => {
			toast.success("Члена сім'ї видалено");
		},
		onError: (error) => {
			toast.error(error.message || "Помилка при видаленні члена сім'ї");
		},
	});

	const [cancelInvitation, { loading: canceling }] =
		useCancelFamilyInvitationMutation({
			refetchQueries: [{ query: FamilyMembersDocument }],
			onCompleted: () => {
				toast.success('Запрошення скасовано');
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
