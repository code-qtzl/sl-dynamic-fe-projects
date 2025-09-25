import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';
function App() {
	const [tasks, setTasks] = useState([]);
	useEffect(() => {
		const storedTasks = JSON.parse(localStorage.getItem('tasks'));
		if (storedTasks) setTasks(storedTasks);
	}, []);
	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}, [tasks]);
	const addTask = (task) => {
		setTasks([...tasks, { task, completed: false }]);
	};
	const toggleTask = (index) => {
		const updatedTasks = [...tasks];
		updatedTasks[index].completed = !updatedTasks[index].completed;
		setTasks(updatedTasks);
	};
	const removeTask = (index) => {
		setTasks(tasks.filter((_, i) => i !== index));
	};
	return (
		<div className='App'>
			<h1>Todo List</h1>
			<TaskForm onAddTask={addTask} />
			<TaskList
				tasks={tasks}
				onToggle={toggleTask}
				onDelete={removeTask}
			/>
		</div>
	);
}
export default App;
