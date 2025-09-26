// src/components/Footer.jsx
import React from 'react';
import styled from 'styled-components';
const FooterContainer = styled.footer`
	background: #222;
	color: white;
	text-align: center;
	padding: 1rem;
	position: fixed;
	bottom: 0;
	width: 100%;
`;
const SocialLinks = styled.div`
	margin-bottom: 0.5rem;
`;
const StyledLink = styled.a`
	color: #fff;
	margin: 0 10px;
	text-decoration: none;
	&:hover {
		color: #f39c12;
	}
`;
function Footer() {
	return (
		<FooterContainer>
			<SocialLinks>
				<StyledLink href='https://twitter.com' target='_blank'>
					Twitter
				</StyledLink>
				<StyledLink href='https://facebook.com' target='_blank'>
					Facebook
				</StyledLink>
				<StyledLink href='https://linkedin.com' target='_blank'>
					LinkedIn
				</StyledLink>
			</SocialLinks>
			<p>&copy; 2025 Routing in React</p>
		</FooterContainer>
	);
}
export default Footer;
