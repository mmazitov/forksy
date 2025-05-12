'use client';

import { useEffect, useState } from 'react';

import { NutritionData } from '@/@types/types';
import ProductAddForm from '@/components/forms/ProductAddForm';
import PageHeader from '@/components/heading/PageHeader';
import NutritionSearch from '@/components/search/NutritionSearch';
import withAuthClient from '@/lib/hoc/withAuthClient';

const ProductsAdd = () => {
	const [mounted, setMounted] = useState(false);
	const [selectedNutrition, setSelectedNutrition] = useState<NutritionData>();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return <div className="py-8">Loading...</div>;
	}

	return (
		<section>
			<PageHeader pageTitle="Додати продукт" />
			<NutritionSearch onNutritionSelect={setSelectedNutrition} />
			<ProductAddForm selectedNutrition={selectedNutrition} />
		</section>
	);
};

export default withAuthClient(ProductsAdd);
