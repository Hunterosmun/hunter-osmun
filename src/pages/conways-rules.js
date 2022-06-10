import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import * as Ui from '../ui'

export default function ConwaysRules () {
  return (
    <Ui.Wrapper>
      <InnerWrap>
        <Ui.ButtonWrap>
          <Ui.Button as={Link} to='/conways'>
            Back
          </Ui.Button>
        </Ui.ButtonWrap>
        <h4>What is Conways Game of Life?</h4>
        The Concept is that Conways game of Life is a life siumalator, each
        block of the grid an individual cell that can be either alive or dead.
        The rules of the game are simple:
        <ol>
          <li>Each cell has neighbors (touching side by side or diagonal).</li>
          <li>
            Any live cell with fewer than two live neighbours dies, as if by
            underpopulation.
          </li>
          <li>
            Any live cell with two or three live neighbours lives on to the next
            generation.
          </li>
          <li>
            Any live cell with more than three live neighbours dies, as if by
            overpopulation.
          </li>
          <li>
            Any dead cell with exactly three live neighbours becomes a live
            cell, as if by reproduction.
          </li>
        </ol>
      </InnerWrap>
      <Ui.Spacer />
    </Ui.Wrapper>
  )
}

const InnerWrap = styled.div`
  width: 430px;
  padding-top: 64px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: start;

  & h4 {
    margin: 8px 0;
    border-bottom: 1px solid white;
  }
  & ol {
    margin-top: 8px;
    padding-left: 20px;
  }
  & ol > li {
    padding-top: 4px;
  }
`
