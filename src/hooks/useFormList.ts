import { useCallback, useState } from 'react';

export interface Ingredient {
	name: string;
	amount: string;
	productId?: string;
}

export const useFormList = <T extends object | string>(
	initialItem: T,
	initialItems?: T[],
) => {
	const [items, setItems] = useState<T[]>(
		initialItems && initialItems.length > 0 ? initialItems : [initialItem],
	);

	const addItem = useCallback(() => {
		setItems((prev) => [...prev, initialItem]);
	}, [initialItem]);

	const removeItem = useCallback((index: number) => {
		setItems((prev) => prev.filter((_, i) => i !== index));
	}, []);

	const updateItem = useCallback((index: number, updates: T | Partial<T>) => {
		setItems((prev) => {
			const newItems = [...prev];
			if (typeof updates === 'string' || typeof updates === 'number') {
				newItems[index] = updates as T;
			} else if (
				typeof newItems[index] === 'object' &&
				newItems[index] !== null
			) {
				newItems[index] = {
					...(newItems[index] as object),
					...(updates as object),
				} as T;
			}
			return newItems;
		});
	}, []);

	return {
		items,
		addItem,
		removeItem,
		updateItem,
		setItems,
	};
};
