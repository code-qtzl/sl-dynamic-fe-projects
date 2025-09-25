import React, { useState } from 'react';
import Notes from './components/Notes';
const App = () => {
	const [data, setData] = useState([]); // State to store notes
	const [inputText, setInputText] = useState(''); // State for input field
	const [message, setMessage] = useState(''); // State for status messages
	// Function to handle adding a note
	const handleAddNote = () => {
		if (inputText.trim() !== '') {
			setData([...data, { text: inputText }]);
			setInputText('');
			setMessage('Note added successfully ✅');
			// Clear message after 2 seconds
			setTimeout(() => setMessage(''), 2000);
		}
	};
	// Function to handle deleting a note
	const handleDelete = (index) => {
		setData(data.filter((_, i) => i !== index));
		setMessage('Note deleted successfully ❌');
		// Clear message after 2 seconds
		setTimeout(() => setMessage(''), 2000);
	};
	// Inline styles object
	const styles = {
		container: {
			textAlign: 'center',
			maxWidth: '500px',
			margin: 'auto',
			padding: '20px',
			fontFamily: 'Arial, sans-serif',
		},
		inputContainer: {
			display: 'flex',
			gap: '10px',
			justifyContent: 'center',
			marginBottom: '20px',
		},
		input: {
			padding: '8px',
			width: '70%',
			fontSize: '16px',
		},
		addButton: {
			padding: '8px 15px',
			backgroundColor: 'green',
			color: 'white',
			border: 'none',
			cursor: 'pointer',
		},
		statusMessage: {
			fontWeight: 'bold',
			color: 'blue',
		},
	};
	return (
		<div style={styles.container}>
			<h1>React Notes App</h1>
			{/* Conditional rendering for status messages */}
			{message && <p style={styles.statusMessage}>{message}</p>}
			<div style={styles.inputContainer}>
				<input
					type='text'
					value={inputText}
					onChange={(e) => setInputText(e.target.value)}
					placeholder='Enter a note'
					style={styles.input}
				/>
				<button onClick={handleAddNote} style={styles.addButton}>
					Add Note
				</button>
			</div>
			{/* Pass props to Notes component */}
			<Notes data={data} onDelete={handleDelete} />
		</div>
	);
};
export default App;
