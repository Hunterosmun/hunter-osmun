import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import * as Ui from '../ui'

// Should I have stuff in here about where I'm from or contact info?

export default function About () {
  return (
    <Ui.Wrapper>
      <InnerWrap>
        <Ui.ButtonWrap>
          <Ui.Button as={Link} to='/'>
            Home
          </Ui.Button>
        </Ui.ButtonWrap>
        <h4>Mentorship with Dallin Osmun</h4>
        <ul>
          <li>Plain Javascript, HTML, CSS</li>
          <li>React, Node</li>
          {/* <li>Training in what is actually used</li> */}
        </ul>
        <h4>Internship at Kuali</h4>
        <ul>
          <li>Keeping dependencies up to date</li>
          <li>Working on new features (both front and back end)</li>
          <li>Helping report and fix bugs</li>
          <li>
            Participating in (and occasionally leading) weekly brown bag
            meetings
          </li>
        </ul>
        <h4>Contact</h4>
        Email: Hunter@Osmun.net
      </InnerWrap>
      <Ui.Spacer />
    </Ui.Wrapper>
  )
}

const InnerWrap = styled.div`
  width: 430px;
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
`
