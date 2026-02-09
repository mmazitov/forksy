import { Link } from 'react-router-dom';

import Footer from './Footer';
import Image from './Image';
import Title from './Title';

import { Card, CardContent, CardFooter } from '@/components';
import { createSlug } from '@/lib/utils';

interface CardDishCompactProps {
	id: string;
	name: string;
	category: string;
	imageUrl?: string;
	calories?: number;
	prepTime?: number;
	description?: string;
	userId?: string | null;
	currentUserId?: string;
	isFavorite?: boolean | null;
}

const CardDishCompact = ({
	id,
	name,
	category,
	description,
	imageUrl,
	calories,
	prepTime,
	isFavorite: initialIsFavorite = false,
}: CardDishCompactProps) => {
	return (
		<Link to={`/dish/${createSlug(name)}`}>
			<Card className="group flex h-full cursor-pointer flex-col justify-between gap-4 overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
				<CardContent className="flex flex-col gap-4 p-0">
					<Image
						id={id}
						name={name}
						imageUrl={imageUrl}
						isFavorite={initialIsFavorite}
					/>
					<Title name={name} category={category} description={description} />
				</CardContent>
				<CardFooter className="text-muted-foreground flex gap-4 px-4 text-sm">
					<Footer calories={calories} prepTime={prepTime} footerType="dish" />
				</CardFooter>
			</Card>
		</Link>
	);
};

export default CardDishCompact;
