import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DisplayEmployee() {
	const [employees, setEmployees] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	const [filterDepartment, setFilterDepartment] = useState('');

	useEffect(() => {
		fetchEmployees();
	}, []);

	const fetchEmployees = async () => {
		try {
			setLoading(true);
			const response = await axios.get('http://localhost:3000/employees');

			// Process the employee data to ensure all fields are present
			const processedEmployees = response.data.map((employee) => ({
				...employee,
				// Ensure all required fields have default values if missing
				name: employee.name || 'N/A',
				lname: employee.lname || 'N/A',
				department: employee.department || 'Unassigned',
				position: employee.position || 'N/A',
				email: employee.email || 'N/A',
				phone: employee.phone || 'N/A',
			}));

			setEmployees(processedEmployees);
			setLoading(false);
		} catch (error) {
			console.error('Error fetching employees:', error);
			setLoading(false);

			// Show user-friendly error message
			setEmployees([]);

			// If we can't connect to the server, show a message to the user
			if (
				error.code === 'ERR_NETWORK' ||
				error.message.includes('Network Error')
			) {
				alert(
					'Unable to connect to the server. Please make sure the JSON Server is running on port 3000.',
				);
			}
		}
	};

	const filteredEmployees = employees.filter((employee) => {
		const matchesSearch =
			`${employee.name} ${employee.lname}`
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
			employee.position.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesDepartment =
			filterDepartment === '' || employee.department === filterDepartment;
		return matchesSearch && matchesDepartment;
	});

	if (loading) {
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '400px',
					fontSize: '1.2rem',
					color: '#666',
				}}
			>
				Loading employees...
			</div>
		);
	}

	return (
		<div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
			<div style={{ marginBottom: '2rem', textAlign: 'center' }}>
				<h2
					style={{
						color: '#333',
						fontSize: '2rem',
						marginBottom: '0.5rem',
					}}
				>
					Employee Directory
				</h2>
				<p style={{ color: '#666' }}>
					Manage and view all employees in the organization
				</p>
			</div>

			{/* Search and Filter Controls */}
			<div
				style={{
					display: 'flex',
					gap: '1rem',
					marginBottom: '2rem',
					flexWrap: 'wrap',
					alignItems: 'center',
				}}
			>
				<div style={{ flex: '1', minWidth: '250px' }}>
					<input
						type='text'
						placeholder='Search employees by name, email, or position...'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						style={{
							width: '100%',
							padding: '0.75rem',
							border: '2px solid #e0e0e0',
							borderRadius: '8px',
							fontSize: '1rem',
						}}
					/>
				</div>
				<div>
					<select
						value={filterDepartment}
						onChange={(e) => setFilterDepartment(e.target.value)}
						style={{
							padding: '0.75rem',
							border: '2px solid #e0e0e0',
							borderRadius: '8px',
							fontSize: '1rem',
							minWidth: '150px',
						}}
					>
						<option value=''>All Departments</option>
						<option value='IT'>IT</option>
						<option value='HR'>HR</option>
						<option value='Marketing'>Marketing</option>
						<option value='Finance'>Finance</option>
						<option value='Sales'>Sales</option>
						<option value='Operations'>Operations</option>
					</select>
				</div>
				<div>
					<button
						onClick={fetchEmployees}
						disabled={loading}
						style={{
							padding: '0.75rem 1.5rem',
							backgroundColor: loading ? '#6c757d' : '#3b82f6',
							color: 'white',
							border: 'none',
							borderRadius: '8px',
							fontSize: '1rem',
							cursor: loading ? 'not-allowed' : 'pointer',
							fontWeight: '500',
							transition: 'all 0.3s ease',
						}}
						onMouseEnter={(e) => {
							if (!loading) {
								e.target.style.backgroundColor = '#2563eb';
							}
						}}
						onMouseLeave={(e) => {
							if (!loading) {
								e.target.style.backgroundColor = '#3b82f6';
							}
						}}
					>
						{loading ? 'Refreshing...' : '🔄 Refresh'}
					</button>
				</div>
			</div>

			{/* Employee Cards Grid */}
			<div
				style={{
					display: 'grid',
					gridTemplateColumns:
						'repeat(auto-fill, minmax(350px, 1fr))',
					gap: '1.5rem',
				}}
			>
				{filteredEmployees.map((employee) => (
					<div
						key={employee.id}
						style={{
							backgroundColor: 'white',
							borderRadius: '12px',
							padding: '1.5rem',
							boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
							border: '1px solid #e0e0e0',
							transition: 'all 0.3s ease',
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.transform =
								'translateY(-2px)';
							e.currentTarget.style.boxShadow =
								'0 4px 20px rgba(0, 0, 0, 0.15)';
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.transform = 'translateY(0)';
							e.currentTarget.style.boxShadow =
								'0 2px 10px rgba(0, 0, 0, 0.1)';
						}}
					>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'flex-start',
								marginBottom: '1rem',
							}}
						>
							<div>
								<h3
									style={{
										margin: '0 0 0.25rem 0',
										color: '#333',
										fontSize: '1.25rem',
									}}
								>
									{employee.name} {employee.lname}
								</h3>
								<p
									style={{
										margin: '0',
										color: '#666',
										fontSize: '0.9rem',
									}}
								>
									{employee.position}
								</p>
							</div>
						</div>

						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: '0.5rem',
							}}
						>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: '0.5rem',
								}}
							>
								<span style={{ fontSize: '1rem' }}>🏢</span>
								<span
									style={{
										color: '#555',
										fontSize: '0.9rem',
									}}
								>
									{employee.department}
								</span>
							</div>

							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: '0.5rem',
								}}
							>
								<span style={{ fontSize: '1rem' }}>📧</span>
								<span
									style={{
										color: '#555',
										fontSize: '0.9rem',
									}}
								>
									{employee.email}
								</span>
							</div>

							{employee.phone && (
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: '0.5rem',
									}}
								>
									<span style={{ fontSize: '1rem' }}>📞</span>
									<span
										style={{
											color: '#555',
											fontSize: '0.9rem',
										}}
									>
										{employee.phone}
									</span>
								</div>
							)}
						</div>
					</div>
				))}
			</div>

			{filteredEmployees.length === 0 && !loading && (
				<div
					style={{
						textAlign: 'center',
						padding: '3rem',
						color: '#666',
						backgroundColor: '#f8f9fa',
						borderRadius: '12px',
						marginTop: '2rem',
					}}
				>
					{employees.length === 0 ? (
						<>
							<p
								style={{
									fontSize: '1.1rem',
									marginBottom: '0.5rem',
								}}
							>
								No employees in database
							</p>
							<p style={{ fontSize: '0.9rem' }}>
								Add employees using the "Add Employee" feature
								to see them here.
								<br />
								Make sure the JSON Server is running to load
								existing employees.
							</p>
						</>
					) : (
						<>
							<p
								style={{
									fontSize: '1.1rem',
									marginBottom: '0.5rem',
								}}
							>
								No employees match your search criteria
							</p>
							<p style={{ fontSize: '0.9rem' }}>
								Try adjusting your search terms or department
								filter
							</p>
						</>
					)}
				</div>
			)}

			<div
				style={{
					marginTop: '2rem',
					padding: '1rem',
					backgroundColor: '#f8f9fa',
					borderRadius: '8px',
					textAlign: 'center',
				}}
			>
				<p style={{ margin: '0', color: '#666', fontSize: '0.9rem' }}>
					Total Employees: <strong>{filteredEmployees.length}</strong>{' '}
					of <strong>{employees.length}</strong>
				</p>
			</div>
		</div>
	);
}

export default DisplayEmployee;
