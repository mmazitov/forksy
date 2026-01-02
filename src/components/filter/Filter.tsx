import { Tabs, TabsList, TabsTrigger } from '@/components';

interface Category {
	id: string | number;
	name: string;
}

interface FilterProps {
	selectedCategory: string;
	onCategoryChange: (category: string) => void;
	categories: Category[];
	tabListClassName?: string;
}

const Filter = ({
	selectedCategory,
	onCategoryChange,
	categories,
	tabListClassName,
}: FilterProps) => {
	return (
		<Tabs value={selectedCategory} onValueChange={onCategoryChange}>
			<TabsList
				className={`justify-start w-full overflow-x-auto ${tabListClassName}`}
			>
				{categories.map((category) => (
					<TabsTrigger key={category.id} value={category.name}>
						{category.name}
					</TabsTrigger>
				))}
			</TabsList>
		</Tabs>
	);
};

export default Filter;
