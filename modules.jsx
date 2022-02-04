import styled from 'styled-components'
import React from 'react'

export const Main = styled.div`
  background-color: white;
  border-radius: 10px;
  margin: 15px;
  padding: 20px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;

  & > h1 {
    align-self: center;
    padding: 10px 50px;
    letter-spacing: 0.5rem;
  }
`

export const Navbar = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #999;

  & > * {
    cursor: pointer;
    border: 1px solid #ddd;
    border-radius: 20px;
    padding: 10px;
    margin: 20px;
    text-decoration: none;
    color: #444;
  }

  & > *:hover,
  & > .active {
    border: 1px solid #999;
    background-color: #eee;
  }
`

export const Content = styled.div`
  border-radius: 10px;
  margin: 15px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export function InfoBox ({ title, children }) {
  return (
    <InfoBoxWrapper>
      {!!title && <InfoBoxTitle>{title}</InfoBoxTitle>}
      {children}
    </InfoBoxWrapper>
  )
}

const InfoBoxWrapper = styled.div`
  min-width: 200px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin: 15px;
  padding: 20px;
`
const InfoBoxTitle = styled.div`
  border-bottom: 1px solid black;
  font-weight: bold;
  padding-bottom: 10px;
  margin-bottom: 10px;
`

export const Atag = styled.a`
  border: none;
  padding: 10px;
  border-radius: 5px;
  background-color: rgba(94, 209, 238, 0.801);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  transition: background-color 100ms;
  cursor: pointer;
  user-select: none;
  margin-top: 15px;
  display: flex;
  position: relative;
  justify-content: center;

  &:hover {
    background-color: rgba(71, 161, 184, 0.801);
  }
  &:active {
    position: relative;
    top: 2px;
    box-shadow: none;
  }
`
