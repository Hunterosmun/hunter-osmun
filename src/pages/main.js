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
      <LinkHolder>
        <a
          href='https://github.com/Hunterosmun'
          target='_blank'
          rel='noreferrer'
        >
          <img src={github} alt='Github' />
        </a>
        <a
          href='https://www.linkedin.com/in/hunter-osmun-1069b2230/'
          target='_blank'
          rel='noreferrer'
        >
          <img src={linkedin} alt='Linkedin' />
        </a>
      </LinkHolder>
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

const LinkHolder = styled.div`
  a:first-child {
    margin-right: 12px;
  }
  img {
    width: 48px;
    padding: 6px;
    transition: all 0.2s ease-in-out;
  }
  img:hover {
    width: 60px;
    padding: 0px;
    transition: all 0.2s ease-in-out;
  }
  position: absolute;
  @media (max-width: 720px) {
    top: 24px;
    right: 24px;
  }
  @media not all and (max-width: 720px) {
    top: 50px;
    right: 60px;
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
