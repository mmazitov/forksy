import { Clock, Mail, Trash2, User, X } from 'lucide-react';

import { Badge, Button } from '@/shared/components';
import { FamilyMemberStatus, FamilyMember } from '@/shared/types';

interface FamilyMemberCardProps {
	member: FamilyMember;
	isCurrentUser: boolean;
	onRemove: (memberId: string) => void;
	onCancelInvitation: (invitationId: string) => void;
	removing: boolean;
	canceling: boolean;
}

const FamilyMemberCard = ({
	member,
	isCurrentUser,
	onRemove,
	onCancelInvitation,
	removing,
	canceling,
}: FamilyMemberCardProps) => {
	const isPending = member.status === FamilyMemberStatus.Pending;
	const isOwner = member.status === FamilyMemberStatus.Owner;

	return (
		<div className="flex items-start justify-between gap-4 rounded-lg border p-4">
			<div className="flex items-start gap-3">
				<div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
					<User className="text-primary h-5 w-5" />
				</div>
				<div className="space-y-1">
					<div className="flex items-center gap-2">
						<h4 className="leading-tight font-medium">
							{member.name || 'Без імені'}
							{isCurrentUser && ' (Ви)'}
						</h4>
						{isOwner && (
							<Badge variant="default" className="text-xs">
								Власник
							</Badge>
						)}
						{isPending && (
							<Badge variant="outline" className="text-xs">
								<Clock className="mr-1 h-3 w-3" />
								Очікує
							</Badge>
						)}
					</div>
					<div className="text-muted-foreground flex items-center gap-1 text-sm">
						<Mail className="h-3 w-3" />
						<span>{member.email}</span>
					</div>
					{!isPending && member.sharedMenusCount !== undefined && (
						<p className="text-muted-foreground text-xs">
							📅 {member.sharedMenusCount} спільних меню
						</p>
					)}
					{isPending && (
						<p className="text-muted-foreground text-xs">
							Очікує підтвердження
						</p>
					)}
				</div>
			</div>

			{!isCurrentUser && (
				<div>
					{isPending ? (
						<Button
							variant="ghost"
							size="sm"
							onClick={() => onCancelInvitation(member.id)}
							disabled={canceling}
						>
							<X className="h-4 w-4" />
							<span className="ml-1">Скасувати</span>
						</Button>
					) : (
						<Button
							variant="ghost"
							size="sm"
							onClick={() => onRemove(member.id)}
							disabled={removing}
						>
							<Trash2 className="text-destructive h-4 w-4" />
						</Button>
					)}
				</div>
			)}
		</div>
	);
};

export default FamilyMemberCard;
