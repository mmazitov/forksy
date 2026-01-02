import { Input } from '@/components';
import { LuDelete, LuSearch } from 'react-icons/lu';

interface SearchComponentProps {
	searchQuery: string;
	onSearchChange: (query: string) => void;
	searchPlaceholder?: string;
}

const SearchComponent = ({
	searchQuery,
	onSearchChange,
	searchPlaceholder = 'Пошук...',
}: SearchComponentProps) => {
	return (
		<div className="relative mb-6">
			<LuSearch className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground z-10" />
			<Input
				placeholder={searchPlaceholder}
				value={searchQuery}
				onChange={(e) => onSearchChange(e.target.value)}
				className="pl-10"
			/>
			{searchQuery && (
				<button
					className="absolute top-1/2 right-3 transform -translate-y-1/2 text-muted-foreground hover:text-foreground z-10 cursor-pointerw"
					onClick={() => onSearchChange('')}
					aria-label="Clear search"
				>
					<LuDelete className="w-4 h-4" />
				</button>
			)}
		</div>
	);
};

export default SearchComponent;
