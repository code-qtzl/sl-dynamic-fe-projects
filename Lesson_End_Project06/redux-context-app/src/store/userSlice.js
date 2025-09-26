import { createSlice } from '@reduxjs/toolkit';
const userSlice = createSlice({
	name: 'user',
	initialState: { loggedIn: true, username: 'JohnDoe' },
	reducers: {
		logout: (state) => {
			state.loggedIn = false;
		},
	},
});
export const { logout } = userSlice.actions;
export default userSlice.reducer;
