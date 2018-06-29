import React from "react";
import styled from "styled-components";
import SectionHeader from "./sectionHeader.jsx";
import SectionBox from "./sectionBox.jsx";

const Container = styled.div`
display: flex;
flex-shrink: 0;
flex-direction: column;
padding: 10px;
align-items: center;
justify-content: center;
background-color: red;
color: white;
margin: 20px;
`;

const Error = ({ error }) => <Container>
  <SectionBox borderBottom={false}>
    <SectionHeader color="white">{error.title}</SectionHeader>
    {error.message}
  </SectionBox>
</Container>

export default Error;
