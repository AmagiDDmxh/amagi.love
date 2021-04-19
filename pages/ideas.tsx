import { Heading, Paragraph } from "@dracula/dracula-ui";
import React, { Component } from "react";

const data: CardProps[] = [
  // Blog with project feature
  {
    title: "Personal Blog",
    description: "A personal blog",
    status: "progressing",
    link: "https://github.com/AmagiDDmxh/real-blog",
  },
  {
    title: "Little Parser",
    description:
      "A little parser that could simply parse lisp syntax, and provide execution!",
    status: "snap",
  },
  {
    title: "Little Hearth Stone",
    description:
      "Game mock of Hearth Stone. I aways wanna try to play hearth stone without purchased new card to play the new sesason, hopely this would not be a dream soon",
    status: "snap",
  },
  {
    title: "Little Vuex",
    description: "Wrapper of vuex",
    status: "progressing",
    link: "https://github.com/AmagiDDmxh/little-vuex",
  },
  {
    title: "Little Chat",
    description: "Chatting up with my adorable room mate",
    status: "snap",
  },
  {
    title: "Little File Sharing",
    description: "Local Network File Sharing is a mass",
    status: "snap",
  },
];

interface CardProps {
  title: string;
  description?: string;
  link?: string;
  status: "snap" | "progressing" | "solved";
}

const Card = ({ title, description, status, link }: CardProps) => (
  <a
    className={`card ${
      status === "snap"
        ? "drac-border-orange"
        : status === "progressing"
        ? "drac-border-red"
        : "drac-border-black"
    }`}
    href={link}
    target="_blank"
    rel="noopener noreferrer"
  >
    <div className="card-heading">{title}</div>
    {description && (
      <>
        <div className="divider"></div>
        <div className="content">{description}</div>
      </>
    )}
  </a>
);

const renderCards = (cards: CardProps[]) => {
  return cards.map((props) => <Card {...props} />);
};

class Ideas extends Component {
  render() {
    return (
      <div>
        <Heading color="black">Ideas</Heading>
        <Paragraph color="black" size="sm">
          I always have some ideas bubble through my mind, before the meteor fall out of sign, before the end of
          my life, I want to catch them, and achieve them.
        </Paragraph>
        <main className="card-list">{renderCards(data)}</main>
        <span className="blink" style={{ fontSize: 20 }}>
          |
        </span>
      </div>
    );
  }
}

export default Ideas;
