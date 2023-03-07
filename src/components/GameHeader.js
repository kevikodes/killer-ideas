import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/GamePage.module.css'

const GameHeader = ({ timeLeft, score, category }) => {
  return (
    <div className={styles['game-page-heading']}>
      <h1 className={styles['game-page-title']}>Killer Ideas</h1>

      <div>
        <p className={styles['game-page-time-left']}>Time Left: {timeLeft}s</p>
        <p className={styles['game-page-score']}>Score: {score}</p>
      </div>
    </div>
  )
}

GameHeader.propTypes = {
  timeLeft: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  category: PropTypes.string,
}

export default GameHeader
