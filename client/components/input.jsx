import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
display: flex;
padding: 20px;
align-items: center;
justify-content: center;
font-size: 1.5em;
@media only screen and (max-device-width: 600px) {
  font-size: 16px;
}
color: #4b738d;
border: solid 3px #4b738d;
margin: 10px;
font-family: 'Bungee', cursive;
border-radius: 0px;
outline: none;
&:focus {
  color: #284a60;
  border: solid 3px #284a60;
}
`;

const Input = (props) => <StyledInput onChange={props.onChange} placeholder="Xbox Live Gamer Tag" value={props.value} />

export default Input;
