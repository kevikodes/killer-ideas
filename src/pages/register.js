import React, { useState } from 'react'
import Link from 'next/link'
import styles from '../styles/AuthPage.module.css'
import { auth, createUserWithEmailAndPassword, db } from '../utils/firebase'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { doc, addDoc, getDoc, collection } from 'firebase/firestore'
const RegisterPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [displayName, setDisplayName] = useState('')

  const router = useRouter()

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        router.replace('/')
      }
    })
  }, [])

  const handleFormSubmit = async event => {
    event.preventDefault()
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )
      const user = userCredential.user
      user.displayName = displayName
      console.log(user.displayName, '🔥')
      // Log the user in
      await signInWithEmailAndPassword(auth, email, password)
      // Route to home page
      router.push('/')
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className={styles.authPageContainer}>
      <div className={styles.authPageHeader}>
        <h1 className={styles.authPageTitle}>Register</h1>
      </div>
      <div className={styles.authPageBody}>
        <form onSubmit={handleFormSubmit} className={styles.authPageForm}>
          <div className={styles.authPageFormGroup}>
            <label htmlFor='email' className={styles.label}>
              Email:
            </label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={event => setEmail(event.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.authPageFormGroup}>
            <label htmlFor='username' className={styles.label}>
              Username:
            </label>
            <input
              type='text'
              id='username'
              value={displayName}
              onChange={event => setDisplayName(event.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.authPageFormGroup}>
            <label htmlFor='password' className={styles.label}>
              Password:
            </label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={event => setPassword(event.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.authPageFormGroup}>
            <label htmlFor='confirm-password' className={styles.label}>
              Confirm Password:
            </label>
            <input
              type='password'
              id='confirm-password'
              value={confirmPassword}
              onChange={event => setConfirmPassword(event.target.value)}
              required
              className={styles.input}
            />
          </div>
          <button type='submit' className={styles.authPageButton}>
            Register
          </button>
        </form>
        <div className={styles.authPageFooter}>
          <p>
            Already have an account?{' '}
            <Link href='/login' legacyBehavior>
              <a className={styles.link}>Login</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
