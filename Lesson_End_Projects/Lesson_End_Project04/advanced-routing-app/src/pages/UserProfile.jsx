// src/pages/UserProfile.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
const Container = styled.div`
	padding: 20px;
	text-align: center;
`;
function UserProfile() {
	const { userId } = useParams();
	return (
		<Container>
			<h2>User Profile</h2>
			<p>User ID: {userId}</p>
		</Container>
	);
}
export default UserProfile;
