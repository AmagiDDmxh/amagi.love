import React, { Component } from 'react';

interface CardProps {
  title: string
  description?: string

  status: 'snap' | 'progressing' | 'solved'
}

const Card = ({ title, description, status }: CardProps) => (
  <div className={`card card--${status}`}>
    <div className="card-heading">{title}</div>
    {description && (<>
      <div className="divider"></div>
      <div className="content">{description}</div>
    </>
    )}
  </div>
)

const renderCards = (cards: CardProps[]) => {
  return cards.map(props => (<Card {...props} />))
}

const data: CardProps[] = [
  { title: 'Personal Blog', description: 'A personal blog', status: 'progressing'  },
  { title: 'Little Parser', description: 'A little parser that could simply parse lisp syntax, and provide execution!', status: 'snap'  },
  { title: 'Little Hearth Stone', description: 'Game mock of Hearth Stone. I aways wanna try to play hearth stone without purchased new card to play the new sesason, hopely this would not be a dream soon', status: 'snap'  },
  { title: 'Little Vuex', description: 'Wrapper of vuex', status: 'snap' },
  { title: 'Little Chat', description: 'Chatting up with my adorable room mate', status: 'snap' },
]

class Ideas extends Component {
  render() {
    return (
      <div>
        <h1>Ideas</h1>
        <p>I aways have some ideas bubble through my mind, I want to implement them, catch them before the meteor fall out of sign, before the end of my life.</p>
        <main className="card-list">
          {renderCards(data)}
        </main>
      </div>
    );
  }
}

export default Ideas;