import React from 'react'
import * as Ui from '../modules.js'

export default () => {
  return (
    <Ui.Main>
      <Ui.Content>
        <Ui.InfoBox title='Non-specific List of Projects:'>
          <ul>
            <li>All</li>
            <li>The</li>
            <li>Many</li>
            <li>Projects</li>
            <li>With</li>
            <li>Dallin</li>
          </ul>
        </Ui.InfoBox>
        <Ui.InfoBox title='Vague List:'>
          <ol>
            <li>Games, Fergusons Plight</li>
            <li>Copying existing webpages for practice</li>
            <li>Making Webpages</li>
          </ol>
        </Ui.InfoBox>
        <Ui.InfoBox title="Ferguson's Plight">
          <div>
            My brother and I are currently learning how to make games together,
            so one day there will be a real game we made together! For now, we
            have our dinky, yet charming, 'Fergusons Plight'
          </div>
          <Ui.Atag
            href='https://fergusonsplight.hunter.osmun.net'
            target={_blank}
          >
            Ferguson's Plight
          </Ui.Atag>
        </Ui.InfoBox>
        <Ui.InfoBox title='To Do List:'>
          <div>Here is a simple To Do List I made:</div>
          <Ui.Atag href={'https://todos.hunter.osmun.net'} target={_blank}>
            To Do
          </Ui.Atag>
        </Ui.InfoBox>
        <Ui.InfoBox title='Ongoing Large Project:'>
          <div>
            Immersive team building project, where team members need to work
            together in order to solve complex prolems without all of the
            information available to them. I lead them through this problem
            solving as the issue they solve is different every time. They are
            varied in background as well as in level of practical and problem
            solving experience. Some need to learn how to use the system that we
            have elected to use for this project and I coach them through it
            all. AKA DnD.
          </div>
        </Ui.InfoBox>
      </Ui.Content>
    </Ui.Main>
  )
}
