import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import axios from 'axios';

function EmployeeDashboard() {
	const location = useLocation();
	const [userName, setUserName] = useState('Loading...');

	useEffect(() => {
		const fetchUserName = async () => {
			try {
				// Get user session from localStorage
				const userSession = localStorage.getItem('userSession');

				if (!userSession) {
					setUserName('Guest');
					return;
				}

				const { emailId } = JSON.parse(userSession);

				// Fetch employee data from hrportal.json
				const response = await axios.get(
					'http://localhost:3000/employees',
				);
				const employees = response.data;

				// Find the employee with matching email
				const currentEmployee = employees.find(
					(employee) => employee.email === emailId,
				);

				if (
					currentEmployee &&
					currentEmployee.name &&
					currentEmployee.lname
				) {
					setUserName(
						`${currentEmployee.name} ${currentEmployee.lname}`,
					);
				} else {
					setUserName('Employee');
				}
			} catch (error) {
				console.error('Error fetching user name:', error);
				setUserName('Employee');
			}
		};

		fetchUserName();
	}, []);

	const renderContent = () => {
		const path = location.pathname;

		if (path === '/employeeDashboard' || path === '/employeeDashboard/') {
			return <Dashboard userType='employee' userName={userName} />;
		} else {
			return <Outlet />;
		}
	};

	return (
		<div className='employee-dashboard'>
			<Navigation userType='employee' userName={userName} />
			<main className='main-content'>{renderContent()}</main>
		</div>
	);
}

export default EmployeeDashboard;
