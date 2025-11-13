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
	Textarea,
} from '@/components';
import { useToast } from '@/hooks/useToast';

const Profile = () => {
	const { toast } = useToast();

	const handleSave = () => {
		toast({
			title: 'Профіль оновлено',
			description: 'Ваші дані успішно збережено',
		});
	};

	return (
		<main className="container mx-auto px-4 py-8">
			<div className="max-w-2xl mx-auto space-y-6">
				<PageTitle
					title="Профіль користувача"
					subtitle="Керуйте своєю особистою інформацією та налаштуваннями"
					buttonVisible={false}
				/>

				<Card>
					<CardHeader>
						<CardTitle>Основна інформація</CardTitle>
						<CardDescription>
							Оновіть свою особисту інформацію та контактні дані
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="name">Ім'я</Label>
							<Input id="name" placeholder="Введіть ваше ім'я" />
						</div>
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input id="email" type="email" placeholder="your@email.com" />
						</div>
						<div className="space-y-2">
							<Label htmlFor="phone">Телефон</Label>
							<Input id="phone" type="tel" placeholder="+7 (___) ___-__-__" />
						</div>
						<div className="space-y-2">
							<Label htmlFor="bio">Про себе</Label>
							<Textarea
								id="bio"
								placeholder="Розкажіть трохи про себе..."
								rows={4}
							/>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Дієтичні вподобання</CardTitle>
						<CardDescription>
							Вкажіть ваші харчові вподобання та обмеження
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="diet">Тип дієти</Label>
							<Input id="diet" placeholder="Наприклад: вегетаріанська" />
						</div>
						<div className="space-y-2">
							<Label htmlFor="allergies">Алергії</Label>
							<Input id="allergies" placeholder="Вкажіть продукти-алергени" />
						</div>
						<div className="space-y-2">
							<Label htmlFor="dislikes">Не подобається</Label>
							<Textarea
								id="dislikes"
								placeholder="Продукти, які вам не подобаються..."
								rows={3}
							/>
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
					<Button variant="outline">Скасувати</Button>
					<Button onClick={handleSave}>Зберегти</Button>
				</div>
			</div>
		</main>
	);
};

export default Profile;
