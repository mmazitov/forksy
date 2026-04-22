import { useNavigate, useParams } from 'react-router-dom';
import { LuArrowLeft } from 'react-icons/lu';

import { useSavedMenuQuery } from '@/shared/api/graphql';
import { Button, MetaData, PageTitle } from '@/shared/components';
import { Loader } from '@/shared/components/loader';
import { METADATA_CONFIG } from '@/shared/lib/config';

const MenuDetail = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const { data, loading, error } = useSavedMenuQuery({
		variables: { id: id! },
		skip: !id,
	});

	if (loading) {
		return <Loader />;
	}

	if (error || !data?.savedMenu) {
		return (
			<div className="container mx-auto px-4 py-8">
				<Button
					variant="ghost"
					size="sm"
					onClick={() => navigate(-1)}
					className="mb-4"
				>
					<LuArrowLeft className="mr-2 h-4 w-4" />
					Назад
				</Button>
				<div className="text-center">
					<h2 className="text-2xl font-bold">Меню не знайдено</h2>
					<p className="text-muted-foreground mt-2">
						{error?.message || 'Меню з таким ID не існує'}
					</p>
				</div>
			</div>
		);
	}

	const menu = data.savedMenu;

	const getWeekLabel = (weekNum: number) => {
		if (weekNum === 0) return 'Поточний тиждень';
		if (weekNum > 0) return `Тиждень +${weekNum}`;
		return `Тиждень ${weekNum}`;
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<MetaData
				title={`${menu.name} | ${METADATA_CONFIG.titles.menu}`}
				description={METADATA_CONFIG.descriptions.menu}
				keywords={METADATA_CONFIG.keywords.menu}
				type="website"
			/>

			<Button
				variant="ghost"
				size="sm"
				onClick={() => navigate(-1)}
				className="mb-4"
			>
				<LuArrowLeft className="mr-2 h-4 w-4" />
				Назад
			</Button>

			<PageTitle
				title={menu.name}
				subtitle={`${getWeekLabel(menu.weekNumber)} • ${menu.totalDishes} страв • ${menu.totalCalories.toLocaleString()} ккал`}
				buttonVisible={false}
			/>

			<div className="mt-6">
				<p className="text-muted-foreground">
					Детальний перегляд меню буде реалізовано в наступній ітерації
				</p>
			</div>
		</div>
	);
};

export default MenuDetail;
