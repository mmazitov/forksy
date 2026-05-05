import {
	ShoppingListContent,
	useShoppingListPage,
} from '@/features/shoppingList';
import { Breadcrumb, Loader, MetaData, PageTitle } from '@/shared/components';
import { useBreadcrumbs } from '@/shared/hooks';
import { METADATA_CONFIG } from '@/shared/lib/config';

const ShoppingList = () => {
	const {
		weekDiff,
		loading,
		error,
		plannerItemsData,
		checkedCount,
		totalCount,
		handleExport,
		backHref,
	} = useShoppingListPage();

	const weekLabel =
		weekDiff === 0
			? 'Поточний тиждень'
			: weekDiff > 0
				? `Тиждень +${weekDiff}`
				: `Тиждень ${weekDiff}`;

	const breadcrumbItems = useBreadcrumbs({
		parent: { name: weekLabel, url: backHref },
	});

	if (loading) {
		return <Loader />;
	}

	if (error) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="text-destructive text-center">
					<p className="text-lg font-medium">Помилка завантаження даних</p>
					<p className="text-muted-foreground mt-2">{error.message}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<Breadcrumb items={breadcrumbItems} />
			<MetaData
				title={METADATA_CONFIG.titles.shoppingList}
				description={METADATA_CONFIG.descriptions.shoppingList}
				keywords={METADATA_CONFIG.keywords.shoppingList}
				type="website"
			/>

			<PageTitle
				title="Список покупок"
				subtitle={
					totalCount > 0
						? `${totalCount} ${totalCount === 1 ? 'продукт' : totalCount < 5 ? 'продукти' : 'продуктів'}${checkedCount > 0 ? ` • ${checkedCount} відмічено` : ''}`
						: 'Додайте страви до планувальника меню'
				}
				buttonVisible={true}
				buttonText="Експорт"
				onClick={handleExport}
				buttonDisable={totalCount === 0}
			/>

			<ShoppingListContent plannerItemsData={plannerItemsData} />
		</div>
	);
};

export default ShoppingList;
