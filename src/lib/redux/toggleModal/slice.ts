import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface IModalState {
	isSignIn: boolean;
	isSignUp: boolean;
	isProductEdit: boolean;
	currentProduct: any | null;
}

const initialState = {
	isSignIn: false,
	isSignUp: false,
	isProductEdit: false,
	currentProduct: null,
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal: (state, action: PayloadAction<keyof IModalState>) => {
			state[action.payload] = true;
		},
		closeModal: (state, action: PayloadAction<keyof IModalState>) => {
			state[action.payload] = false;
		},
		setCurrentProduct: (state, action) => {
			state.currentProduct = action.payload;
		},
	},
});

export const { openModal, closeModal, setCurrentProduct } = modalSlice.actions;

export default modalSlice.reducer;
