import {
	ShoppingListContent,
	useShoppingListPage,
} from '@/features/shoppingList';
import { BackButton, Loader, MetaData, PageTitle } from '@/shared/components';
import { METADATA_CONFIG } from '@/shared/lib/config';

const ShoppingList = () => {
	const {
		loading,
		error,
		plannerItemsData,
		checkedCount,
		totalCount,
		handleExport,
		backHref,
	} = useShoppingListPage();

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
			<MetaData
				title={METADATA_CONFIG.titles.shoppingList}
				description={METADATA_CONFIG.descriptions.shoppingList}
				keywords={METADATA_CONFIG.keywords.shoppingList}
				type="website"
			/>
			<BackButton
				title="До планувальника"
				href={backHref}
				ctaButton={true}
				ctaButtonText="Експорт"
				ctaButtonClick={handleExport}
				ctaButtonDisabled={totalCount === 0}
			/>

			<PageTitle
				title="Список покупок"
				buttonVisible={false}
				subtitle={
					totalCount > 0
						? `${totalCount} ${totalCount === 1 ? 'продукт' : totalCount < 5 ? 'продукти' : 'продуктів'}${checkedCount > 0 ? ` • ${checkedCount} відмічено` : ''}`
						: 'Додайте страви до планувальника меню'
				}
			/>

			<ShoppingListContent plannerItemsData={plannerItemsData} />
		</div>
	);
};

export default ShoppingList;
