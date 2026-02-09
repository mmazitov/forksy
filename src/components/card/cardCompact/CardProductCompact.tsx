import { Link } from 'react-router-dom';

import Footer from './Footer';
import Image from './Image';
import Title from './Title';

import { Card, CardContent, CardFooter } from '@/components';

interface CardProductCompactProps {
	id: string;
	name: string;
	category?: string | null;
	imageUrl?: string | null;
	calories?: number;
	protein?: number;
	fat?: number;
	carbs?: number;
	userId?: string;
	currentUserId?: string;
	isFavorite?: boolean | null;
}

const CardProductCompact = ({
	id,
	name,
	category,
	imageUrl,
	calories,
	protein,
	fat,
	carbs,
	isFavorite: initialIsFavorite = false,
}: CardProductCompactProps) => {
	return (
		<Link to={`/product/${id}`}>
			<Card className="group flex h-full cursor-pointer flex-col gap-4 overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
				<CardContent className="flex flex-col gap-4 p-0">
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

export default CardProductCompact;
