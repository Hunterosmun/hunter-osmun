import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import * as Ui from '../../ui'

// Conways Game of Life

function useAnimationFrame (fn) {
  const stopId = React.useRef()
  const [active, setActive] = React.useState(false)

  function loop () {
    fn()
    stopId.current = window.requestAnimationFrame(loop)
    setActive(true)
  }

  /*
    could have instead made all the functions above, then returned them as an array,
    then when declared in the main function the user can destructure the names out to whatever they want them to be
    IE: [startThing, stoptheTRAIN, running?!!] = useAnimationFrame(func)
  */
  return {
    start: () => loop(),
    stop: () => {
      window.cancelAnimationFrame(stopId.current)
      stopId.current = null
      setActive(false)
    },
    active
  }
}

export default function Conways () {
  const [numOfRows, setRows] = React.useState(25)
  const [numOfCols, setCols] = React.useState(44)
  const [size, setSize] = React.useState(26)
  const animation = useAnimationFrame(step)
  const [wrap, setWrap] = React.useState(true)
  const [update, trick] = React.useState(0) // eslint-disable-line
  const [active, setActive] = React.useState(false)

  const refRows = React.useRef()
  refRows.current = numOfRows
  const refLiv = React.useRef()
  refLiv.current = refLiv.current || {}
  const refwrap = React.useRef()
  refwrap.current = wrap

  React.useEffect(() => {
    const obj = {}
    for (let i = 0; i < numOfRows * numOfCols; i++) {
      obj[i] = false
    }
    refLiv.current = obj
    trick(Math.random())
  }, [numOfCols, numOfRows])

  function step () {
    const oldLife = { ...refLiv.current }
    const numOfRows = refRows.current
    const numOfCols = Object.keys(refLiv.current).length / numOfRows
    const wrap = refwrap.current

    function at (board, x, y) {
      if (wrap) {
        const _x = (x + numOfCols) % numOfCols
        const _y = (y + numOfRows) % numOfRows
        return board[_y * numOfCols + _x]
      } else {
        if (x === -1 || y === -1 || x === numOfCols || y === numOfRows) {
          return false
        }
        return board[y * numOfCols + x]
      }
    }

    Object.keys(oldLife).forEach(el => {
      let livingTouch = 0
      const x = +el % numOfCols
      const y = Math.floor(+el / numOfCols)

      // top
      if (at(oldLife, x - 1, y + 1)) livingTouch += 1
      if (at(oldLife, x, y + 1)) livingTouch += 1
      if (at(oldLife, x + 1, y + 1)) livingTouch += 1

      // bottom
      if (at(oldLife, x - 1, y - 1)) livingTouch += 1
      if (at(oldLife, x, y - 1)) livingTouch += 1
      if (at(oldLife, x + 1, y - 1)) livingTouch += 1

      // sides
      if (at(oldLife, x + 1, y)) livingTouch += 1
      if (at(oldLife, x - 1, y)) livingTouch += 1

      // 1) Any live cell with fewer than two live neighbours dies, as if by underpopulation.
      if (oldLife[el] === true && livingTouch < 2) refLiv.current[el] = false

      // 2) Any live cell with two or three live neighbours lives on to the next generation.
      if (oldLife[el] === true && (livingTouch === 3 || livingTouch === 2)) {
        refLiv.current[el] = true
      }

      // 3) Any live cell with more than three live neighbours dies, as if by overpopulation.
      if (oldLife[el] === true && livingTouch > 3) refLiv.current[el] = false

      // 4) Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
      if (oldLife[el] === false && livingTouch === 3) refLiv.current[el] = true
    })

    trick(Math.random())
  }

  return (
    <Ui.Wrapper row>
      <TopBox>Conway's Game of Life </TopBox>
      <Ui.Floaty left='10px' top='10px'>
        <Verticle>
          <Ui.Button as={Link} to='/'>
            Home
          </Ui.Button>
          <Ui.Button as={Link} to='/conways/rules'>
            Rules
          </Ui.Button>
          <Ui.Button onClick={() => setActive(!active)}>Controls</Ui.Button>
        </Verticle>
      </Ui.Floaty>
      {active && (
        <>
          <Ui.PopupClose onClick={() => setActive(false)} />
          <BtnBox>
            {!animation.active ? (
              <button
                style={{ backgroundColor: '#90ee90' }}
                onClick={() => {
                  animation.start()
                }}
              >
                Start
              </button>
            ) : (
              <button
                style={{ backgroundColor: '#f36060' }}
                onClick={() => {
                  animation.stop()
                }}
              >
                Stop
              </button>
            )}
            <button onClick={() => step()}>Step</button>
            <button
              onClick={() => {
                Object.keys(refLiv.current).forEach(el => {
                  if (Math.floor(Math.random() * 10) > 5) {
                    refLiv.current[el] = true
                  } else {
                    refLiv.current[el] = false
                  }
                })
                trick(Math.random())
              }}
            >
              Randomize
            </button>
            <button
              onClick={() => {
                for (let i = 0; i < numOfRows * numOfCols; i++) {
                  refLiv.current[i] = false
                }
                animation.stop()
                trick(Math.random())
              }}
            >
              Clear
            </button>
            <label>Rows</label>
            <input
              style={{ width: '90px' }}
              type='range'
              min='3'
              value={numOfRows}
              onChange={e => {
                setRows(e.target.valueAsNumber)
              }}
            />
            <label>Columns</label>
            <input
              style={{ width: '90px' }}
              type='range'
              min='3'
              value={numOfCols}
              onChange={e => {
                setCols(e.target.valueAsNumber)
              }}
            />
            <label>Box Size</label>
            <input
              style={{ width: '90px' }}
              type='range'
              value={size}
              onChange={e => {
                setSize(e.target.valueAsNumber)
              }}
            />
            <button
              onClick={() => {
                setSize(26)
                setCols(44)
                setRows(25)
              }}
            >
              Default
            </button>
            <div>
              <button
                onClick={() => {
                  for (let i = 0; i < 5; i++) {
                    step()
                  }
                }}
              >
                +5
              </button>
              <button
                onClick={() => {
                  for (let i = 0; i < 10; i++) {
                    step()
                  }
                }}
              >
                +10
              </button>
              <button
                onClick={() => {
                  for (let i = 0; i < 20; i++) {
                    step()
                  }
                }}
              >
                +20
              </button>
            </div>
            <button onClick={() => setWrap(!wrap)}>
              {wrap ? 'continuous' : 'bordered'}
            </button>
          </BtnBox>
        </>
      )}
      <GridHolder>
        <GridBlock numOfCols={numOfCols} size={size}>
          {Object.keys(refLiv.current).map(el => (
            <Block
              key={el}
              active={refLiv.current[el]}
              size={size}
              onMouseOver={e => {
                if (!e.buttons) return
                const was = refLiv.current[el]
                refLiv.current[el] = !was
                trick(Math.random())
              }}
              onClick={() => {
                const was = refLiv.current[el]
                refLiv.current[el] = !was
                trick(Math.random())
              }}
            />
          ))}
        </GridBlock>
      </GridHolder>
    </Ui.Wrapper>
  )
}

