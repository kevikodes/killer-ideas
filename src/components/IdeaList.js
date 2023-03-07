import React from 'react'
import styles from '../styles/GamePage.module.css'
import Idea from './Idea'
const IdeaList = ({ ideasContainerRef, ideas }) => {
  return (
    <ul ref={ideasContainerRef} className={styles['game-page-ideas']}>
      {ideas.map((idea, index) => (
        <li key={index}>
          <Idea text={idea} />
        </li>
      ))}
    </ul>
  )
}

export default IdeaList
