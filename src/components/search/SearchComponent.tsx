import { Input } from '@/components';
import { Search } from 'lucide-react';

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
			<Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
			<Input
				placeholder={searchPlaceholder}
				value={searchQuery}
				onChange={(e) => onSearchChange(e.target.value)}
				className="pl-10"
			/>
		</div>
	);
};

export default SearchComponent;
