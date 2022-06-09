import React from 'react'
import { Link } from 'react-router-dom'

import * as Ui from '../ui'

export default function Sample () {
  return (
    <Ui.Wrapper>
      <Ui.Spacer />
      <h1>A Sample?!</h1>
      <Ui.ButtonWrap>
        <Ui.Button as={Link} to='/'>
          Home
        </Ui.Button>
      </Ui.ButtonWrap>
      <Ui.Spacer />
      <Ui.Spacer />
    </Ui.Wrapper>
  )
}

// Samples I can show:
// Conways Game of Life
// My To-Do list
