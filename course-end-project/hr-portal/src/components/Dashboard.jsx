import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard({ userType, userName = 'User' }) {
	const [currentTime, setCurrentTime] = useState(new Date());
	const navigate = useNavigate();

	React.useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const handleAddEmployee = () => {
		navigate('/hrDashboard/addEmployee');
	};

	const formatTime = (date) => {
		return date.toLocaleTimeString('en-US', {
			hour12: true,
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
		});
	};

	const formatDate = (date) => {
		return date.toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	return (
		<div className='dashboard'>
			<div className='dashboard-header'>
				<div className='welcome-section'>
					<h1>Welcome back, {userName}!</h1>
					<p className='date-time'>
						<span className='date'>{formatDate(currentTime)}</span>
						<span className='time'>{formatTime(currentTime)}</span>
					</p>
				</div>
				<div className='quick-actions'>
					{userType === 'hr' ? (
						<>
							<button
								className='action-btn primary'
								onClick={handleAddEmployee}
							>
								+ Add Employee
							</button>
						</>
					) : (
						<>{/* No quick actions for employees */}</>
					)}
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
