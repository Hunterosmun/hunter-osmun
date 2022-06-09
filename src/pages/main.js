import React from 'react'
import { Link } from 'react-router-dom'
// import ConfettiGenerator from 'confetti-js'

import * as Ui from '../ui'
import github from '../images/github.png'
import linkedin from '../images/linkedin.png'

export default function Main () {
  const [active, setActive] = React.useState(false)

  return (
    <Ui.Wrapper>
      <Ui.Floaty>
        <a
          href='https://github.com/Hunterosmun'
          target='_blank'
          rel='noreferrer'
          style={{ 'margin-right': '20px' }}
        >
          <img src={github} alt='Github' width={32} />
        </a>
        <a
          href='https://www.linkedin.com/in/hunter-osmun-1069b2230/'
          target='_blank'
          rel='noreferrer'
        >
          <img src={linkedin} alt='Linkedin' width={32} />
        </a>
      </Ui.Floaty>
      <Ui.Spacer />
      <h1>Hunter Osmun</h1>
      <Ui.ButtonWrap>
        <Ui.Button as={Link} to='/about'>
          About
        </Ui.Button>
        <Ui.Button onClick={() => setActive(!active)}>Sample</Ui.Button>
        {active && (
          <Ui.Popup>
            <Ui.Button as={Link} to='/conways'>
              Conways Game
            </Ui.Button>
            <Ui.Button as={Link} to='/todo'>
              Task Manager
            </Ui.Button>
          </Ui.Popup>
        )}
        <Ui.LinkButton
          href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
          target='_blank'
          rel='noreferrer'
        >
          Party
        </Ui.LinkButton>
      </Ui.ButtonWrap>
      <Ui.Spacer />
      <Ui.Spacer />
    </Ui.Wrapper>
  )
}

// Need to make the sample button drop down to show multiple samples
// RN it technically works, but I feel like I need a focus trap, cause clicking off it does nothing
