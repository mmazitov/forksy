import { LuArrowLeft } from 'react-icons/lu';
import { Link, useParams } from 'react-router-dom';

import { Button, CardDishFull, Loader, MetaData } from '@/components';
import { useAuthContext } from '@/hooks';
import { useDishQuery } from '@/lib/graphql';

const DishDetail = () => {
	const { isAdmin, user } = useAuthContext();
	const { id } = useParams<{ id: string }>();
	const { data, loading, error } = useDishQuery({
		variables: { id: id! },
		skip: !id,
	});

	if (loading) {
		return <Loader />;
	}

	if (error || !data?.dish) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="rounded-lg bg-red-50 p-4 text-red-600">
					Продукт не знайдено
				</div>
			</div>
		);
	}

	const dish = data.dish;

	return (
		<div className="container mx-auto px-4 py-8">
			<MetaData
				title={dish.name}
				description={dish.description ?? ''}
				keywords={['recipe', 'dish', 'cooking', dish.name, dish.category ?? '']}
				type="article"
			/>
			<Link to="/dishes">
				<Button variant="ghost" className="mb-6 gap-2">
					<LuArrowLeft className="h-4 w-4" />
					Назад до страв
				</Button>
			</Link>

			<CardDishFull
				id={dish.id}
				name={dish.name}
				description={dish.description}
				category={dish.category}
				imageUrl={dish.imageUrl}
				prepTime={dish.prepTime}
				servings={dish.servings}
				calories={dish.calories}
				protein={dish.protein}
				fat={dish.fat}
				carbs={dish.carbs}
				ingredients={dish.ingredients}
				instructions={dish.instructions}
				isAdmin={isAdmin}
				userId={dish.userId}
				currentUserId={user?.id}
				isFavorite={dish.isFavorite}
			/>
		</div>
	);
};

export default DishDetail;
