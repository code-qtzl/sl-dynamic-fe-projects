import { configureStore } from '@reduxjs/toolkit';
import matchReducer from './matchSlice';
import userReducer from './userSlice';
const store = configureStore({
	reducer: {
		match: matchReducer,
		user: userReducer,
	},
});
export default store;
