// src/pages/Dashboard.jsx
import React from 'react';
import styled from 'styled-components';
const Container = styled.div`
	padding: 20px;
	text-align: center;
`;
function Dashboard() {
	return (
		<Container>
			<h2>Dashboard</h2>
			<p>Manage your data and activities here.</p>
		</Container>
	);
}
export default Dashboard;