const Block = styled.div`
  background-color: ${p => (p.active ? 'black' : 'white')};
  box-sizing: border-box;
  min-width: ${p => p.size}px;
  min-height: ${p => p.size}px;
  border: 1px solid black;
`

const GridBlock = styled.div`
  width: ${p => p.size * p.numOfCols}px;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  padding-left: 32px;
`

const GridHolder = styled.div`
  max-width: 80%;
  max-height: 80vh;
  overflow: auto;
`

const BtnBox = styled.div`
  position: absolute;
  top: 120px;
  left: 0;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  width: 120px;
  gap: 8px;
  background-color: #414141;
  padding: 10px;
  border-radius: 5px;
  z-index: 2;
  div button {
    padding: 4px 4px;
    margin-right: 4px;
  }
  button {
    padding: 8px 12px;
    margin-right: 8px;
    border: 1px solid #777;
    border-radius: 4px;
    &:hover {
      background-color: #ccc;
    }
    &:active {
      background-color: #aaa;
    }
  }
`

const TopBox = styled.div`
  position: absolute;
  top: 12px;
  @media (max-width: 720px) {
    font-size: 24px;
    right: 12px;
  }
  @media not all and (max-width: 720px) {
    font-size: 60px;
  }
`

const Verticle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 90px;
  background-color: #414141;
  padding: 10px;
`
