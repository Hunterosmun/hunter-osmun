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
  const [sizingActive, setSizingActive] = React.useState(false)
  const [stepActive, setStepActive] = React.useState(false)

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
        </Verticle>
      </Ui.Floaty>
      <BtnBox>
        {!animation.active ? (
          <Ui.Button
            style={{ color: '#90ee90' }}
            onClick={() => {
              animation.start()
            }}
          >
            Start
          </Ui.Button>
        ) : (
          <Ui.Button
            style={{ color: '#f36060' }}
            onClick={() => {
              animation.stop()
            }}
          >
            Stop
          </Ui.Button>
        )}
        <div>
          <Ui.Button onClick={() => setStepActive(!stepActive)}>Step</Ui.Button>
          {stepActive && (
            <>
              <Ui.PopupClose onClick={() => setStepActive(false)} />
              <BtnBox column higher>
                <Ui.Button onClick={() => step()}>+1</Ui.Button>
                <Ui.Button
                  onClick={() => {
                    for (let i = 0; i < 5; i++) {
                      step()
                    }
                  }}
                >
                  +5
                </Ui.Button>
                <Ui.Button
                  onClick={() => {
                    for (let i = 0; i < 10; i++) {
                      step()
                    }
                  }}
                >
                  +10
                </Ui.Button>
                <Ui.Button
                  onClick={() => {
                    for (let i = 0; i < 20; i++) {
                      step()
                    }
                  }}
                >
                  +20
                </Ui.Button>
              </BtnBox>
            </>
          )}
        </div>
        <Ui.Button
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
        </Ui.Button>
        <Ui.Button
          onClick={() => {
            for (let i = 0; i < numOfRows * numOfCols; i++) {
              refLiv.current[i] = false
            }
            animation.stop()
            trick(Math.random())
          }}
        >
          Clear
        </Ui.Button>
        <div>
          <Ui.Button onClick={() => setSizingActive(!sizingActive)}>
            Sizing
          </Ui.Button>
          {sizingActive && (
            <>
              <Ui.PopupClose onClick={() => setSizingActive(false)} />
              <BtnBox column higher>
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
                  min='6'
                  value={size}
                  onChange={e => {
                    setSize(e.target.valueAsNumber)
                  }}
                />
                <Ui.Button
                  onClick={() => {
                    setSize(26)
                    setCols(44)
                    setRows(25)
                  }}
                >
                  Default
                </Ui.Button>
              </BtnBox>
            </>
          )}
        </div>
        <Ui.Button onClick={() => setWrap(!wrap)}>
          {wrap ? 'Continuous' : 'Bordered'}
        </Ui.Button>
      </BtnBox>
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
  max-width: 90%;
  max-height: 80vh;
  overflow: auto;
`

const BtnBox = styled.div`
  display: flex;
  flex-direction: ${p => (p.column ? 'column' : 'row')};
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  position: absolute;
  bottom: ${p => (p.higher ? '48' : '24')}px;

  padding: 16px;
  gap: 8px;
  background-color: #414141;
  box-shadow: ${p => (p.column ? '2px 2px 2px black' : 'none')};
  border-radius: 5px;
  z-index: 2;

  div {
    display: flex;
    align-items: center;
  }
`

const TopBox = styled.div`
  position: absolute;
  top: 12px;
  font-size: 60px;
  @media (max-width: 720px) {
    font-size: 24px;
    right: 12px;
  }
`

const Verticle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-color: #414141;
  padding: 10px;
`
