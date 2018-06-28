import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
padding: 20px;
font-size: 16px;
color: darkgrey;
margin: 10px 0 10px 0;
border: solid 1px darkgrey;
width: 100%;
box-sizing: border-box;
`;

const Button = ({ url }) => <StyledInput defaultValue={url} />

export default Button;
