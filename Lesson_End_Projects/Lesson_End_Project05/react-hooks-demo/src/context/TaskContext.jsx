import { createContext, useContext, useReducer } from 'react';
const TaskContext = createContext();
const reducer = (state, action) => {
	switch (action.type) {
		case 'ADD':
			return [...state, action.payload];
		case 'REMOVE':
			return state.filter((_, i) => i !== action.payload);
		default:
			return state;
	}
};
export function TaskProvider({ children }) {
	const [tasks, dispatch] = useReducer(reducer, []);
	return (
		<TaskContext.Provider value={{ tasks, dispatch }}>
			{children}
		</TaskContext.Provider>
	);
}
export const useTaskContext = () => useContext(TaskContext);
