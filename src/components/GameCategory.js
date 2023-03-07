import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/GamePage.module.css'

const GameCategory = ({ category }) => {
  return (
    <div className={styles['game-page-category-container']}>
      {category && (
        <span className={styles['game-page-category']}>
          Category: {category}
        </span>
      )}
    </div>
  )
}

GameCategory.propTypes = {
  category: PropTypes.string,
}

export default GameCategory
