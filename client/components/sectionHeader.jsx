import React from "react";
import styled from 'styled-components';

const Container = styled.div`
font-size: 1.2em;
color: #25333e;
`

const SectionHeader = (props) => <Container>{props.children}
</Container>

export default SectionHeader;
