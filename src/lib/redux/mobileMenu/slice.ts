import { createSlice } from '@reduxjs/toolkit';

const menuSlice = createSlice({
	name: 'menu',
	initialState: {
		isOpen: false,
	},
	reducers: {
		toggleMenu: (state, action: { payload: boolean }) => {
			state.isOpen = action.payload;
			if (action.payload) {
				document.body.style.overflow = 'hidden';
			} else {
				document.body.style.overflow = 'unset';
			}
		},
	},
});

export const { toggleMenu } = menuSlice.actions;
export default menuSlice.reducer;
