import { useCallback, useState } from 'react';
import { toast } from 'sonner';
export interface SettingsState {
	emailNotifications: boolean;
	menuReminders: boolean;
}

export const useSettings = (initialState: SettingsState) => {
	const [settings, setSettings] = useState<SettingsState>(initialState);

	const updateSetting = useCallback(
		<K extends keyof SettingsState>(key: K, value: SettingsState[K]) => {
			setSettings((prev) => ({ ...prev, [key]: value }));
		},
		[],
	);

	const handleSave = useCallback(() => {
		toast.success('Налаштування збережено!');
	}, []);

	const resetSettings = useCallback((state: SettingsState) => {
		setSettings(state);
	}, []);

	return {
		settings,
		updateSetting,
		handleSave,
		resetSettings,
	};
};
