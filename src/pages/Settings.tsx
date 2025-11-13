import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Input,
	Label,
	PageTitle,
	Separator,
} from '@/components';
import { useToast } from '@/hooks/useToast';

const Settings = () => {
	const { toast } = useToast();

	const handleSave = () => {
		toast({
			title: 'Налаштування збережено',
			description: 'Ваші зміни успішно застосовано',
		});
	};

	return (
		<main className="container mx-auto px-4 py-8">
			<div className="max-w-2xl mx-auto space-y-6">
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
						<div className="flex items-center justify-between">
							<div>
								<Label>Email сповіщення</Label>
								<p className="text-sm text-muted-foreground">
									Отримуйте сповіщення про нові страви та оновлення
								</p>
							</div>
							<Input type="checkbox" className="w-auto" />
						</div>
						<Separator />
						<div className="flex items-center justify-between">
							<div>
								<Label>Нагадування про меню</Label>
								<p className="text-sm text-muted-foreground">
									Сповіщення про планування меню
								</p>
							</div>
							<Input type="checkbox" className="w-auto" />
						</div>
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

				<div className="flex justify-end gap-4">
					<Button variant="outline">Скасувати</Button>
					<Button onClick={handleSave}>Зберегти зміни</Button>
				</div>
			</div>
		</main>
	);
};

export default Settings;
