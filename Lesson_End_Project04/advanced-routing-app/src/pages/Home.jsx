// src/pages/Home.jsx
import React from 'react';
import styled from 'styled-components';
const Container = styled.div`
	padding: 20px;
	text-align: center;
`;
function Home() {
	return (
		<Container>
			<h2>Welcome to the Home Page!</h2>
			<p>Explore our website using the navigation above.</p>
		</Container>
	);
}
export default Home;
