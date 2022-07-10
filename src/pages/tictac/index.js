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

  return (
    <Wrap size={size}>
      <Info>
        Turn: {turn ? 'X' : 'O'}
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
              arr={b.board}
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
        {/* this board holds the final score */}
        <Board
          arr={current.map(b => b.state)}
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

function Board ({ arr, size, num, set, turn, setTurn, isActive, setActive }) {
  return (
    <Grid size={size} place={num}>
      {arr.map((box, i) => (
        <Square
          key={nanoid()}
          size={size}
          place={i}
          active={isActive}
          onClick={() => {
            if (box !== '' || !isActive) return
            set(all => {
              const newBoard = cloneDeep(all)
              newBoard[num].board[i] = turn ? 'X' : 'O'
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

const Square = styled.div`
  width: ${p => p.size}px;
  height: ${p => p.size}px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;

  border-top: ${p =>
    [6, 7, 8].includes(p.place)
      ? `1px solid ${p.active ? 'yellow' : 'white'}`
      : ''};
  border-bottom: ${p =>
    [0, 1, 2].includes(p.place)
      ? `1px solid ${p.active ? 'yellow' : 'white'}`
      : ''};
  border-right: ${p =>
    [0, 3, 6].includes(p.place)
      ? `1px solid ${p.active ? 'yellow' : 'white'}`
      : ''};
  border-left: ${p =>
    [2, 5, 8].includes(p.place)
      ? `1px solid ${p.active ? 'yellow' : 'white'}`
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
