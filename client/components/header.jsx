import React from "react";
import styled from 'styled-components';

const StyledHeader = styled.div`
display: flex;
flex-direction: column;
background-color: #25333E;
padding: 20px;
align-items: center;
justify-content: center;
flex-shrink: 0;
`

const Title = styled.div`
font-family: 'Bungee', cursive;
font-size: 1.8em;
color: #9BB6C9;
text-align: center;
`;

const Header = () => <StyledHeader>
  <Title>Halo 5 Statistics Image Generator</Title>
</StyledHeader>

export default Header;
