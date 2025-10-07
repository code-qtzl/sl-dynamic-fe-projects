import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';

function HrDashboard() {
	const location = useLocation();
	const [userName] = useState('HR Manager'); // In real app, get from auth context

	const renderContent = () => {
		const path = location.pathname;

		if (path === '/hrDashboard' || path === '/hrDashboard/') {
			return <Dashboard userType='hr' userName={userName} />;
		} else {
			// This will render AddEmployee, DisplayEmployee, and other child routes
			return <Outlet />;
		}
	};

	return (
		<div className='hr-dashboard'>
			<Navigation userType='hr' userName={userName} />
			<main className='main-content'>{renderContent()}</main>
		</div>
	);
}

export default HrDashboard;
