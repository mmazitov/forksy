import { SavedMenus, useSavedMenus } from '@/features/menus';
import {
	MetaData,
	PageTitle,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/shared/components';
import { PAGE_TITLE, MENU_TABS } from '@/shared/constants';
import { useTabsWithAutoSwitch } from '@/shared/hooks';
import { METADATA_CONFIG } from '@/shared/lib/config';

const Menus = () => {
	const { menus, loading } = useSavedMenus();

	const tabs = MENU_TABS.map((tab) => ({
		...tab,
		disabled:
			!loading &&
			((tab.value === 'my' && menus.length === 0) ||
				(tab.value === 'shared' && true)),
	}));

	const { activeTab, setActiveTab } = useTabsWithAutoSwitch({
		tabs,
		defaultTab: 'my',
		isLoading: loading,
	});

	return (
		<div className="container mx-auto px-4 py-8">
			<MetaData
				title={METADATA_CONFIG.titles.menus}
				description={METADATA_CONFIG.descriptions.menus}
				keywords={METADATA_CONFIG.keywords.menus}
				type="website"
			/>

			<PageTitle
				title={PAGE_TITLE.menus.title}
				subtitle={PAGE_TITLE.menus.subtitle}
				buttonVisible={false}
			/>

			<Tabs value={activeTab} onValueChange={setActiveTab}>
				<TabsList className="mb-6 inline-flex">
					{tabs.map((tab) => (
						<TabsTrigger
							key={tab.value}
							value={tab.value}
							disabled={tab.disabled}
						>
							{tab.title}
						</TabsTrigger>
					))}
				</TabsList>
				{tabs.map((tab) => (
					<TabsContent key={tab.value} value={tab.value} className="mt-0">
						{tab.value === tabs[0].value && <SavedMenus />}
						{tab.value === tabs[1].value && (
							<>
								<div className="flex flex-col items-center justify-center py-12 text-center">
									<p className="text-muted-foreground">
										Функція shared меню буде доступна незабаром
									</p>
								</div>
							</>
						)}
					</TabsContent>
				))}
			</Tabs>
		</div>
	);
};

export default Menus;
