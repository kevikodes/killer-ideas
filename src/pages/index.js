import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import CategorySelection from '../components/CategorySelection'

const HomePage = () => {
  const router = useRouter()

  return (
    <div className={styles['home-page-container']}>
      <div className={styles['home-page-heading']}>
        <h1 className={styles['home-page-title']}>Welcome to Killer Ideas</h1>
        <p className={styles['home-page-subtitle']}>
          Start coming up with ideas for YouTube videos!
        </p>
        <CategorySelection />
      </div>
    </div>
  )
}

export default HomePage
