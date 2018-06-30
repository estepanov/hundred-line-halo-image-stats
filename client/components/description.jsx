import React from 'react'
import styled from 'styled-components'
import SectionHeader from './sectionHeader.jsx'
import SectionBox from './sectionBox.jsx'

const Container = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  padding: 10px;
  align-items: center;
  justify-content: center;
`;

const Description = () => (
  <Container>
    <SectionBox borderBottom={true}>
      <SectionHeader>Want to show off your Halo 5 Skills across the web?</SectionHeader>
      Just refrence the provided image url and it will be automatically update
      with your latest Halo 5 profile and statistics.
    </SectionBox>
  </Container>
)

export default Description
