import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import CategorySelection from '../components/CategorySelection'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../utils/firebase'

const HomePage = () => {
  const router = useRouter()
  const [isAuthChecked, setIsAuthChecked] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        router.push('/')
      } else {
        router.push('/login')
      }
      setIsAuthChecked(true)
    })
  }, [])
  if (!isAuthChecked) return null
  return (
    <div className={styles['home-page-container']}>
      {isAuthChecked && (
        <div className={styles['home-page-heading']}>
          <h1 className={styles['home-page-title']}>Welcome to Killer Ideas</h1>
          <p className={styles['home-page-subtitle']}>
            Start coming up with ideas for YouTube videos!
          </p>
          <CategorySelection />
        </div>
      )}
    </div>
  )
}

export default HomePage
