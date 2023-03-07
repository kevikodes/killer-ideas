import React from 'react'
import styles from '../styles/Idea.module.css'

const Idea = ({ text }) => {
  return (
    <div className={styles['idea-container']}>
      <p className={styles['idea-text']}>{text}</p>
    </div>
  )
}

export default Idea
