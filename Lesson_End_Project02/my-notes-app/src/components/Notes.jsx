import React from 'react';
import NoteItem from './NoteItem';
const Notes = ({ data, onDelete }) => {
	return (
		<div>
			{data.length === 0 ? (
				<p style={styles.message}>No notes available</p>
			) : (
				data.map((note, index) => (
					<NoteItem
						key={index}
						note={note}
						index={index}
						onDelete={onDelete}
					/>
				))
			)}
		</div>
	);
};
const styles = {
	message: {
		textAlign: 'center',
		fontStyle: 'italic',
		color: 'gray',
	},
};
export default Notes;
