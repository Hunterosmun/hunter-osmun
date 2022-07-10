import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import * as Ui from '../../ui'
import { nanoid } from 'nanoid'
import { cloneDeep } from 'lodash'

export default function TicTac () {
  return (
    <Ui.Wrapper>
      <Ui.Floaty left='10px' top='10px'>
        <Verticle>
          <Ui.Button as={Link} to='/'>
            Home
          </Ui.Button>
          <Ui.Button as={Link} to='/tictactoetactoe/rules'>
            Rules
          </Ui.Button>
        </Verticle>
      </Ui.Floaty>
      <Game />
    </Ui.Wrapper>
  )
}

const Verticle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-color: #414141;
  padding: 10px;
`

function Game () {
  const size = 48
  const arr = ['', '', '', '', '', '', '', '', '']
  const [current, setCurrent] = React.useState(
    arr.map(el => ({
      state: '',
      board: ['', '', '', '', '', '', '', '', '']
    }))
  )
  const [turn, setTurn] = React.useState(true)
  const [active, setActive] = React.useState(4)

  if (current[active]?.board?.filter(b => b === '')?.length === 0) setActive('')

  const gameWon = checkWin({ board: current.map(b => b.state), state: '' })
  if (gameWon && active !== 9) setActive(9)

  return (
    <Wrap size={size}>
      <Info>
        {gameWon ? `Winner: ${gameWon}` : `Turn: ${turn ? 'X' : 'O'}`}
        <Ui.Button
          onClick={() => {
            setCurrent(
              arr.map(el => ({
                state: '',
                board: ['', '', '', '', '', '', '', '', '']
              }))
            )
            setActive(4)
            setTurn(true)
          }}
        >
          Restart
        </Ui.Button>
      </Info>
      <BigBoard size={size}>
        {current.map((b, i) => {
          return (
            <Board
              key={`board-number-${i}`}
              num={i}
              b={b}
              size={size}
              set={setCurrent}
              turn={turn}
              setTurn={setTurn}
              isActive={active === i || active === ''}
              setActive={setActive}
            />
          )
        })}
      </BigBoard>
      <div>
        <Board
          b={{ board: current.map(b => b.state), state: gameWon }}
          isActive={false}
          size={size}
          set={() => console.log("You don't click this board silly!")}
          setTurn={() => console.log('')}
        />
      </div>
    </Wrap>
  )
}

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Info = styled.div`
  position: absolute;
  bottom: 40px;
  right: 50vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
`

const BigBoard = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: ${p => p.size * 11}px;
  height: ${p => p.size * 10.5}px;
`

function Board ({ b, size, num, set, turn, setTurn, isActive, setActive }) {
  return (
    <Grid size={size} place={num}>
      {b.board.map((box, i) => (
        <Square
          key={nanoid()}
          size={size}
          place={i}
          active={isActive}
          color={box}
          state={b.state}
          onClick={() => {
            if (box !== '' || !isActive) return
            set(all => {
              const newBoard = cloneDeep(all)
              newBoard[num].board[i] = turn ? 'X' : 'O'
              newBoard[num].state = checkWin(newBoard[num])
              return newBoard
            })
            setTurn(!turn)
            setActive(i)
          }}
        >
          {box}
        </Square>
      ))}
    </Grid>
  )
}

const WINS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function checkWin (b) {
  if (b.state !== '') return b.state

  const result = WINS.flatMap(w => {
    if (
      b.board[w[0]] &&
      b.board[w[0]] === b.board[w[1]] &&
      b.board[w[0]] === b.board[w[2]]
    ) {
      return b.board[w[0]]
    }
    return []
  })

  return !result.length ? '' : result[0]
}

const Square = styled.div`
  width: ${p => p.size}px;
  height: ${p => p.size}px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${p =>
    p.color === 'X' ? 'coral' : p.color === 'O' ? 'lightgreen' : 'white'};

  border-top: ${p =>
    [6, 7, 8].includes(p.place)
      ? `1px solid ${
        p.active
          ? 'yellow'
          : p.state === 'X'
            ? 'coral'
            : p.state === 'O'
              ? 'lightgreen'
              : 'white'
      }`
      : ''};
  border-bottom: ${p =>
    [0, 1, 2].includes(p.place)
      ? `1px solid ${
        p.active
          ? 'yellow'
          : p.state === 'X'
            ? 'coral'
            : p.state === 'O'
              ? 'lightgreen'
              : 'white'
      }`
      : ''};
  border-right: ${p =>
    [0, 3, 6].includes(p.place)
      ? `1px solid ${
        p.active
          ? 'yellow'
          : p.state === 'X'
            ? 'coral'
            : p.state === 'O'
              ? 'lightgreen'
              : 'white'
      }`
      : ''};
  border-left: ${p =>
    [2, 5, 8].includes(p.place)
      ? `1px solid ${
        p.active
          ? 'yellow'
          : p.state === 'X'
            ? 'coral'
            : p.state === 'O'
              ? 'lightgreen'
              : 'white'
      }`
      : ''};
`

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: ${p => p.size * 3}px;
  height: ${p => p.size * 3}px;
  padding: 12px;

  border-top: ${p => ([6, 7, 8].includes(p.place) ? '4px solid white' : '')};
  border-bottom: ${p => ([0, 1, 2].includes(p.place) ? '4px solid white' : '')};
  border-right: ${p => ([0, 3, 6].includes(p.place) ? '4px solid white' : '')};
  border-left: ${p => ([2, 5, 8].includes(p.place) ? '4px solid white' : '')};
`
