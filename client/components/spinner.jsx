import React from "react";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
font-size: 1.6em;
margin: 30px;
color: #4b738d;
`;

const SpinKeyframes = keyframes`
  0% { transform: rotate(0deg);}
  100% { transform: rotate(360deg); }
`;

const Spin = styled.div`
margin: 20px;
width: 30px;
height: 30px;
border-top-color: #4b738d;
border-left-color: #4b738d;

animation: ${SpinKeyframes} 1s linear infinite;
border-bottom-color: transparent;
border-right-color: transparent;
border-style: solid;
border-width: 2px;
border-radius: 50%;
box-sizing: border-box;
display: inline-block;
vertical-align: middle;
`;



const Spinner = (props) => <Container>
  <Spin />
  Generating
</Container>

export default Spinner;
