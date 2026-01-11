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
import { useSettings } from '@/hooks/useSettings';
import { METADATA_CONFIG } from '@/lib/config/metaDataConfig';

const Settings = () => {
	const { settings, updateSetting, handleSave } = useSettings({
		emailNotifications: false,
		menuReminders: false,
	});

	return (
		<main className="container mx-auto px-4 py-8">
			<div className="mx-auto max-w-2xl space-y-6">
				<MetaData
					title={METADATA_CONFIG.titles.settings}
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
							checked={settings.emailNotifications}
							onCheckedChange={(value) =>
								updateSetting('emailNotifications', value === true)
							}
						/>
						<Separator />
						<Checkbox
							label="Нагадування про меню"
							subLabel="Сповіщення про планування меню"
							checked={settings.menuReminders}
							onCheckedChange={(value) =>
								updateSetting('menuReminders', value === true)
							}
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
