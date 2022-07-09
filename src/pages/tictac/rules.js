import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import * as Ui from '../../ui'

export default function Rules () {
  return (
    <Ui.Wrapper>
      <InnerWrap>
        <Ui.ButtonWrap>
          <Ui.Button as={Link} to='/tictactoetactoe'>
            Back
          </Ui.Button>
        </Ui.ButtonWrap>
        <h4>How to play?</h4>
        <div>This is TicTacToeTacToe, or Super TicTacToe.</div>
        <div>
          Your goal: Score 3 in a row on the small board to the right, however,
          you cannot directly interact with that board.
        </div>
        <div>
          By scoring the first 3 in a row on any given board inside the large
          TicTacToe board, you will score a mark on the right board.
        </div>
        <div>
          The catch: Whatever place you put your mark, your opponent will be
          sent to the corresponding board on the big board.
        </div>
        <h4>Other rules: </h4>
        <div>
          When a board has recieved it's first score it becomes a "won board."
          This is still a board that you can be sent to, however it will waste
          your turn.
        </div>
        <div>A cat/draw game will put no mark on the small board.</div>
        <div>
          If you are sent to a board that is full, you get to choose what board
          to play next.
        </div>
      </InnerWrap>
      <Ui.Spacer />
    </Ui.Wrapper>
  )
}

const InnerWrap = styled.div`
  @media (max-width: 400px) {
    max-width: 300px;
    overflow-x: hidden;
    overflow-y: auto;
    padding-top: 32px;
  }
  @media not all and (max-width: 400px) {
    width: 425px;
    overflow: auto;
    padding-top: 64px;
  }
  box-sizing: border-box;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: start;
  padding-bottom: 80px;

  div {
    padding: 16px 0;
  }
  h4 {
    margin: 0;
    padding: 8px 0;
  }
`
