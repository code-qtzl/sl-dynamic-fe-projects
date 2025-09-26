import { useReducer, useEffect } from 'react';
const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_NUMBER':
			return { number: action.payload };
		default:
			return state;
	}
};
export default function useRandomNumber() {
	const [state, dispatch] = useReducer(reducer, { number: null });
	useEffect(() => {
		const id = setInterval(() => {
			const random = Math.floor(Math.random() * 100) + 1;
			dispatch({ type: 'SET_NUMBER', payload: random });
		}, 1000);
		return () => clearInterval(id);
	}, []);
	return state.number;
}
