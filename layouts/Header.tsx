import React from "react";
import { Anchor } from "@dracula/dracula-ui";

export interface Props {
  name: string;
}

export default function Header({}: Props) {
  return (
    <header>
      <nav className="nav">
        <ul>
          <li>
            <a href="/" className="name">
              ~/A
            </a>
          </li>
          <li>
            <Anchor href="/timeline" color="black" hoverColor="black">
              ~/Timeline
            </Anchor>
          </li>
          <li>
            <Anchor href="/projects" color="black" hoverColor="black">
              ~/Projects
            </Anchor>
          </li>
          <li>
            <Anchor href="/ideas" color="black" hoverColor="black">
              ~/Ideas
            </Anchor>
          </li>
          <li>
            <Anchor href="/about" color="black" hoverColor="black">
              ~/About
            </Anchor>
          </li>
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
