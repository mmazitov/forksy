import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Checkbox,
	Separator,
} from '@/shared/components';

interface NotificationsSettingsProps {
	emailNotifications: boolean;
	menuReminders: boolean;
	onEmailNotificationsChange: (value: boolean) => void;
	onMenuRemindersChange: (value: boolean) => void;
}

const NotificationsSettings = ({
	emailNotifications,
	menuReminders,
	onEmailNotificationsChange,
	onMenuRemindersChange,
}: NotificationsSettingsProps) => {
	return (
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
					onCheckedChange={(value) =>
						onEmailNotificationsChange(value === true)
					}
				/>
				<Separator />
				<Checkbox
					label="Нагадування про меню"
					subLabel="Сповіщення про планування меню"
					checked={menuReminders}
					onCheckedChange={(value) => onMenuRemindersChange(value === true)}
				/>
			</CardContent>
		</Card>
	);
};

export default NotificationsSettings;
