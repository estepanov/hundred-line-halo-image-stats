import React from 'react'
import styled from 'styled-components'

const Wait = styled.div`
  padding: 20px;
  color: white;
  background-color: #4b738d;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  max-width: 480px;
  width: 100%;
  flex-wrap: wrap;
`;

const Time = styled.span`
  font-size: 1.2em;
  font-weight: bold;
  padding: 7px;
  width: 1em;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const WaitComponent = ({ seconds }) => <Wait>
  Please wait <Time>{seconds}</Time> seconds before making another request.
</Wait>


export default WaitComponent
