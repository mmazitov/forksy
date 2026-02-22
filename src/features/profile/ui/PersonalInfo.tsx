import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Input,
	Label,
} from '@/shared/components';
import { formatPhone } from '@/shared/lib/utils';
import { ProfileFormData } from '@/shared/types';

interface User {
	name?: string | null;
	email?: string | null;
	phone?: string | null;
}

interface PersonalInfoProps {
	user: User | null | undefined;
	formData: Pick<ProfileFormData, 'name' | 'phone'>;
	isEditMode: boolean;
	onEdit: () => void;
	onUpdate: (field: keyof ProfileFormData, value: string) => void;
}

const PersonalInfo = ({
	user,
	formData,
	isEditMode,
	onEdit,
	onUpdate,
}: PersonalInfoProps) => {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle>Основна інформація</CardTitle>
				<Button variant="link" onClick={onEdit}>
					Редагувати
				</Button>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="name">Ім&apos;я:</Label>
					{isEditMode ? (
						<Input
							id="name"
							type="text"
							placeholder="Ваше ім'я"
							value={formData.name}
							onChange={(e) => onUpdate('name', e.target.value)}
						/>
					) : (
						<h3>{user?.name}</h3>
					)}
				</div>
				<div className="space-y-2">
					<Label htmlFor="email">Email:</Label>
					{isEditMode ? (
						<Input
							id="email"
							type="email"
							placeholder="Ваш email"
							value={user?.email || ''}
							disabled
						/>
					) : (
						<h3>{user?.email}</h3>
					)}
				</div>
				<div className="space-y-2">
					<Label htmlFor="phone">Телефон</Label>
					{isEditMode ? (
						<Input
							id="phone"
							type="tel"
							placeholder="+380 (XX) XXX-XX-XX"
							value={formData.phone}
							onChange={(e) => onUpdate('phone', e.target.value)}
						/>
					) : (
						<h3>{user?.phone ? formatPhone(user.phone) : '-'}</h3>
					)}
				</div>
			</CardContent>
		</Card>
	);
};

export default PersonalInfo;
