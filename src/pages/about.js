import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import github from '../images/github.png'
import linkedin from '../images/linkedin.png'

import * as Ui from '../ui'

export default function About () {
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
          href='https://www.linkedin.com/in/hunter-osmun-1069b2230/'
          target='_blank'
          rel='noreferrer'
        >
          <img src={linkedin} alt='Linkedin' />
        </a>
      </Ui.LinkHolder>
      <InnerWrap>
        <Ui.ButtonWrap>
          <Ui.Button as={Link} to='/'>
            Home
          </Ui.Button>
        </Ui.ButtonWrap>
        <div>
          I am a software engineer with a passion for coding. I'm excited for a
          challenge and always look forward to learning new things.
        </div>
        <h4>Skills</h4>
        <ul>
          <li>Plain Javascript, HTML, CSS</li>
          <li>React, Node</li>
        </ul>
        <h4>Software Engineering Intern at Kuali</h4>
        <ul>
          <li>Working on new features (both front and back end)</li>
          <li>Helping report and fix bugs</li>
          <li>
            Participating in (and occasionally leading) weekly brown bag
            meetings
          </li>
          <li>Keeping dependencies up to date</li>
        </ul>
        <h4>Contact</h4>
        Email: Hunter@Osmun.net
      </InnerWrap>
      <Ui.Spacer />
    </Ui.Wrapper>
  )
}

const InnerWrap = styled.div`
  @media (max-width: 400px) {
    width: 300px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  @media not all and (max-width: 400px) {
    width: 425px;
    overflow: auto;
  }
  padding-top: 64px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: start;

  & h4 {
    margin: 16px 0;
    border-bottom: 1px solid white;
  }
  & ul {
    margin: 0;
    padding-left: 20px;
  }
  & div {
    padding-top: 8px;
  }
`
