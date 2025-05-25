'use client';

import { combineReducers } from '@reduxjs/toolkit';

import menuReducer from './mobileMenu/slice';
import modalReducer from './toggleModal/slice';

const rootReducer = combineReducers({
	modal: modalReducer,
	menuSlice: menuReducer,
});

export default rootReducer;
