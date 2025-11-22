import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Checkbox,
	Input,
	Label,
	MetaData,
	PageTitle,
	PwaManagement,
	Separator,
} from '@/components';
import { useToast } from '@/hooks/useToast';
import { METADATA_CONFIG } from '@/lib/config/metaDataConfig';
import { useState } from 'react';

const Settings = () => {
	const { toast } = useToast();
	const [emailNotifications, setEmailNotifications] = useState(false);
	const [menuReminders, setMenuReminders] = useState(false);

	const handleSave = () => {
		toast({
			title: 'Налаштування збережено',
			description: 'Ваші зміни успішно застосовано',
		});
	};

	return (
		<main className="container mx-auto px-4 py-8">
			<div className="max-w-2xl mx-auto space-y-6">
				<MetaData
					title="Налаштування"
					description={METADATA_CONFIG.descriptions.settings}
					keywords={METADATA_CONFIG.keywords.settings}
					type="website"
				/>
				<PageTitle
					title="Налаштування"
					subtitle="Керуйте своїм обліковим записом та параметрами додатку"
					buttonVisible={false}
				/>

				<Card>
					<CardHeader>
						<CardTitle>Сповіщення</CardTitle>
						<CardDescription>
							Налаштуйте, як ви хочете отримувати сповіщення
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<Checkbox
							label="Email сповіщення"
							subLabel="Отримуйте сповіщення про нові страви та оновлення"
							checked={emailNotifications}
							setChecked={setEmailNotifications}
						/>
						<Separator />
						<Checkbox
							label="Нагадування про меню"
							subLabel="Сповіщення про планування меню"
							checked={menuReminders}
							setChecked={setMenuReminders}
						/>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Переваги</CardTitle>
						<CardDescription>Персоналізація вашого досвіду</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="language">Мова інтерфейсу</Label>
							<p>Функціонал зміни мови буде доступний у майбутньому</p>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Безпека</CardTitle>
						<CardDescription>
							Управління паролем і безпекою акаунта
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="current-password">Поточний пароль</Label>
							<Input id="current-password" type="password" />
						</div>
						<div className="space-y-2">
							<Label htmlFor="new-password">Новий пароль</Label>
							<Input id="new-password" type="password" />
						</div>
						<div className="space-y-2">
							<Label htmlFor="confirm-password">Підтвердіть пароль</Label>
							<Input id="confirm-password" type="password" />
						</div>
					</CardContent>
				</Card>

				<PwaManagement />

				<div className="flex justify-end gap-4">
					<Button variant="outline">Скасувати</Button>
					<Button onClick={handleSave}>Зберегти зміни</Button>
				</div>
			</div>
		</main>
	);
};

export default Settings;
