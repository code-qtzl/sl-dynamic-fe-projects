import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LeaveManagement() {
	const [leaveRequests, setLeaveRequests] = useState([]);
	const [loading, setLoading] = useState(true);
	const [filter, setFilter] = useState('all');
	const [processingId, setProcessingId] = useState(null);

	useEffect(() => {
		fetchLeaveRequests();
	}, []);

	const fetchLeaveRequests = async () => {
		try {
			setLoading(true);
			const response = await axios.get(
				'http://localhost:3000/leaveRequests',
			);
			const sortedRequests = response.data.sort(
				(a, b) => new Date(b.appliedDate) - new Date(a.appliedDate),
			);
			setLeaveRequests(sortedRequests);
		} catch (error) {
			console.error('Error fetching leave requests:', error);
			setLeaveRequests([]);
		} finally {
			setLoading(false);
		}
	};

	const handleLeaveAction = async (leaveId, action, comment = '') => {
		try {
			setProcessingId(leaveId);

			const updatedLeave = {
				status: action,
				hrComment: comment,
				processedDate: new Date().toISOString(),
			};

			await axios.patch(
				`http://localhost:3000/leaveRequests/${leaveId}`,
				updatedLeave,
			);

			// Refresh the list
			await fetchLeaveRequests();
		} catch (error) {
			console.error('Error processing leave request:', error);
		} finally {
			setProcessingId(null);
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

	const filteredRequests = leaveRequests.filter((request) => {
		if (filter === 'all') return true;
		return request.status === filter;
	});

	const LeaveActionModal = ({ leave, onClose, onSubmit }) => {
		const [action, setAction] = useState('');
		const [comment, setComment] = useState('');

		const handleSubmit = (e) => {
			e.preventDefault();
			onSubmit(leave.id, action, comment);
			onClose();
		};

		return (
			<div
				style={{
					position: 'fixed',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					zIndex: 1000,
				}}
			>
				<div
					style={{
						background: 'white',
						padding: '2rem',
						borderRadius: '12px',
						maxWidth: '500px',
						width: '90%',
						maxHeight: '80vh',
						overflow: 'auto',
					}}
				>
					<h3 style={{ marginBottom: '1rem', color: '#1f2937' }}>
						Process Leave Request
					</h3>

					<div
						style={{
							marginBottom: '1rem',
							padding: '1rem',
							backgroundColor: '#f9fafb',
							borderRadius: '8px',
						}}
					>
						<p>
							<strong>Employee:</strong> {leave.employeeName}
						</p>
						<p>
							<strong>Leave Type:</strong> {leave.leaveType}
						</p>
						<p>
							<strong>Duration:</strong>{' '}
							{formatDate(leave.startDate)} -{' '}
							{formatDate(leave.endDate)} ({leave.days} days)
						</p>
						<p>
							<strong>Reason:</strong> {leave.reason}
						</p>
					</div>

					<form onSubmit={handleSubmit}>
						<div style={{ marginBottom: '1rem' }}>
							<label
								style={{
									display: 'block',
									marginBottom: '0.5rem',
									fontWeight: '600',
								}}
							>
								Action *
							</label>
							<select
								value={action}
								onChange={(e) => setAction(e.target.value)}
								required
								style={{
									width: '100%',
									padding: '0.75rem',
									border: '2px solid #e5e7eb',
									borderRadius: '8px',
									fontSize: '1rem',
								}}
							>
								<option value=''>Select Action</option>
								<option value='approved'>Approve</option>
								<option value='rejected'>Reject</option>
							</select>
						</div>

						<div style={{ marginBottom: '1.5rem' }}>
							<label
								style={{
									display: 'block',
									marginBottom: '0.5rem',
									fontWeight: '600',
								}}
							>
								Comment (Optional)
							</label>
							<textarea
								value={comment}
								onChange={(e) => setComment(e.target.value)}
								rows='3'
								placeholder='Add a comment for the employee...'
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

						<div
							style={{
								display: 'flex',
								gap: '1rem',
								justifyContent: 'flex-end',
							}}
						>
							<button
								type='button'
								onClick={onClose}
								style={{
									padding: '0.75rem 1.5rem',
									background: '#6b7280',
									color: 'white',
									border: 'none',
									borderRadius: '8px',
									cursor: 'pointer',
								}}
							>
								Cancel
							</button>
							<button
								type='submit'
								style={{
									padding: '0.75rem 1.5rem',
									background: '#3b82f6',
									color: 'white',
									border: 'none',
									borderRadius: '8px',
									cursor: 'pointer',
								}}
							>
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	};

	const [selectedLeave, setSelectedLeave] = useState(null);

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
		<div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginBottom: '2rem',
				}}
			>
				<div>
					<h2
						style={{
							color: '#1f2937',
							fontSize: '2rem',
							marginBottom: '0.5rem',
						}}
					>
						Leave Management
					</h2>
					<p style={{ color: '#6b7280', margin: 0 }}>
						Review and manage employee leave requests
					</p>
				</div>

				<div
					style={{
						display: 'flex',
						gap: '1rem',
						alignItems: 'center',
					}}
				>
					<select
						value={filter}
						onChange={(e) => setFilter(e.target.value)}
						style={{
							padding: '0.75rem',
							border: '2px solid #e5e7eb',
							borderRadius: '8px',
							fontSize: '1rem',
							backgroundColor: 'white',
						}}
					>
						<option value='all'>All Requests</option>
						<option value='pending'>Pending</option>
						<option value='approved'>Approved</option>
						<option value='rejected'>Rejected</option>
					</select>

					<button
						onClick={fetchLeaveRequests}
						style={{
							padding: '0.75rem 1.5rem',
							background: '#3b82f6',
							color: 'white',
							border: 'none',
							borderRadius: '8px',
							cursor: 'pointer',
							fontWeight: '500',
						}}
					>
						🔄 Refresh
					</button>
				</div>
			</div>

			{filteredRequests.length === 0 ? (
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
						{filter === 'all'
							? 'No Leave Requests'
							: `No ${filter} Requests`}
					</h3>
					<p style={{ color: '#6b7280' }}>
						{filter === 'all'
							? 'No leave requests have been submitted yet.'
							: `No ${filter} leave requests found.`}
					</p>
				</div>
			) : (
				<div style={{ display: 'grid', gap: '1rem' }}>
					{filteredRequests.map((request) => (
						<div
							key={request.id}
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
										}}
									>
										{request.employeeName}
									</h3>
									<p
										style={{
											color: '#6b7280',
											margin: '0',
											fontSize: '0.9rem',
										}}
									>
										Applied on{' '}
										{formatDate(request.appliedDate)}
									</p>
								</div>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: '1rem',
									}}
								>
									{getStatusBadge(request.status)}
									{request.status === 'pending' && (
										<button
											onClick={() =>
												setSelectedLeave(request)
											}
											disabled={
												processingId === request.id
											}
											style={{
												padding: '0.5rem 1rem',
												background:
													processingId === request.id
														? '#6b7280'
														: '#3b82f6',
												color: 'white',
												border: 'none',
												borderRadius: '6px',
												cursor:
													processingId === request.id
														? 'not-allowed'
														: 'pointer',
												fontSize: '0.9rem',
											}}
										>
											{processingId === request.id
												? 'Processing...'
												: 'Review'}
										</button>
									)}
								</div>
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
										Leave Type:
									</span>
									<p
										style={{
											margin: '0.25rem 0 0 0',
											color: '#374151',
											fontWeight: '500',
											textTransform: 'capitalize',
										}}
									>
										{request.leaveType}
									</p>
								</div>
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
										{formatDate(request.startDate)} -{' '}
										{formatDate(request.endDate)}
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
										{request.days} day
										{request.days > 1 ? 's' : ''}
									</p>
								</div>
								<div>
									<span
										style={{
											color: '#6b7280',
											fontSize: '0.9rem',
										}}
									>
										Email:
									</span>
									<p
										style={{
											margin: '0.25rem 0 0 0',
											color: '#374151',
											fontWeight: '500',
										}}
									>
										{request.employeeEmail}
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
									{request.reason}
								</p>
							</div>

							{request.hrComment && (
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
										{request.hrComment}
									</p>
								</div>
							)}
						</div>
					))}
				</div>
			)}

			{selectedLeave && (
				<LeaveActionModal
					leave={selectedLeave}
					onClose={() => setSelectedLeave(null)}
					onSubmit={handleLeaveAction}
				/>
			)}
		</div>
	);
}

export default LeaveManagement;
