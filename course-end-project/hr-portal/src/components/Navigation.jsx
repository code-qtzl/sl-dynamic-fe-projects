import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation({ userType, userName = 'User' }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	const logout = () => {
		localStorage.removeItem('userSession');
		navigate('/');
	};

	const hrMenuItems = [
		{ path: '/hrDashboard', label: 'Dashboard', icon: '📊' },
		{ path: '/hrDashboard/addEmployee', label: 'Add Employee', icon: '👤' },
		{
			path: '/hrDashboard/displayEmployee',
			label: 'View Employees',
			icon: '👥',
		},
	];

	const employeeMenuItems = [
		// { path: '/employeeDashboard', label: 'Dashboard', icon: '📊' },
	];

	const menuItems = userType === 'hr' ? hrMenuItems : employeeMenuItems;

	const isActiveRoute = (path) => {
		return (
			location.pathname === path ||
			location.pathname.startsWith(path + '/')
		);
	};

	return (
		<nav className='navigation'>
			<div className='nav-container'>
				{/* Logo and Brand */}
				<div className='nav-brand'>
					<div className='brand-logo'>
						<span className='logo-icon'>🏢</span>
						<span className='brand-text'>HR Portal</span>
					</div>
				</div>

				{/* Desktop Menu */}
				<div className='nav-menu'>
					{menuItems.map((item, index) => (
						<Link
							key={index}
							to={item.path}
							className={`nav-item ${
								isActiveRoute(item.path) ? 'active' : ''
							}`}
						>
							<span className='nav-icon'>{item.icon}</span>
							<span className='nav-label'>{item.label}</span>
						</Link>
					))}
				</div>

				{/* User Profile Section */}
				<div className='nav-profile'>
					<div
						className='profile-trigger'
						onClick={() => setIsProfileOpen(!isProfileOpen)}
					>
						<div className='profile-avatar'>
							<span>{userName.charAt(0).toUpperCase()}</span>
						</div>
						<div className='profile-info'>
							<div className='profile-name'>{userName}</div>
							<div className='profile-role'>
								{userType === 'hr' ? 'HR Manager' : 'Employee'}
							</div>
						</div>
						<div className='profile-arrow'>
							<span
								className={`arrow ${
									isProfileOpen ? 'up' : 'down'
								}`}
							>
								▼
							</span>
						</div>
					</div>

					{/* Profile Dropdown */}
					{isProfileOpen && (
						<div className='profile-dropdown'>
							<div
								className='dropdown-item logout'
								onClick={logout}
							>
								<span className='dropdown-icon'>🚪</span>
								<span>Logout</span>
							</div>
						</div>
					)}
				</div>

				{/* Mobile Menu Toggle */}
				<div
					className='mobile-toggle'
					onClick={() => setIsMenuOpen(!isMenuOpen)}
				>
					<span className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
						<span></span>
						<span></span>
						<span></span>
					</span>
				</div>
			</div>

			{/* Mobile Menu */}
			<div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
				<div className='mobile-menu-header'>
					<div className='mobile-profile'>
						<div className='profile-avatar'>
							<span>{userName.charAt(0).toUpperCase()}</span>
						</div>
						<div className='profile-info'>
							<div className='profile-name'>{userName}</div>
							<div className='profile-role'>
								{userType === 'hr' ? 'HR Manager' : 'Employee'}
							</div>
						</div>
					</div>
				</div>

				<div className='mobile-menu-items'>
					{menuItems.map((item, index) => (
						<Link
							key={index}
							to={item.path}
							className={`mobile-nav-item ${
								isActiveRoute(item.path) ? 'active' : ''
							}`}
							onClick={() => setIsMenuOpen(false)}
						>
							<span className='nav-icon'>{item.icon}</span>
							<span className='nav-label'>{item.label}</span>
						</Link>
					))}
				</div>

				<div className='mobile-menu-footer'>
					<div className='mobile-nav-item' onClick={logout}>
						<span className='nav-icon'>🚪</span>
						<span className='nav-label'>Logout</span>
					</div>
				</div>
			</div>

			{/* Overlay */}
			{(isMenuOpen || isProfileOpen) && (
				<div
					className='nav-overlay'
					onClick={() => {
						setIsMenuOpen(false);
						setIsProfileOpen(false);
					}}
				></div>
			)}
		</nav>
	);
}

export default Navigation;
