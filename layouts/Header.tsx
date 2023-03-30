import React from "react";

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
          {/* <li>
            <a href="/ideas" className="text-black hover:bg-black hover:text-white">
              Ideas
            </a>
          </li> */}
          <li>
            <a href="/about" className="text-black hover:bg-black hover:text-white">
              About
            </a>
          </li>
          {/* <li>
            <a href="/heart-beat" className="text-black hover:bg-black hover:text-white">
              My-GitHub-Heart-Beat
            </a>
          </li> */}
          {/* <li>
            <a href="/timeline" className="black hover:bg-black hover:text-white">
              ~/Timeline
            </a>
          </li> */}
          {/* <li>
            <a href="/projects" className="black hover:bg-black hover:text-white">
              ~/Projects
            </a>
          </li> */}
          {/* <li><a href="/">About Me</a></li>
          <li><a href="/ideas">Ideas</a></li>
          <li><a href="/diaries">Public Diary</a></li>
          <li><a href="/maths">Maths</a></li>
          <li><a href="/reading">Reading</a></li>  */}
        </ul>
      </nav>
    </header>
  );
}
