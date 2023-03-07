import React from 'react'
import styles from '../styles/GamePage.module.css'
const GameForm = ({ inputRef, handleFormSubmit }) => {
  return (
    <form onSubmit={handleFormSubmit} className={styles['game-page-form']}>
      <div className={styles['game-page-input-container']}>
        <input
          type='text'
          name='idea'
          placeholder='Enter an idea (max 60 characters)'
          className={styles['game-page-input']}
          autoComplete='off'
          maxLength='60'
          required
          ref={inputRef}
        />
      </div>
      <button type='submit' className={styles['game-page-button']}>
        Submit
      </button>
    </form>
  )
}

export default GameForm
