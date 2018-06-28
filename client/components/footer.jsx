import React from "react";
import styled from "styled-components";

const StyledFooter = styled.div`
display: flex;
flex-direction: column;
flex-shrink: 0;
color: #5b717e;
padding: 40px;
align-items: center;
justify-content: center;
`;

const Link = styled.a`
color: black;
text-decoration: underline;
&:hover {
  text-decoration: none;
}
`;

const Footer = () => <StyledFooter>
  Made by <Link href="https://estepanov.io">estepanov</Link>
</StyledFooter>

export default Footer;
