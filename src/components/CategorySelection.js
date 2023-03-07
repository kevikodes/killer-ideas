import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/CategorySelection.module.css'

const CategorySelection = () => {
  const [selectedCategory, setSelectedCategory] = useState('')
  const router = useRouter()

  const handleCategoryChange = event => {
    setSelectedCategory(event.target.value)
  }

  const handleStartGameClick = () => {
    router.push(`/game?category=${selectedCategory}`)
  }

  return (
    <div className={styles.container}>
      <label htmlFor='category-select' className={styles.label}>
        Select a category:
      </label>
      <select
        id='category-select'
        value={selectedCategory}
        onChange={handleCategoryChange}
        className={styles.select}
      >
        <option value=''>Choose a category</option>
        <option value='Take it or double it and give it to the next person'>
          Take it or double it and give it to the next person
        </option>
        <option value='Speed Drawing'>Speed Drawing</option>
        <option value='Q&A'>Q&amp;A</option>
        <option value='Unboxing'>Unboxing</option>
      </select>
      <button
        onClick={handleStartGameClick}
        disabled={!selectedCategory}
        className={styles.button}
      >
        Start Game
      </button>
    </div>
  )
}

export default CategorySelection
