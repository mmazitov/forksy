'use client';

import { useState } from 'react';

import ProductAddForm from '@/components/forms/ProductAddForm';
import PageHeader from '@/components/heading/PageHeader';
import NutritionSearch from '@/components/search/NutritionSearch';
import withAuthClient from '@/lib/hoc/withAuthClient';
import { NutritionData } from '@/lib/types/nutrition';

const ProductsAdd = () => {
	const [selectedNutrition, setSelectedNutrition] = useState<NutritionData>();

	return (
		<section>
			<PageHeader pageTitle="Додати продукт" />
			<NutritionSearch onNutritionSelect={setSelectedNutrition} />
			<ProductAddForm selectedNutrition={selectedNutrition} />
		</section>
	);
};

export default withAuthClient(ProductsAdd);
