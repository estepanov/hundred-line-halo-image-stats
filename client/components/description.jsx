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
`

const Description = () => <Container>
  <SectionBox borderBottom={true}>
    <SectionHeader>What is this?</SectionHeader>
    Now you can generate an image with your Halo 5 profile and statistics that auto-updates.
  </SectionBox>
</Container>

export default Description;
