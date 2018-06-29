import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
display: flex;
padding: 20px;
align-items: center;
justify-content: center;
font-size: 1.5em;
color: white;
margin: 10px;
font-family: 'Bungee', cursive;
border: none;
background-color: #4b738d;
cursor: pointer;
&:hover {
  background-color: #284a60;
}
`;

const Button = (props) => <StyledButton onClick={props.onClick}>Generate</StyledButton>

export default Button;
