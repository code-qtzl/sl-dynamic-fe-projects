import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const fetchMatches = createAsyncThunk('match/fetchMatches', async () => {
	const response = await axios.get(
		'https://jsonplaceholder.typicode.com/posts?_limit=5',
	);
	return response.data.map((post) => ({
		teamA: post.title,
		teamB: 'Opponent',
		score: '0 - 0',
	}));
});
const matchSlice = createSlice({
	name: 'match',
	initialState: { matches: [], status: 'idle', error: null },
	extraReducers: (builder) => {
		builder
			.addCase(fetchMatches.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchMatches.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.matches = action.payload;
			})
			.addCase(fetchMatches.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});
export default matchSlice.reducer;
