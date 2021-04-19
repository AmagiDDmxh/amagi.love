import { Heading, Paragraph } from '@dracula/dracula-ui'
import React, { Component } from 'react'

class Projects extends Component {
  render() {
    return (
      <div>
        <Heading color="black">Projects</Heading>
        <Paragraph color="black">
          TBD
          <span className="blink" style={{ fontSize: 20 }}>
            |
          </span>
        </Paragraph>
      </div>
    )
  }
}

export default Projects
