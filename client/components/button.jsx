import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
display: flex;
padding: 20px;
align-items: center;
justify-content: center;
font-size: 1.5em;
color: #E78435;
margin: 10px;
font-family: 'Bungee', cursive;
border: none;
background-color: white;
`;

const Button = (props) => <StyledButton onClick={props.onClick}>Make Image</StyledButton>

export default Button;
