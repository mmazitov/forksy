import store from '../redux/store';

export interface Product {
	id: string;
	name: string;
	category: string;
	image?: string;
	calories?: number | null;
	protein?: number | null;
	fat?: number | null;
	carbohydrates?: number | null;
}

export interface ModalState {
	isProductEdit: boolean;
	currentProduct: Product | null;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
