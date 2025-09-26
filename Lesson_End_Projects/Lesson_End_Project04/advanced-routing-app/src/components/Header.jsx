// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const HeaderContainer = styled.header`
	background: #333;
	color: #fff;
	padding: 1rem;
	text-align: center;
`;
const Nav = styled.nav`
	display: flex;
	justify-content: center;
	gap: 1.5rem;
	margin-top: 0.5rem;
`;
const StyledLink = styled(Link)`
	color: #fff;
	text-decoration: none;
	font-weight: bold;
	&:hover {
		color: #f39c12;
	}
`;
function Header() {
	return (
		<HeaderContainer>
			<h1>Routing in React</h1>
			<Nav>
				<StyledLink to='/'>Home</StyledLink>
				<StyledLink to='/about'>About Us</StyledLink>
				<StyledLink to='/dashboard'>Dashboard</StyledLink>
				<StyledLink to='/user/123'>User Profile</StyledLink>
			</Nav>
		</HeaderContainer>
	);
}
export default Header;
