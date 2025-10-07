import React, { useState } from 'react';
import axios from 'axios';

function AddEmployee() {
	const [employee, setEmployee] = useState({
		name: '',
		lname: '',
		department: '',
		position: '',
		email: '',
		phone: '',
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [message, setMessage] = useState('');

	// Test connection to server
	const testConnection = async () => {
		try {
			const response = await axios.get('http://localhost:3000/employees');
			setMessage(
				`Server connection successful! Found ${response.data.length} employees in database.`,
			);
		} catch (error) {
			setMessage(
				'Unable to connect to server. Please make sure JSON Server is running on port 3000.',
			);
			console.error('Connection test failed:', error);
		}
	};

	const handleChange = (e) => {
		setEmployee({
			...employee,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		setMessage('');

		// Validation
		const requiredFields = [
			'name',
			'lname',
			'department',
			'position',
			'email',
			'phone',
		];
		for (const field of requiredFields) {
			if (!employee[field] || employee[field].toString().trim() === '') {
				setMessage(
					`Please fill in the ${field
						.replace(/([A-Z])/g, ' $1')
						.toLowerCase()} field.`,
				);
				setIsSubmitting(false);
				return;
			}
		}

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(employee.email)) {
			setMessage('Please enter a valid email address.');
			setIsSubmitting(false);
			return;
		}

		try {
			// Prepare employee data for API
			const employeeData = {
				name: employee.name,
				lname: employee.lname,
				department: employee.department,
				position: employee.position,
				email: employee.email,
				phone: employee.phone,
			}; // Check if email already exists
			const existingEmployees = await axios.get(
				'http://localhost:3000/employees',
			);
			const emailExists = existingEmployees.data.some(
				(emp) => emp.email === employeeData.email,
			);

			if (emailExists) {
				setMessage(
					'An employee with this email address already exists.',
				);
				setIsSubmitting(false);
				return;
			}

			// Add employee to database
			const response = await axios.post(
				'http://localhost:3000/employees',
				employeeData,
			);

			if (response.status === 201) {
				setMessage('Employee added successfully!');
				// Reset form
				setEmployee({
					name: '',
					lname: '',
					age: '',
					department: '',
					position: '',
					email: '',
					phone: '',
					joiningDate: '',
				});
			}
		} catch (error) {
			console.error('Error adding employee:', error);
			if (error.response) {
				setMessage(
					`Error: ${
						error.response.data.message ||
						'Failed to add employee. Please try again.'
					}`,
				);
			} else if (error.request) {
				setMessage(
					'Unable to connect to server. Please make sure the server is running and try again.',
				);
			} else {
				setMessage('An unexpected error occurred. Please try again.');
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div
			className='add-employee-container'
			style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}
		>
			<div
				className='page-header'
				style={{ marginBottom: '2rem', textAlign: 'center' }}
			>
				<h2
					style={{
						color: '#333',
						fontSize: '2rem',
						marginBottom: '0.5rem',
					}}
				>
					Add New Employee
				</h2>
				<p style={{ color: '#666' }}>
					Fill out the form below to add a new employee to the system
				</p>
			</div>

			{message && (
				<div
					className={`alert ${
						message.includes('Error') ? 'error' : 'success'
					}`}
					style={{
						padding: '1rem',
						marginBottom: '1.5rem',
						borderRadius: '8px',
						backgroundColor: message.includes('Error')
							? '#f8d7da'
							: '#d4edda',
						color: message.includes('Error')
							? '#721c24'
							: '#155724',
						border: `1px solid ${
							message.includes('Error') ? '#f5c6cb' : '#c3e6cb'
						}`,
					}}
				>
					{message}
				</div>
			)}

			<div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
				<button
					type='button'
					onClick={testConnection}
					style={{
						padding: '0.5rem 1rem',
						backgroundColor: '#6c757d',
						color: 'white',
						border: 'none',
						borderRadius: '6px',
						cursor: 'pointer',
						fontSize: '0.9rem',
						fontWeight: '500',
					}}
				>
					Test Server Connection
				</button>
			</div>

			<form onSubmit={handleSubmit} className='employee-form'>
				<div
					className='form-grid'
					style={{
						display: 'grid',
						gridTemplateColumns: '1fr 1fr',
						gap: '1.5rem',
					}}
				>
					<div className='form-group'>
						<label
							style={{
								display: 'block',
								marginBottom: '0.5rem',
								fontWeight: '600',
							}}
						>
							First Name *
						</label>
						<input
							type='text'
							name='name'
							value={employee.name}
							onChange={handleChange}
							required
							style={{
								width: '100%',
								padding: '0.75rem',
								border: '2px solid #e0e0e0',
								borderRadius: '8px',
								fontSize: '1rem',
							}}
						/>
					</div>

					<div className='form-group'>
						<label
							style={{
								display: 'block',
								marginBottom: '0.5rem',
								fontWeight: '600',
							}}
						>
							Last Name *
						</label>
						<input
							type='text'
							name='lname'
							value={employee.lname}
							onChange={handleChange}
							required
							style={{
								width: '100%',
								padding: '0.75rem',
								border: '2px solid #e0e0e0',
								borderRadius: '8px',
								fontSize: '1rem',
							}}
						/>
					</div>

					<div className='form-group'>
						<label
							style={{
								display: 'block',
								marginBottom: '0.5rem',
								fontWeight: '600',
							}}
						>
							Department *
						</label>
						<select
							name='department'
							value={employee.department}
							onChange={handleChange}
							required
							style={{
								width: '100%',
								padding: '0.75rem',
								border: '2px solid #e0e0e0',
								borderRadius: '8px',
								fontSize: '1rem',
							}}
						>
							<option value=''>Select Department</option>
							<option value='IT'>Information Technology</option>
							<option value='HR'>Human Resources</option>
							<option value='Finance'>Finance</option>
							<option value='Marketing'>Marketing</option>
							<option value='Sales'>Sales</option>
							<option value='Operations'>Operations</option>
						</select>
					</div>

					<div className='form-group'>
						<label
							style={{
								display: 'block',
								marginBottom: '0.5rem',
								fontWeight: '600',
							}}
						>
							Position *
						</label>
						<input
							type='text'
							name='position'
							value={employee.position}
							onChange={handleChange}
							required
							placeholder='e.g., Software Developer'
							style={{
								width: '100%',
								padding: '0.75rem',
								border: '2px solid #e0e0e0',
								borderRadius: '8px',
								fontSize: '1rem',
							}}
						/>
					</div>

					<div className='form-group'>
						<label
							style={{
								display: 'block',
								marginBottom: '0.5rem',
								fontWeight: '600',
							}}
						>
							Email Address *
						</label>
						<input
							type='email'
							name='email'
							value={employee.email}
							onChange={handleChange}
							required
							placeholder='employee@company.com'
							style={{
								width: '100%',
								padding: '0.75rem',
								border: '2px solid #e0e0e0',
								borderRadius: '8px',
								fontSize: '1rem',
							}}
						/>
					</div>

					<div className='form-group'>
						<label
							style={{
								display: 'block',
								marginBottom: '0.5rem',
								fontWeight: '600',
							}}
						>
							Phone Number *
						</label>
						<input
							type='tel'
							name='phone'
							value={employee.phone}
							onChange={handleChange}
							required
							placeholder='+1 (555) 123-4567'
							style={{
								width: '100%',
								padding: '0.75rem',
								border: '2px solid #e0e0e0',
								borderRadius: '8px',
								fontSize: '1rem',
							}}
						/>
					</div>
				</div>

				<div
					className='form-actions'
					style={{ marginTop: '2rem', textAlign: 'center' }}
				>
					<button
						type='submit'
						disabled={isSubmitting}
						style={{
							padding: '1rem 2rem',
							background: '#3b82f6',
							color: 'white',
							border: 'none',
							borderRadius: '8px',
							fontSize: '1rem',
							fontWeight: '600',
							cursor: isSubmitting ? 'not-allowed' : 'pointer',
							opacity: isSubmitting ? 0.7 : 1,
							transition: 'all 0.3s ease',
						}}
						onMouseEnter={(e) => {
							if (!isSubmitting) {
								e.target.style.background = '#2563eb';
							}
						}}
						onMouseLeave={(e) => {
							if (!isSubmitting) {
								e.target.style.background = '#3b82f6';
							}
						}}
					>
						{isSubmitting ? 'Adding Employee...' : 'Add Employee'}
					</button>
				</div>
			</form>
		</div>
	);
}

export default AddEmployee;
