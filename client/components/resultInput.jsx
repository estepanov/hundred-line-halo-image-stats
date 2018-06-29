import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  padding: 20px;
  font-size: 14px;
  color: darkgrey;
  margin: 10px 0 10px 0;
  border: solid 1px darkgrey;
  width: 100%;
  box-sizing: border-box;
  font-family: Verdana, Geneva, sans-serif;
`

const ResultInput = ({ url, onClick }) => (
  <StyledInput
    onClick={e => {
      e.target.select()
      e.target.focus()
    }}
    defaultValue={url}
    value={url}
  />
)

export default ResultInput
