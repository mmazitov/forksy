'use client';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const SearchBar = () => {
	const [query, setQuery] = useState('');
	const router = useRouter();

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (query.trim()) {
			router.push(`/search?q=${encodeURIComponent(query.trim())}`);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-lg">
			<div className="flex-grow">
				<Input
					type="text"
					name="search"
					placeholder="Что вы ищете?"
					value={query}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setQuery(e.target.value)
					}
					showIcon={true}
					icon={<FaSearch />}
				/>
			</div>
			<Button type="submit" className="min-w-[100px]">
				Поиск
			</Button>
		</form>
	);
};

export default SearchBar;
