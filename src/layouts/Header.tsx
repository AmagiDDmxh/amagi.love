import React from 'react'
import { Link } from 'react-router-dom'

export interface Props { name: string }

export default function Header({ name }: Props) {
  return (
    <header>
      <h1>{name}</h1>
      <nav>
        <ul>
          <li><Link to="/">~</Link></li>
          {/* <li><a href="/">About Me</a></li>
          <li><a href="/ideas">Ideas</a></li>
          <li><a href="/diaries">Public Diary</a></li>
          <li><a href="/maths">Maths</a></li>
          <li><a href="/reading">Reading</a></li>  */}
          <li><Link to="/timeline">~/Timeline</Link></li>
          <li><Link to="/projects">~/Projects</Link></li>
          <li><Link to="/ideas">~/Ideas</Link></li>
          <li><Link to="/about">~/About</Link></li>
        </ul>
      </nav>
    </header>
  )
}
