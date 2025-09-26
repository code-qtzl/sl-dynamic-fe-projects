// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const Container = styled.div`
	text-align: center;
	padding: 50px;
`;
const Heading = styled.h1`
	font-size: 3rem;
	color: #ff4757;
`;
const HomeLink = styled(Link)`
	display: inline-block;
	margin-top: 20px;
	padding: 10px 20px;
	background: #007bff;
	color: white;
	text-decoration: none;
	font-weight: bold;
	border-radius: 5px;
	&:hover {
		background: #0056b3;
	}
`;
function NotFound() {
	return (
		<Container>
			<Heading>404</Heading>
			<p>Oops! The page you're looking for doesn't exist.</p>
			<HomeLink to='/'>Go Back Home</HomeLink>
		</Container>
	);
}
export default NotFound;
