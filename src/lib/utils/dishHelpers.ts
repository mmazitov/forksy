import { toast } from 'sonner';

import { FormIngredient } from '@/types';

export interface PreparedFormData {
	filteredIngredients: Array<{ name: string; amount: string }>;
	filteredInstructions: string[];
}

export const prepareDishFormData = (
	ingredientsList: { items: FormIngredient[] },
	instructionsList: { items: string[] },
): PreparedFormData | null => {
	const filteredIngredients = ingredientsList.items
		.filter((i) => i.name.trim())
		.map((i) => ({ name: i.name, amount: i.amount || '' }));

	const filteredInstructions = instructionsList.items.filter((i) => i.trim());

	if (filteredIngredients.length === 0) {
		toast.error('Додайте хоча б один інгредієнт');
		return null;
	}

	if (filteredInstructions.length === 0) {
		toast.error('Додайте хоча б один крок приготування');
		return null;
	}

	return { filteredIngredients, filteredInstructions };
};
