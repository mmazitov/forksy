import { LuDelete, LuSearch } from 'react-icons/lu';

import { Input } from '@/shared/components';

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
			<LuSearch
				className="text-muted-foreground absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2 transform"
				aria-hidden="true"
			/>
			<Input
				placeholder={searchPlaceholder}
				value={searchQuery}
				onChange={(e) => onSearchChange(e.target.value)}
				className="pl-10"
				aria-label="Пошук"
			/>
			{searchQuery && (
				<button
					className="text-muted-foreground hover:text-foreground cursor-pointerw absolute top-1/2 right-3 z-10 -translate-y-1/2 transform"
					onClick={() => onSearchChange('')}
					aria-label="Clear search"
				>
					<LuDelete className="h-4 w-4" />
				</button>
			)}
		</div>
	);
};

export default SearchComponent;
