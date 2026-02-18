import { LuHeart } from 'react-icons/lu';

import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';

interface FavoriteButtonProps {
	isFavorite: boolean;
	onClick: () => void;
	className?: string;
}

const FavoriteButton = ({
	isFavorite,
	onClick,
	className,
}: FavoriteButtonProps) => {
	return (
		<Button
			variant="ghost"
			size="icon"
			className={cn(
				'absolute top-2 right-2 z-10 rounded-full bg-white/80 shadow-sm backdrop-blur-sm transition-all hover:bg-white',
				isFavorite && 'text-red-500 hover:text-red-600',
				className,
			)}
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				onClick();
			}}
		>
			<LuHeart className={cn('h-5 w-5', isFavorite && 'fill-current')} />
		</Button>
	);
};

export default FavoriteButton;
