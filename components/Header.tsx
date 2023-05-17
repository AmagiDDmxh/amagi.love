import React from 'react'

export default function Header() {
  return (
    <header>
      <nav className="nav">
        <ul>
          <li>
            <a href="/" className="name">
              A
            </a>
          </li>
          <li>
            <a href="/about" className="text-black hover:bg-black hover:text-white">
              About
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
