import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface IModalState {
	isSignIn: boolean;
	isSignUp: boolean;
}
const initialState = {
	isSignIn: false,
	isSignUp: false,
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
	},
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
