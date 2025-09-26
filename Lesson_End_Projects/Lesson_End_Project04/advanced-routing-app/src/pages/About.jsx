// src/pages/About.jsx
import React from 'react';
import styled from 'styled-components';
const Container = styled.div`
	padding: 20px;
	text-align: center;
`;
function About() {
	return (
		<Container>
			<h2>About Us</h2>
			<p>
				We are a company dedicated to providing high-quality services
				and products.
			</p>
		</Container>
	);
}
export default About;
