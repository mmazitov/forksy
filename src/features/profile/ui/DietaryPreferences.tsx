import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Input,
	Label,
	Textarea,
} from '@/shared/components';
import { ProfileFormData } from '@/shared/types';

interface User {
	diet?: string | null;
	allergy?: string[] | null;
	dislike?: string[] | null;
}

interface DietaryPreferencesProps {
	user: User | null | undefined;
	formData: Pick<ProfileFormData, 'diet' | 'allergy' | 'dislike'>;
	isEditMode: boolean;
	onUpdate: (field: keyof ProfileFormData, value: string) => void;
}

const DietaryPreferences = ({
	user,
	formData,
	isEditMode,
	onUpdate,
}: DietaryPreferencesProps) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Дієтичні вподобання</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="diet">Тип дієти:</Label>
					{isEditMode ? (
						<Input
							id="diet"
							placeholder="Вкажіть ваш тип дієти"
							value={formData.diet}
							onChange={(e) => onUpdate('diet', e.target.value)}
						/>
					) : (
						<h3>{user?.diet || '-'}</h3>
					)}
				</div>
				<div className="space-y-2">
					<Label htmlFor="allergies">Алергії</Label>
					{isEditMode ? (
						<Input
							id="allergies"
							placeholder="Вкажіть продукти-алергени"
							value={formData.allergy || ''}
							onChange={(e) => onUpdate('allergy', e.target.value)}
						/>
					) : (
						<h3>{user?.allergy?.length ? user.allergy.join(', ') : '-'}</h3>
					)}
				</div>
				<div className="space-y-2">
					<Label htmlFor="dislikes">Не подобається:</Label>
					{isEditMode ? (
						<Textarea
							id="dislikes"
							placeholder="Продукти, які вам не подобаються..."
							rows={3}
							value={formData.dislike || ''}
							onChange={(e) => onUpdate('dislike', e.target.value)}
						/>
					) : (
						<h3>{user?.dislike?.length ? user.dislike.join(', ') : '-'}</h3>
					)}
				</div>
			</CardContent>
		</Card>
	);
};

export default DietaryPreferences;
