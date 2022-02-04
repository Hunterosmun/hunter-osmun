import React from 'react'
import * as Ui from '../modules.js'

export default () => {
  return (
    <Ui.Main>
      <Ui.Content>
        <Ui.InfoBox title="Hunter's Interests:">
          <ul>
            <li>Programming</li>
            <li>Watching TV with his Wife</li>
            <li>Dungeons and Dragons</li>
            <li>Reading</li>
            <li>His adorable Dog Zoey</li>
          </ul>
        </Ui.InfoBox>
        <Ui.InfoBox title='Programming Language Experience:'>
          <ul>
            <li>Javascript</li>
            <li>CSS</li>
            <li>HTML</li>
            <li>React</li>
          </ul>
        </Ui.InfoBox>
        <Ui.InfoBox title='Previous Employment:'>
          <ol>
            <li>Oxbow Academy - Mentor</li>
            <li>Home Depot - Cashier, Head Cashier</li>
            <li>Heritage Care Center - CNA, RNA, Driver</li>
          </ol>
        </Ui.InfoBox>
        <Ui.InfoBox title='Schooling:'>
          <div>Current: UVU & Mentorship</div>
          <div>Previous: Utah State University</div>
          <div>Past: Snow College</div>
        </Ui.InfoBox>
      </Ui.Content>
    </Ui.Main>
  )
}
