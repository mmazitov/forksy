import { LuSearchX } from 'react-icons/lu';

import { useFavoriteDishes } from '../hooks/useFavoriteDishes';
import CardCompact from './cardCompact/CardCompact';

import { Loader } from '@/shared/components';
import { Grid } from '@/shared/components/grid';

const FavoriteDishes = () => {
	const { dishes, loading } = useFavoriteDishes();

	if (loading) {
		return <Loader />;
	}

	if (dishes.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-12 text-center">
				<div className="bg-muted mb-4 rounded-full p-4">
					<LuSearchX className="text-muted-foreground h-8 w-8" />
				</div>
				<h3 className="mb-2 text-xl font-semibold">Список порожній</h3>
				<p className="text-muted-foreground">
					Ви ще не додали жодної страви до улюблених
				</p>
			</div>
		);
	}

	return (
		<Grid
			items={dishes}
			renderItem={(item) => <CardCompact {...item} />}
			showEmpty={false}
		/>
	);
};

export default FavoriteDishes;
