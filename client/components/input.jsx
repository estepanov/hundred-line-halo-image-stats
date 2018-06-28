import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
display: flex;
padding: 20px;
align-items: center;
justify-content: center;
font-size: 1.5em;
color: #E78435;
border: solid 5px #E78435;
margin: 10px;
font-family: 'Bungee', cursive;
`;

const Input = (props) => <StyledInput onChange={props.onChange} placeholder="Xbox Live Gamer Tag" value={props.value} />

export default Input;
