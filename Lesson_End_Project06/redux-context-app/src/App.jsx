import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMatches } from './store/matchSlice';
import { ThemeContext } from './context/ThemeContext';
const App = () => {
	const dispatch = useDispatch();
	const { matches, status, error } = useSelector((state) => state.match);
	const { dark, toggleTheme } = useContext(ThemeContext);
	useEffect(() => {
		dispatch(fetchMatches());
	}, [dispatch]);
	return (
		<div
			style={{
				backgroundColor: dark ? '#111' : '#fff',
				color: dark ? '#fff' : '#000',
				padding: '20px',
			}}
		>
			<h1>Sports Dashboard</h1>
			<button onClick={toggleTheme}>Toggle Theme</button>
			<h2>Live Matches</h2>
			{status === 'loading' && <p>Loading...</p>}
			{status === 'failed' && <p>Error: {error}</p>}
			{status === 'succeeded' && (
				<ul>
					{matches.map((match, index) => (
						<li key={index}>
							{match.teamA} vs {match.teamB} - {match.score}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
export default App;
