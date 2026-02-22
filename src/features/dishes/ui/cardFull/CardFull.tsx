import { useDeleteDish } from '../../hooks';
import Image from '../Image';
import Header from './Header';
import Ingredients from './Ingredients';
import Instructions from './Instructions';
import Nutrition from './Nutrition';

import { Separator } from '@/shared/components';
import { Ingredient } from '@/shared/types';

interface CardFullProps {
	id: string;
	name: string;
	description?: string | null;
	category?: string | null;
	imageUrl?: string | null;
	prepTime?: number | null;
	servings?: number | null;
	calories?: number | null;
	protein?: number | null;
	fat?: number | null;
	carbs?: number | null;
	ingredients: Ingredient[];
	instructions: string[];
	isAdmin?: boolean;
	userId?: string;
	currentUserId?: string;
	isFavorite?: boolean | null;
}

const CardFull = ({
	id,
	name,
	description,
	category,
	imageUrl,
	prepTime,
	calories,
	protein,
	fat,
	carbs,
	ingredients,
	instructions,
	isAdmin = false,
	userId,
	currentUserId,
	isFavorite: initialIsFavorite = false,
}: CardFullProps) => {
	const canEdit = Boolean(
		isAdmin || (userId && currentUserId && userId === currentUserId),
	);

	const { handleDelete, loading: deleteLoading } = useDeleteDish(id);

	return (
		<>
			<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
				{/* Main Content */}
				<div className="space-y-4 lg:col-span-2">
					<Image
						id={id}
						name={name}
						imageUrl={imageUrl}
						isFavorite={initialIsFavorite}
						variant="full"
					/>

					<Header
						name={name}
						category={category}
						description={description}
						prepTime={prepTime}
						canEdit={canEdit}
						handleDelete={handleDelete}
						deleteLoading={deleteLoading}
					/>

					<Separator />

					<Ingredients ingredients={ingredients} />

					<Instructions instructions={instructions} />
				</div>

				<Nutrition
					calories={calories}
					protein={protein}
					fat={fat}
					carbs={carbs}
				/>
			</div>
		</>
	);
};

export default CardFull;
