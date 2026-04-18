import { UserPlus } from 'lucide-react';

import { useFamilyMembers } from '../hooks/useFamilyMembers';
import FamilyMemberCard from './FamilyMemberCard';
import InviteMemberDialog from './InviteMemberDialog';

import { useAuthContext } from '@/features/auth';
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/shared/components';
import { FamilyMemberStatus } from '@/shared/types';

const FamilyInformation = () => {
	const { user } = useAuthContext();
	const {
		members,
		loading,
		inviting,
		removing,
		canceling,
		isInviteDialogOpen,
		setIsInviteDialogOpen,
		handleInvite,
		handleRemove,
		handleCancelInvitation,
	} = useFamilyMembers();

	const membersCount = members.filter(
		(m) => m.status !== FamilyMemberStatus.Pending,
	).length;

	return (
		<>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between">
					<div>
						<CardTitle>Інформація про сім&apos;ю</CardTitle>
						{membersCount > 0 && (
							<p className="text-muted-foreground mt-1 text-sm">
								Членів сім&apos;ї: {membersCount}
							</p>
						)}
					</div>
					<Button
						variant="outline"
						size="sm"
						onClick={() => setIsInviteDialogOpen(true)}
					>
						<UserPlus className="h-4 w-4" />
						<span className="ml-2">Запросити</span>
					</Button>
				</CardHeader>
				<CardContent>
					{loading && members.length === 0 ? (
						<p className="text-muted-foreground text-center text-sm">
							Завантаження...
						</p>
					) : members.length === 0 ? (
						<div className="space-y-4 text-center">
							<p className="text-muted-foreground text-sm">
								У вас ще немає членів сім&apos;ї
							</p>
							<p className="text-muted-foreground text-xs">
								Запросіть членів сім&apos;ї, щоб ділитися меню та списками
								покупок
							</p>
						</div>
					) : (
						<div className="space-y-3">
							{members.map((member) => (
								<FamilyMemberCard
									key={member.id}
									member={{
										...member,
										name: member.name ?? null,
										invitedAt: member.invitedAt ?? null,
										sharedMenusCount: member.sharedMenusCount ?? null,
									}}
									isCurrentUser={member.email === user?.email}
									onRemove={handleRemove}
									onCancelInvitation={handleCancelInvitation}
									removing={removing}
									canceling={canceling}
								/>
							))}
						</div>
					)}
				</CardContent>
			</Card>

			<InviteMemberDialog
				open={isInviteDialogOpen}
				onOpenChange={setIsInviteDialogOpen}
				onInvite={handleInvite}
				inviting={inviting}
			/>
		</>
	);
};

export default FamilyInformation;
