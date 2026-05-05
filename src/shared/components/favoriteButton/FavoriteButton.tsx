import { LuHeart } from 'react-icons/lu';

import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';

interface FavoriteButtonProps {
	isFavorite: boolean;
	onClick: () => void;
	className?: string;
	variant?: 'overlay' | 'inline';
}

const FavoriteButton = ({
	isFavorite,
	onClick,
	className,
	variant = 'overlay',
}: FavoriteButtonProps) => {
	return (
		<Button
			variant={variant === 'inline' ? 'outline' : 'ghost'}
			size={variant === 'inline' ? 'sm' : 'icon'}
			className={cn(
				'transition-all',
				variant === 'overlay' &&
					'bg-background absolute top-2 right-2 z-100 rounded-full shadow-sm backdrop-blur-sm',
				isFavorite && 'text-red-500 hover:text-red-600',
				className,
			)}
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				onClick();
			}}
			aria-label={isFavorite ? 'Видалити з обраного' : 'Додати до обраного'}
		>
			<LuHeart
				className={cn(
					variant === 'inline' ? 'h-4 w-4' : 'h-5 w-5',
					isFavorite && 'fill-current',
				)}
				aria-hidden="true"
			/>
		</Button>
	);
};

export default FavoriteButton;
