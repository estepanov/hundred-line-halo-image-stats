import React from "react";
import styled from 'styled-components';

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
border-bottom: ${props => props.borderBottom ? 'solid 1px #25333e' : 'none'};
padding: 10px;
flex-shrink: 0;
`;

const SectionBox = (props) => <Container borderBottom={props.borderBottom}>{props.children}
</Container>

export default SectionBox;
