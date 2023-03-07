import React from 'react'
import styles from '../styles/GameOverPage.module.css'
import Link from 'next/link'

const GameOverPage = () => {
  let score
  if (typeof window !== 'undefined') {
    // code that uses window object
    score = parseInt(window.location.search.replace('?score=', ''))
  }

  return (
    <div className={styles['game-over-page-container']}>
      <h1 className={styles['game-over-page-title']}>Game Over</h1>
      <p className={styles['game-over-page-score']}>Score: {score}</p>
      <Link href='/' passHref className={styles['game-over-page-button']}>
        Back to HomePage
      </Link>
    </div>
  )
}

export default GameOverPage
