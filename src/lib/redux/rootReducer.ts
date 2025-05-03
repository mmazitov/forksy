'use client';

import { combineReducers } from '@reduxjs/toolkit';

import modalReducer from './toggleModal/slice';

const dummyReducer = (state = {}, action: any) => {
	return state;
};

const rootReducer = combineReducers({
	dummy: dummyReducer,
	modal: modalReducer,
});

export default rootReducer;
