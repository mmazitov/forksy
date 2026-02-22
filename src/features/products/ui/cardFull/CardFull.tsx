import { LuFlame } from 'react-icons/lu';

import { useDeleteProduct } from '../../hooks';
import Image from '../Image';
import Header from './Header';
import Nutrition from './Nutrition';

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/shared/components/ui/card';

interface CardFullProps {
	id: string;
	name: string;
	description?: string | null;
	category?: string | null;
	imageUrl?: string | null;
	calories?: number | null;
	protein?: number | null;
	fat?: number | null;
	carbs?: number | null;
	isAdmin?: boolean;
	userId?: string | null;
	currentUserId?: string;
	isFavorite?: boolean | null;
}

const CardFull = ({
	id,
	name,
	description,
	category,
	imageUrl,
	calories,
	protein,
	fat,
	carbs,
	isAdmin = false,
	userId,
	currentUserId,
	isFavorite: initialIsFavorite = false,
}: CardFullProps) => {
	const canEdit = Boolean(
		isAdmin || (userId && currentUserId && userId === currentUserId),
	);

	const { handleDelete, loading: deleteLoading } = useDeleteProduct(id);

	return (
		<div className="relative grid grid-cols-1 gap-8 lg:grid-cols-2">
			{/* Image */}
			<Image
				id={id}
				name={name}
				imageUrl={imageUrl}
				isFavorite={initialIsFavorite}
				variant="full"
			/>

			{/* Info */}
			<div className="space-y-6">
				<Header
					name={name}
					category={category}
					description={description}
					canEdit={canEdit}
					handleDelete={handleDelete}
					deleteLoading={deleteLoading}
				/>

				{/* Nutrition Facts */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<LuFlame className="text-secondary h-5 w-5" />
							Поживна цінність (на 100г)
						</CardTitle>
					</CardHeader>
					<CardContent>
						<Nutrition
							calories={calories}
							protein={protein}
							fat={fat}
							carbs={carbs}
						/>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default CardFull;
