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
      <Ui.LinkHolder>
        <a
          href='https://github.com/Hunterosmun'
          target='_blank'
          rel='noreferrer'
        >
          <img src={github} alt='Github' />
        </a>
        <a
          href='https://www.linkedin.com/in/hunter-osmun/'
          target='_blank'
          rel='noreferrer'
        >
          <img src={linkedin} alt='Linkedin' />
        </a>
      </Ui.LinkHolder>
      <Ui.Spacer />
      <Ui.Title>Hunter Osmun</Ui.Title>
      <Ui.Subtitle>Software Engineer</Ui.Subtitle>
      <Ui.ButtonWrap>
        <Ui.Button as={Link} to='/about'>
          About
        </Ui.Button>
        <Ui.Button onClick={() => setActive(!active)}>Portfolio</Ui.Button>
        {active && (
          <>
            <Ui.PopupClose onClick={() => setActive(false)} />
            <Ui.Popup>
              <Ui.Button as={Link} to='/conways'>
                Conways Game
              </Ui.Button>
              <Ui.Button as={Link} to='/todo'>
                Task Manager
              </Ui.Button>
              <Ui.Button as={Link} to='/loadcube'>
                Loading Cube
              </Ui.Button>
              <Ui.Button as={Link} to='/TicTacToeTacToe'>
                TicTacToeTacToe
              </Ui.Button>
            </Ui.Popup>
          </>
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

/*

To do:
Add more stuff to portfolio
  Sticky Scroller (several lines that move separately when you scroll, one after another as you scroll, then forming back into a alignment)
Change Favicon on title

*/
