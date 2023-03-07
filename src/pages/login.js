import React, { useState } from 'react'
import Link from 'next/link'
import styles from '../styles/AuthPage.module.css'
import { signInWithEmailAndPassword } from '../utils/firebase'

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleFormSubmit = event => {
    event.preventDefault()

    signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        // Handle successful login
        console.log('User signed in:', userCredential.user)
      })
      .catch(error => {
        // Handle error
        console.error('Login error:', error.message)
      })
  }

  return (
    <div className={styles.authPageContainer}>
      <div className={styles.authPageHeader}>
        <h1 className={styles.authPageTitle}>
          {isLogin ? 'Login' : 'Register'}
        </h1>
      </div>
      <div className={styles.authPageBody}>
        <form onSubmit={handleFormSubmit} className={styles.authPageForm}>
          <div className={styles.authPageFormGroup}>
            <label htmlFor='email' className={styles.authPageLabel}>
              Email:
            </label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={event => setEmail(event.target.value)}
              required
              className={styles.authPageInput}
            />
          </div>
          <div className={styles.authPageFormGroup}>
            <label htmlFor='password' className={styles.authPageLabel}>
              Password:
            </label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={event => setPassword(event.target.value)}
              required
              className={styles.authPageInput}
            />
          </div>
          <button type='submit' className={styles.authPageButton}>
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <div className={styles.authPageFooter}>
          {isLogin ? (
            <p>
              Don't have an account?{' '}
              <Link href='/register' legacyBehavior>
                <a className={styles.authPageLink}>Register</a>
              </Link>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <Link href='/login' legacyBehavior>
                <a className={styles.authPageLink}>Login</a>
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthPage
