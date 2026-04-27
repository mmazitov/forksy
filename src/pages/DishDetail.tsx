import { useParams } from 'react-router-dom';

import { useAuthContext } from '@/features/auth';
import { CardFull } from '@/features/dishes';
import { useDishByNameQuery } from '@/shared/api/graphql';
import {
	Breadcrumb,
	Loader,
	MetaData,
	SchemaOrg,
} from '@/shared/components';
import { fromSlug } from '@/shared/lib/utils/slug';
import { generateRecipeSchema } from '@/shared/lib/utils/schemaOrg';

const DishDetail = () => {
	const { isAdmin, user } = useAuthContext();
	const { id } = useParams<{ id: string }>();
	const dishName = id ? fromSlug(id) : '';

	const { data, loading, error } = useDishByNameQuery({
		variables: { name: dishName },
		skip: !dishName,
	});

	if (loading) {
		return <Loader />;
	}

	if (error || !data?.dishByName) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="rounded-lg bg-red-50 p-4 text-red-600">
					Продукт не знайдено
				</div>
			</div>
		);
	}

	const dish = data.dishByName;

	// Generate Recipe Schema.org markup
	const recipeSchema = generateRecipeSchema({
		name: dish.name,
		description: dish.description ?? 'Смачна страва від Mealvy',
		image: dish.imageUrl ?? 'https://mealvy.vercel.app/icon-512.png',
		prepTime: `PT${dish.prepTime ?? 0}M`,
		cookTime: 'PT0M',
		servings: dish.servings ?? 1,
		calories: dish.calories ?? 0,
		ingredients:
			dish.ingredients?.map((ing) => `${ing.name} - ${ing.amount}`) ?? [],
		instructions: dish.instructions ?? [],
	});

	const breadcrumbItems = [
		{ name: 'Головна', url: '/' },
		{ name: 'Страви', url: '/dishes' },
		{ name: dish.name, url: `/dishes/${id}` },
	];

	return (
		<div className="container mx-auto px-4 py-8">
			<MetaData
				title={dish.name}
				description={dish.description ?? ''}
				keywords={[
					'рецепт',
					'страва',
					'готування',
					dish.name,
					dish.category ?? '',
				]}
				type="article"
			/>
			<SchemaOrg schema={recipeSchema} />
			<Breadcrumb items={breadcrumbItems} />

			<CardFull
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
