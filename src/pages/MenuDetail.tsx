import { useParams } from 'react-router-dom';

import { CardCompact } from '@/features/dishes';
import { useMenuDetail } from '@/features/menus';
import {
	Breadcrumb,
	Card,
	CardContent,
	Filter,
	MetaData,
	PageTitle,
} from '@/shared/components';
import { Grid } from '@/shared/components/grid';
import { Loader } from '@/shared/components/loader';
import { Skeleton } from '@/shared/components/skeleton';
import { useBreadcrumbs, useMenuSchema } from '@/shared/hooks';
import { METADATA_CONFIG } from '@/shared/lib/config';

const MenuDetail = () => {
	const { id } = useParams<{ id: string }>();

	const {
		menu,
		loading,
		error,
		selectedDay,
		setSelectedDay,
		weekDaysForFilter,
		dishesForGrid,
	} = useMenuDetail(id);

	useMenuSchema(menu ?? null);

	const breadcrumbItems = useBreadcrumbs({
		title: loading ? undefined : (menu?.name ?? undefined),
	});

	if (loading) return <Loader />;

	if (error) {
		console.error('[MenuDetail] Failed to load menu:', id, error.message);
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="rounded-lg bg-red-50 p-4 text-red-600">
					Не вдалося завантажити меню. Спробуйте оновити сторінку.
				</div>
			</div>
		);
	}

	if (!menu) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="rounded-lg bg-red-50 p-4 text-red-600">
					Меню не знайдено
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<MetaData
				title={`${menu.name} | ${METADATA_CONFIG.titles.menu}`}
				description={METADATA_CONFIG.descriptions.menu}
				keywords={METADATA_CONFIG.keywords.menu}
				type="website"
			/>
			<Breadcrumb items={breadcrumbItems} />
			<PageTitle
				title={menu.name}
				subtitle={`${menu.totalDishes} страв • ${menu.totalCalories.toLocaleString()} ккал`}
				buttonVisible={false}
			/>
			<div className="space-y-6">
				<Card className="border-border/60 bg-card/50 shadow-sm backdrop-blur-sm">
					<CardContent className="p-4 md:p-6">
						<Filter
							selectedCategory={selectedDay}
							onCategoryChange={setSelectedDay}
							categories={weekDaysForFilter}
							tabListClassName="grid grid-cols-7 w-full gap-1 md:gap-2"
						/>
					</CardContent>
				</Card>

				{dishesForGrid.length > 0 ? (
					<Grid
						items={dishesForGrid}
						itemComponent={CardCompact}
						showEmpty={false}
						isLoading={false}
						skeletonComponent={Skeleton}
						skeletonCount={4}
					/>
				) : (
					<div className="py-12 text-center">
						<p className="text-muted-foreground">
							Немає страв на {selectedDay}
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default MenuDetail;
