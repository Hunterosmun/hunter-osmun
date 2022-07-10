import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import * as Ui from '../../ui'

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
        Program controls: Click controls to bring up the menu. From there you
        can start the simulation, choose if you want the cells to be effected by
        ones from the other side of the board (continuous) or contained within
        the walls (borderd). To change the color of the cells (alive or dead),
        simply click on the cell or click and drag across the grid.
      </InnerWrap>
      <Ui.Spacer />
    </Ui.Wrapper>
  )
}

const InnerWrap = styled.div`
  @media (max-width: 450px) {
    max-width: 300px;
    width: 300px;
    overflow-x: hidden;
    overflow-y: auto;
    padding-top: 32px;
  }
  width: 425px;
  overflow-x: auto;
  overflow-y: auto;
  padding-top: 64px;
  box-sizing: border-box;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: start;
  padding-bottom: 80px;

  & h4 {
    margin: 8px 0;
    border-bottom: 1px solid white;
  }
  & ol {
    margin-top: 8px;
    padding-left: 40px;
  }
  & ol > li {
    padding-top: 4px;
  }
`
