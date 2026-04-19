import { useState, useEffect } from 'react';

interface Tab {
	title: string;
	value: string;
	disabled: boolean;
}

interface UseTabsWithAutoSwitchProps<T extends Tab> {
	tabs: T[];
	defaultTab: string;
	isLoading: boolean;
}

export const useTabsWithAutoSwitch = <T extends Tab>({
	tabs,
	defaultTab,
	isLoading,
}: UseTabsWithAutoSwitchProps<T>) => {
	const [activeTab, setActiveTab] = useState<string>(defaultTab);

	useEffect(() => {
		if (!isLoading) {
			const firstAvailableTab = tabs.find((tab) => !tab.disabled);
			if (
				firstAvailableTab &&
				tabs.find((t) => t.value === activeTab)?.disabled
			) {
				setActiveTab(firstAvailableTab.value);
			}
		}
	}, [isLoading, tabs, activeTab]);

	return {
		activeTab,
		setActiveTab,
	};
};
