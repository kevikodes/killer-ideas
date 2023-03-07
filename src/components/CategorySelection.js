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
        <option value='1 vs 100'>1 vs 100</option>
        <option value='I tried ____ for 30 days'>
          I tried ____ for 30 days
        </option>
        <option value='How ______ Makes _____ a year'>
          How ______ Makes _____ a year
        </option>
        <option value='I let ________ control my life for 24 hours'>
          I let ________ control my life for 24 hours
        </option>
        <option value='$1 vs $1,000'>$1 vs $1,000</option>
        <option value='I survived 50 hours doing ______'>
          I survived 50 hours doing ______
        </option>
        <option value='__________ in real life'>__________ in real life</option>
        <option value='__________ in __________'>
          __________ in __________
        </option>
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
