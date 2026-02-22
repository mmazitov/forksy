import { Link } from 'react-router-dom';

import Image from '../Image';
import Footer from './Footer';
import Title from './Title';

import { Card, CardContent, CardFooter } from '@/shared/components';
import { createSlug } from '@/shared/lib/utils';

interface CardCompactProps {
	id: string;
	name: string;
	category?: string | null;
	imageUrl?: string | null;
	calories?: number | null;
	prepTime?: number | null;
	description?: string | null;
	userId?: string | null;
	currentUserId?: string;
	isFavorite?: boolean | null;
}

const CardCompact = ({
	id,
	name,
	category,
	description,
	imageUrl,
	calories,
	prepTime,
	isFavorite: initialIsFavorite = false,
}: CardCompactProps) => {
	return (
		<Link to={`/dish/${createSlug(name)}`}>
			<Card className="group flex h-full cursor-pointer flex-col justify-between gap-2 overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
				<CardContent className="flex flex-col gap-2 p-0">
					<Image
						id={id}
						name={name}
						imageUrl={imageUrl}
						isFavorite={initialIsFavorite}
					/>
					<Title name={name} category={category} description={description} />
				</CardContent>
				<CardFooter className="text-muted-foreground flex gap-2 px-4 text-sm">
					<Footer calories={calories} prepTime={prepTime} />
				</CardFooter>
			</Card>
		</Link>
	);
};

export default CardCompact;
