import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
// import ConfettiGenerator from 'confetti-js'

import * as Ui from '../ui'
import github from '../images/github.png'
import linkedin from '../images/linkedin.png'

export default function Main () {
  const [active, setActive] = React.useState(false)

  return (
    <Ui.Wrapper>
      <Ui.Floaty>
        <A
          href='https://github.com/Hunterosmun'
          target='_blank'
          rel='noreferrer'
          style={{ 'margin-right': '20px' }}
        >
          <img src={github} alt='Github' />
        </A>
        <A
          href='https://www.linkedin.com/in/hunter-osmun-1069b2230/'
          target='_blank'
          rel='noreferrer'
        >
          <img src={linkedin} alt='Linkedin' />
        </A>
      </Ui.Floaty>
      <Ui.Spacer />
      <Ui.Title>Hunter Osmun</Ui.Title>
      <Ui.Subtitle>Associate Software Engineer</Ui.Subtitle>
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

const A = styled.a`
  img {
    width: 48px;
    padding: 6px;
  }
  img:hover {
    width: 60px;
    padding: 0px;
  }
`

/*

To do:
Add more stuff to portfolio
Get To-Do app working (local storage or User)
Change Favicon on title
Add Elevator pitch to top of about page
Add js exercism solutions to github
Portfolio tab: need a focus trap (clicking off it needs to exit)

*/
