import { useCallback, useRef, useState } from 'react';

let _idCounter = 0;
const nextId = () => String(++_idCounter);

const makeIds = (count: number) => Array.from({ length: count }, nextId);

export const useFormList = <T extends object | string>(
	initialItem: T,
	initialItems?: T[],
) => {
	const initialCount =
		initialItems && initialItems.length > 0 ? initialItems.length : 1;

	const [items, setItems] = useState<T[]>(
		initialItems && initialItems.length > 0 ? initialItems : [initialItem],
	);

	const idsRef = useRef<string[]>(makeIds(initialCount));

	const addItem = useCallback(() => {
		idsRef.current = [...idsRef.current, nextId()];
		setItems((prev) => [...prev, initialItem]);
	}, [initialItem]);

	const removeItem = useCallback((index: number) => {
		idsRef.current = idsRef.current.filter((_, i) => i !== index);
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

	const setItemsWithIds = useCallback((newItems: T[]) => {
		idsRef.current = makeIds(newItems.length);
		setItems(newItems);
	}, []);

	return {
		items,
		ids: idsRef.current,
		addItem,
		removeItem,
		updateItem,
		setItems: setItemsWithIds,
	};
};
