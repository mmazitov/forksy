import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Input,
	Label,
	MetaData,
	PageTitle,
	Textarea,
} from '@/components';
import { useToast } from '@/hooks/useToast';
import { METADATA_CONFIG } from '@/lib/config';
import { useMeQuery, useUpdateProfileMutation } from '@/lib/graphql';
import { useState } from 'react';

const Profile = () => {
	const { data, refetch } = useMeQuery();
	const [updateProfile, { loading: updating }] = useUpdateProfileMutation();
	const { toast } = useToast();
	const [isEditMode, setIsEditMode] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		avatar: '',
	});

	const user = data?.me;

	const handleEdit = () => {
		setIsEditMode(true);
		setFormData({
			name: user?.name || '',
			avatar: user?.avatar || '',
		});
	};

	const handleCancel = () => {
		setIsEditMode(false);
		setFormData({
			name: '',
			avatar: '',
		});
	};

	const handleSave = async () => {
		try {
			await updateProfile({
				variables: {
					name: formData.name || undefined,
					avatar: formData.avatar || undefined,
				},
			});

			await refetch();

			toast({
				title: 'Профіль оновлено',
				description: 'Ваші зміни успішно збережені',
			});

			setIsEditMode(false);
		} catch (error) {
			console.error('Failed to update profile:', error);
			toast({
				title: 'Помилка',
				description: 'Не вдалося оновити профіль',
				variant: 'destructive',
			});
		}
	};

	return (
		<main className="container mx-auto px-4 py-8">
			<div className="max-w-2xl mx-auto space-y-6">
				<MetaData
					title="Профіль користувача"
					description={METADATA_CONFIG.descriptions.profile}
					keywords={METADATA_CONFIG.keywords.profile}
					type="website"
				/>
				<PageTitle
					title="Профіль користувача"
					subtitle="Керуйте своєю особистою інформацією та налаштуваннями"
					buttonVisible={false}
				/>

				<Card>
					<CardHeader className="flex justify-between items-center flex-row">
						<CardTitle>Основна інформація</CardTitle>
						<Button variant="link" onClick={handleEdit}>
							{' '}
							Редагувати
						</Button>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="name">Ім'я:</Label>
							{isEditMode ? (
								<Input
									id="name"
									type="text"
									placeholder="Ваше ім'я"
									value={formData.name}
									onChange={(e) =>
										setFormData({ ...formData, name: e.target.value })
									}
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
								<Input id="phone" type="tel" placeholder="+7 (___) ___-__-__" />
							) : (
								<h3>-</h3>
							)}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Дієтичні вподобання</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="diet">Тип дієти:</Label>
							{isEditMode ? (
								<Input id="diet" placeholder="Вкажіть ваш тип дієти" />
							) : (
								<h3>-</h3>
							)}
						</div>
						<div className="space-y-2">
							<Label htmlFor="allergies">Алергії</Label>
							{isEditMode ? (
								<Input id="allergies" placeholder="Вкажіть продукти-алергени" />
							) : (
								<h3>-</h3>
							)}
						</div>
						<div className="space-y-2">
							<Label htmlFor="dislikes">Не подобається:</Label>
							{isEditMode ? (
								<Textarea
									id="dislikes"
									placeholder="Продукти, які вам не подобаються..."
									rows={3}
								/>
							) : (
								<h3>-</h3>
							)}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Статистика</CardTitle>
						<CardDescription>Ваша активність у додатку</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-3 gap-4 text-center">
							<div>
								<div className="text-2xl font-bold text-primary">24</div>
								<div className="text-sm text-muted-foreground">Блюд</div>
							</div>
							<div>
								<div className="text-2xl font-bold text-primary">156</div>
								<div className="text-sm text-muted-foreground">Продуктів</div>
							</div>
							<div>
								<div className="text-2xl font-bold text-primary">12</div>
								<div className="text-sm text-muted-foreground">Меню</div>
							</div>
						</div>
					</CardContent>
				</Card>

				<div className="flex justify-end gap-4">
					{isEditMode && (
						<>
							<Button
								variant="outline"
								onClick={handleCancel}
								disabled={updating}
							>
								Скасувати
							</Button>
							<Button onClick={handleSave} disabled={updating}>
								{updating ? 'Збереження...' : 'Зберегти'}
							</Button>
						</>
					)}
				</div>
			</div>
		</main>
	);
};

export default Profile;
