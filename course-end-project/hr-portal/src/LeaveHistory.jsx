import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LeaveHistory() {
	const [leaveHistory, setLeaveHistory] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Get user email from session
		const userSession = localStorage.getItem('userSession');
		if (userSession) {
			const { emailId } = JSON.parse(userSession);
			fetchLeaveHistory(emailId);
		}
	}, []);

	const fetchLeaveHistory = async (email) => {
		try {
			setLoading(true);
			const response = await axios.get(
				'http://localhost:3000/leaveRequests',
			);
			const userLeaves = response.data
				.filter((leave) => leave.employeeEmail === email)
				.sort(
					(a, b) => new Date(b.appliedDate) - new Date(a.appliedDate),
				);

			setLeaveHistory(userLeaves);
		} catch (error) {
			console.error('Error fetching leave history:', error);
			setLeaveHistory([]);
		} finally {
			setLoading(false);
		}
	};

	const getStatusBadge = (status) => {
		const statusStyles = {
			pending: {
				backgroundColor: '#fef3c7',
				color: '#92400e',
				border: '1px solid #fde68a',
			},
			approved: {
				backgroundColor: '#d1fae5',
				color: '#065f46',
				border: '1px solid #a7f3d0',
			},
			rejected: {
				backgroundColor: '#fee2e2',
				color: '#991b1b',
				border: '1px solid #fecaca',
			},
		};

		return (
			<span
				style={{
					...statusStyles[status],
					padding: '0.25rem 0.75rem',
					borderRadius: '20px',
					fontSize: '0.75rem',
					fontWeight: '600',
					textTransform: 'uppercase',
				}}
			>
				{status}
			</span>
		);
	};

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		});
	};

	if (loading) {
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					padding: '3rem',
				}}
			>
				<div
					style={{
						width: '40px',
						height: '40px',
						border: '4px solid #f3f3f3',
						borderTop: '4px solid #3b82f6',
						borderRadius: '50%',
						animation: 'spin 1s linear infinite',
					}}
				></div>
			</div>
		);
	}

	return (
		<div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
			<div style={{ marginBottom: '2rem' }}>
				<h2
					style={{
						color: '#1f2937',
						fontSize: '2rem',
						marginBottom: '0.5rem',
					}}
				>
					My Leave History
				</h2>
				<p style={{ color: '#6b7280' }}>
					View all your leave requests and their status
				</p>
			</div>

			{leaveHistory.length === 0 ? (
				<div
					style={{
						textAlign: 'center',
						padding: '3rem',
						background: 'white',
						borderRadius: '12px',
						boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
						border: '1px solid #e5e7eb',
					}}
				>
					<div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
						📋
					</div>
					<h3 style={{ color: '#374151', marginBottom: '0.5rem' }}>
						No Leave History
					</h3>
					<p style={{ color: '#6b7280' }}>
						You haven't submitted any leave requests yet.
					</p>
				</div>
			) : (
				<div style={{ display: 'grid', gap: '1rem' }}>
					{leaveHistory.map((leave) => (
						<div
							key={leave.id}
							style={{
								background: 'white',
								padding: '1.5rem',
								borderRadius: '12px',
								boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
								border: '1px solid #e5e7eb',
							}}
						>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'start',
									marginBottom: '1rem',
								}}
							>
								<div>
									<h3
										style={{
											color: '#1f2937',
											fontSize: '1.2rem',
											margin: '0 0 0.5rem 0',
											textTransform: 'capitalize',
										}}
									>
										{leave.leaveType} Leave
									</h3>
									<p
										style={{
											color: '#6b7280',
											margin: '0',
											fontSize: '0.9rem',
										}}
									>
										Applied on{' '}
										{formatDate(leave.appliedDate)}
									</p>
								</div>
								{getStatusBadge(leave.status)}
							</div>

							<div
								style={{
									display: 'grid',
									gridTemplateColumns:
										'repeat(auto-fit, minmax(200px, 1fr))',
									gap: '1rem',
									marginBottom: '1rem',
								}}
							>
								<div>
									<span
										style={{
											color: '#6b7280',
											fontSize: '0.9rem',
										}}
									>
										Duration:
									</span>
									<p
										style={{
											margin: '0.25rem 0 0 0',
											color: '#374151',
											fontWeight: '500',
										}}
									>
										{formatDate(leave.startDate)} -{' '}
										{formatDate(leave.endDate)}
									</p>
								</div>
								<div>
									<span
										style={{
											color: '#6b7280',
											fontSize: '0.9rem',
										}}
									>
										Days:
									</span>
									<p
										style={{
											margin: '0.25rem 0 0 0',
											color: '#374151',
											fontWeight: '500',
										}}
									>
										{leave.days} day
										{leave.days > 1 ? 's' : ''}
									</p>
								</div>
							</div>

							<div>
								<span
									style={{
										color: '#6b7280',
										fontSize: '0.9rem',
									}}
								>
									Reason:
								</span>
								<p
									style={{
										margin: '0.25rem 0 0 0',
										color: '#374151',
										lineHeight: '1.5',
									}}
								>
									{leave.reason}
								</p>
							</div>

							{leave.hrComment && (
								<div
									style={{
										marginTop: '1rem',
										padding: '1rem',
										backgroundColor: '#f9fafb',
										borderRadius: '8px',
										borderLeft: '4px solid #3b82f6',
									}}
								>
									<span
										style={{
											color: '#6b7280',
											fontSize: '0.9rem',
										}}
									>
										HR Comment:
									</span>
									<p
										style={{
											margin: '0.25rem 0 0 0',
											color: '#374151',
										}}
									>
										{leave.hrComment}
									</p>
								</div>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default LeaveHistory;
