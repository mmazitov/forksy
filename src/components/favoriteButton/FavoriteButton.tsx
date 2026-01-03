import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';

import { Button } from '@/components';

interface FavoriteButtonProps {
	isFavorite: boolean;
	onClick: (e?: React.MouseEvent) => void;
	className?: string;
}

const FavoriteButton = ({
	isFavorite,
	onClick,
	className = '',
}: FavoriteButtonProps) => {
	return (
		<Button
			variant="ghost"
			size="icon"
			className={`bg-background/80 hover:bg-background dark:bg-background/60 dark:hover:bg-background/80 absolute top-2 right-2 z-10 shadow-md backdrop-blur-sm transition-all hover:scale-110 ${className}`}
			onClick={onClick}
		>
			{isFavorite ? (
				<MdOutlineFavorite className="h-5 w-5 text-red-500" />
			) : (
				<MdOutlineFavoriteBorder className="text-muted-foreground h-5 w-5 hover:text-red-500" />
			)}
		</Button>
	);
};

export default FavoriteButton;
