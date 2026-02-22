import {
	LanguageSettings,
	NotificationsSettings,
	SecuritySettings,
} from '@/features/settings';
import {
	Button,
	MetaData,
	PageTitle,
	PwaManagement,
} from '@/shared/components';
import { useSettings } from '@/shared/hooks';
import { METADATA_CONFIG } from '@/shared/lib/config/metaDataConfig';

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

				<NotificationsSettings
					emailNotifications={settings.emailNotifications}
					menuReminders={settings.menuReminders}
					onEmailNotificationsChange={(value) =>
						updateSetting('emailNotifications', value)
					}
					onMenuRemindersChange={(value) =>
						updateSetting('menuReminders', value)
					}
				/>

				<LanguageSettings />

				<SecuritySettings />

				<PwaManagement />

				<div className="flex justify-end gap-4">
					<Button onClick={handleSave}>Зберегти налаштування</Button>
				</div>
			</div>
		</main>
	);
};

export default Settings;
