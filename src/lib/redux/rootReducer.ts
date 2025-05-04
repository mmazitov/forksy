'use client';

import { combineReducers } from '@reduxjs/toolkit';

import modalReducer from './toggleModal/slice';

const rootReducer = combineReducers({
	modal: modalReducer,
});

export default rootReducer;
