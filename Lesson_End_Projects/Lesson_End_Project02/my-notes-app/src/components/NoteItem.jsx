import React from 'react';
const NoteItem = ({ note, index, onDelete }) => {
	return (
		<div style={styles.note}>
			{note.text}
			<button style={styles.button} onClick={() => onDelete(index)}>
				Delete
			</button>
		</div>
	);
};
const styles = {
	note: {
		display: 'flex',
		justifyContent: 'space-between',
		background: '#f4f4f4',
		padding: '10px',
		margin: '5px 0',
		borderRadius: '5px',
	},
	button: {
		background: 'red',
		color: '#fff',
		border: 'none',
		padding: '5px 10px',
		cursor: 'pointer',
	},
};
export default NoteItem;
