import React from 'react';
const TaskItem = ({ task, index, onToggle, onDelete }) => {
	return (
		<li>
			<input
				type='checkbox'
				checked={task.completed}
				onChange={() => onToggle(index)}
			/>
			<span className={task.completed ? 'completed' : ''}>
				{task.task}
			</span>
			<button onClick={() => onDelete(index)}>Remove</button>
		</li>
	);
};
export default TaskItem;
