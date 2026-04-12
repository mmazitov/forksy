import { Link, useLocation } from 'react-router-dom';

import Image from '../Image';
import Footer from './Footer';
import Title from './Title';

import { Card, CardContent, CardFooter } from '@/shared/components/ui/card';
import { createSlug } from '@/shared/lib/utils';

interface CardCompactProps {
	id: string;
	name: string;
	category?: string | null;
	imageUrl?: string | null;
	calories?: number | null;
	protein?: number | null;
	fat?: number | null;
	carbs?: number | null;
	userId?: string;
	currentUserId?: string;
	isFavorite?: boolean | null;
}

const CardCompact = ({
	id,
	name,
	category,
	imageUrl,
	calories,
	protein,
	fat,
	carbs,
	isFavorite: initialIsFavorite = false,
}: CardCompactProps) => {
	const location = useLocation();

	return (
		<Link
			to={`/product/${createSlug(name)}`}
			state={{ from: location.pathname }}
			aria-label={`Переглянути продукт ${name}${category ? `, категорія ${category}` : ''}${calories ? `, ${calories} калорій` : ''}`}
		>
			<Card className="group flex h-full cursor-pointer flex-col justify-between gap-2 overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
				<CardContent className="flex flex-col gap-2 p-0">
					<Image
						id={id}
						name={name}
						imageUrl={imageUrl}
						isFavorite={initialIsFavorite}
					/>
					<Title name={name} category={category} />
				</CardContent>
				<CardFooter className="p-4 pt-0">
					<Footer
						calories={calories}
						protein={protein}
						fat={fat}
						carbs={carbs}
					/>
				</CardFooter>
			</Card>
		</Link>
	);
};

export default CardCompact;
