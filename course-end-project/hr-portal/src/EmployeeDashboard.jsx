import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import AttendanceRegularization from './components/AttendanceRegularization';
import LeaveManagement from './components/LeaveManagement';
import EmployeeProfile from './components/EmployeeProfile';

function EmployeeDashboard() {
	const location = useLocation();
	const [userName] = useState('John Doe'); // In real app, get from auth context

	const renderContent = () => {
		const path = location.pathname;

		if (path === '/employeeDashboard' || path === '/employeeDashboard/') {
			return <Dashboard userType='employee' userName={userName} />;
		} else if (path.includes('regularization')) {
			return <AttendanceRegularization />;
		} else if (path.includes('leave')) {
			return <LeaveManagement />;
		} else if (path.includes('profile')) {
			return <EmployeeProfile />;
		} else {
			return <Outlet />;
		}
	};

	return (
		<div className='employee-dashboard'>
			<Navigation userType='employee' userName={userName} />
			<main className='dashboard-content'>{renderContent()}</main>
		</div>
	);
}

export default EmployeeDashboard;
