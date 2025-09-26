import { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
export default function TaskManager() {
	const [task, setTask] = useState('');
	const { tasks, dispatch } = useTaskContext();
	const addTask = () => {
		if (task.trim() !== '') {
			dispatch({ type: 'ADD', payload: task });
			setTask('');
		}
	};
	const removeTask = (index) => dispatch({ type: 'REMOVE', payload: index });
	return (
		<div>
			<h2>Task Manager</h2>
			<input value={task} onChange={(e) => setTask(e.target.value)} />
			<button onClick={addTask}>Add Task</button>
			<ul>
				{tasks.map((t, i) => (
					<li key={i}>
						{t}{' '}
						<button onClick={() => removeTask(i)}>Remove</button>
					</li>
				))}
			</ul>
		</div>
	);
}
