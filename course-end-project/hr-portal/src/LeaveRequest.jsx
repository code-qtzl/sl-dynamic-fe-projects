import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LeaveRequest() {
	const [leaveData, setLeaveData] = useState({
		leaveType: '',
		startDate: '',
		endDate: '',
		reason: '',
		days: 0,
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [message, setMessage] = useState('');
	const [userEmail, setUserEmail] = useState('');

	useEffect(() => {
		// Get user email from session
		const userSession = localStorage.getItem('userSession');
		if (userSession) {
			const { emailId } = JSON.parse(userSession);
			setUserEmail(emailId);
		}
	}, []);

	const calculateDays = (start, end) => {
		if (!start || !end) return 0;
		const startDate = new Date(start);
		const endDate = new Date(end);
		const diffTime = Math.abs(endDate - startDate);
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
		return diffDays;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setLeaveData((prev) => {
			const updated = { ...prev, [name]: value };

			// Auto-calculate days when dates change
			if (name === 'startDate' || name === 'endDate') {
				updated.days = calculateDays(
					updated.startDate,
					updated.endDate,
				);
			}

			return updated;
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		setMessage('');

		try {
			// Validate dates
			const today = new Date().toISOString().split('T')[0];
			if (leaveData.startDate < today) {
				setMessage('Start date cannot be in the past.');
				setIsSubmitting(false);
				return;
			}

			if (leaveData.endDate < leaveData.startDate) {
				setMessage('End date cannot be before start date.');
				setIsSubmitting(false);
				return;
			}

			// Get employee details
			const employeesResponse = await axios.get(
				'http://localhost:3000/employees',
			);
			const employee = employeesResponse.data.find(
				(emp) => emp.email === userEmail,
			);

			if (!employee) {
				setMessage('Employee record not found.');
				setIsSubmitting(false);
				return;
			}

			const leaveRequest = {
				employeeId: employee.id,
				employeeName: `${employee.name} ${employee.lname}`,
				employeeEmail: employee.email,
				leaveType: leaveData.leaveType,
				startDate: leaveData.startDate,
				endDate: leaveData.endDate,
				days: leaveData.days,
				reason: leaveData.reason,
				status: 'pending',
				appliedDate: new Date().toISOString(),
			};

			await axios.post(
				'http://localhost:3000/leaveRequests',
				leaveRequest,
			);

			setMessage('Leave request submitted successfully!');
			setLeaveData({
				leaveType: '',
				startDate: '',
				endDate: '',
				reason: '',
				days: 0,
			});
		} catch (error) {
			console.error('Error submitting leave request:', error);
			setMessage('Failed to submit leave request. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
			<div style={{ marginBottom: '2rem' }}>
				<h2
					style={{
						color: '#1f2937',
						fontSize: '2rem',
						marginBottom: '0.5rem',
					}}
				>
					Apply for Leave
				</h2>
				<p style={{ color: '#6b7280' }}>
					Submit your leave request for HR approval
				</p>
			</div>

			{message && (
				<div
					style={{
						padding: '1rem',
						marginBottom: '1.5rem',
						borderRadius: '8px',
						backgroundColor: message.includes('success')
							? '#d4edda'
							: '#f8d7da',
						color: message.includes('success')
							? '#155724'
							: '#721c24',
						border: `1px solid ${
							message.includes('success') ? '#c3e6cb' : '#f5c6cb'
						}`,
					}}
				>
					{message}
				</div>
			)}

			<form
				onSubmit={handleSubmit}
				style={{
					background: 'white',
					padding: '2rem',
					borderRadius: '12px',
					boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
					border: '1px solid #e5e7eb',
				}}
			>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: '1fr 1fr',
						gap: '1.5rem',
						marginBottom: '1.5rem',
					}}
				>
					<div>
						<label
							style={{
								display: 'block',
								marginBottom: '0.5rem',
								fontWeight: '600',
								color: '#374151',
							}}
						>
							Leave Type *
						</label>
						<select
							name='leaveType'
							value={leaveData.leaveType}
							onChange={handleChange}
							required
							style={{
								width: '100%',
								padding: '0.75rem',
								border: '2px solid #e5e7eb',
								borderRadius: '8px',
								fontSize: '1rem',
								backgroundColor: 'white',
							}}
						>
							<option value=''>Select Leave Type</option>
							<option value='sick'>Sick Leave</option>
							<option value='casual'>Casual Leave</option>
							<option value='earned'>Earned Leave</option>
							<option value='maternity'>Maternity Leave</option>
							<option value='paternity'>Paternity Leave</option>
							<option value='emergency'>Emergency Leave</option>
						</select>
					</div>

					<div>
						<label
							style={{
								display: 'block',
								marginBottom: '0.5rem',
								fontWeight: '600',
								color: '#374151',
							}}
						>
							Number of Days
						</label>
						<input
							type='number'
							value={leaveData.days}
							readOnly
							style={{
								width: '100%',
								padding: '0.75rem',
								border: '2px solid #e5e7eb',
								borderRadius: '8px',
								fontSize: '1rem',
								backgroundColor: '#f9fafb',
								color: '#6b7280',
							}}
						/>
					</div>
				</div>

				<div
					style={{
						display: 'grid',
						gridTemplateColumns: '1fr 1fr',
						gap: '1.5rem',
						marginBottom: '1.5rem',
					}}
				>
					<div>
						<label
							style={{
								display: 'block',
								marginBottom: '0.5rem',
								fontWeight: '600',
								color: '#374151',
							}}
						>
							Start Date *
						</label>
						<input
							type='date'
							name='startDate'
							value={leaveData.startDate}
							onChange={handleChange}
							required
							style={{
								width: '100%',
								padding: '0.75rem',
								border: '2px solid #e5e7eb',
								borderRadius: '8px',
								fontSize: '1rem',
							}}
						/>
					</div>

					<div>
						<label
							style={{
								display: 'block',
								marginBottom: '0.5rem',
								fontWeight: '600',
								color: '#374151',
							}}
						>
							End Date *
						</label>
						<input
							type='date'
							name='endDate'
							value={leaveData.endDate}
							onChange={handleChange}
							required
							style={{
								width: '100%',
								padding: '0.75rem',
								border: '2px solid #e5e7eb',
								borderRadius: '8px',
								fontSize: '1rem',
							}}
						/>
					</div>
				</div>

				<div style={{ marginBottom: '1.5rem' }}>
					<label
						style={{
							display: 'block',
							marginBottom: '0.5rem',
							fontWeight: '600',
							color: '#374151',
						}}
					>
						Reason for Leave *
					</label>
					<textarea
						name='reason'
						value={leaveData.reason}
						onChange={handleChange}
						required
						rows='4'
						placeholder='Please provide a brief reason for your leave request...'
						style={{
							width: '100%',
							padding: '0.75rem',
							border: '2px solid #e5e7eb',
							borderRadius: '8px',
							fontSize: '1rem',
							resize: 'vertical',
						}}
					/>
				</div>

				<div style={{ textAlign: 'center' }}>
					<button
						type='submit'
						disabled={isSubmitting}
						style={{
							padding: '1rem 2rem',
							background: isSubmitting ? '#6b7280' : '#3b82f6',
							color: 'white',
							border: 'none',
							borderRadius: '8px',
							fontSize: '1rem',
							fontWeight: '600',
							cursor: isSubmitting ? 'not-allowed' : 'pointer',
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
						{isSubmitting
							? 'Submitting Request...'
							: 'Submit Leave Request'}
					</button>
				</div>
			</form>
		</div>
	);
}

export default LeaveRequest;
