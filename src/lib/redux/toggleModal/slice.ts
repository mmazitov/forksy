import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { Product } from '@/lib/types/store';

type ModalTypes = 'isSignIn' | 'isSignUp' | 'isProductEdit';

interface ModalStateProps {
	isSignIn: boolean;
	isSignUp: boolean;
	isProductEdit: boolean;
	currentProduct: Product | null;
}

const initialState: ModalStateProps = {
	isSignIn: false,
	isSignUp: false,
	isProductEdit: false,
	currentProduct: null,
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal: (state, action: PayloadAction<ModalTypes>) => {
			state[action.payload] = true;
		},
		closeModal: (state, action: PayloadAction<ModalTypes>) => {
			state[action.payload] = false;
		},
		setCurrentProduct: (state, action: PayloadAction<Product | null>) => {
			state.currentProduct = action.payload;
		},
	},
});

export const { openModal, closeModal, setCurrentProduct } = modalSlice.actions;

export default modalSlice.reducer;
