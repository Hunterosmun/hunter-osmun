import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import * as Ui from '../../ui'

export default function Cube () {
  const [spread, setSpread] = React.useState(100)
  const [speed, setSpeed] = React.useState(5)
  const [color, setColor] = React.useState({
    1: '#666',
    2: '#666',
    3: '#666',
    4: '#666',
    5: '#666',
    6: '#666'
  })

  const newCol = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`
  return (
    <Ui.Wrapper>
      <Ui.Floaty left='10px' top='10px'>
        <Verticle>
          <Ui.Button as={Link} to='/'>
            Home
          </Ui.Button>
          <div>
            <Ui.Button
              onClick={() => {
                if (speed >= 20) return
                setSpeed(speed + 1)
              }}
            >
              Slower
            </Ui.Button>
            <Ui.Button
              onClick={() => {
                if (speed === 0) return
                setSpeed(speed - 1)
              }}
            >
              Faster
            </Ui.Button>
          </div>
          <input
            type='range'
            min='50'
            max='400'
            value={spread}
            onChange={e => {
              setSpread(e.target.valueAsNumber)
            }}
          />
          <Ui.Button
            onClick={() => {
              setColor({
                1: newCol(),
                2: newCol(),
                3: newCol(),
                4: newCol(),
                5: newCol(),
                6: newCol()
              })
            }}
          >
            Color
          </Ui.Button>
        </Verticle>
      </Ui.Floaty>
      <Holder>
        <CubeGraphic speed={speed}>
          <CubeSide1 spread={spread} color={color[1]} />
          <CubeSide2 spread={spread} color={color[2]} />
          <CubeSide3 spread={spread} color={color[3]} />
          <CubeSide4 spread={spread} color={color[4]} />
          <CubeSide5 spread={spread} color={color[5]} />
          <CubeSide6 spread={spread} color={color[6]} />
        </CubeGraphic>
      </Holder>
    </Ui.Wrapper>
  )
}

const Holder = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
`
const CubeGraphic = styled.div`
  height: 100%;
  width: 100%;

  @keyframes spinForever {
    from {
      transform: rotate3d(0, 0, 0, 0);
    }
    to {
      transform: rotate3d(1, -4, 2, 360deg);
    }
  }

  animation-duration: ${p => p.speed ?? 5}s;
  animation-name: spinForever;
  animation-iteration-count: infinite;
  animation-direction: alternate;

  transform-style: preserve-3d;
  /* :hover {
    transform: rotate3d(1, -4, 2, 360deg);
  }
  transition: all ease-in-out 2s; */
`

const CubeSide = styled.div`
  width: 200px;
  height: 200px;
  background-color: ${p => p.color ?? '#666'};
  border: 2px solid black;
  position: absolute;
  opacity: 0.2;
`

const CubeSide1 = styled(CubeSide)`
  transform: translateZ(${p => p.spread || 100}px);
`

const CubeSide2 = styled(CubeSide)`
  transform: rotateY(90deg) translateZ(${p => p.spread || 100}px);
`

const CubeSide3 = styled(CubeSide)`
  transform: rotateX(90deg) translateZ(-${p => p.spread || 100}px);
`
const CubeSide4 = styled(CubeSide)`
  transform: translateZ(-${p => p.spread || 100}px);
`
const CubeSide5 = styled(CubeSide)`
  transform: rotateY(90deg) translateZ(-${p => p.spread || 100}px);
`
const CubeSide6 = styled(CubeSide)`
  transform: rotateX(90deg) translateZ(${p => p.spread || 100}px);
`

const Verticle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 120px;
  background-color: #414141;
  padding: 10px;
`
