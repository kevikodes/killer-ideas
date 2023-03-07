import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Confetti from 'react-confetti'
import { Howl } from 'howler'
import styles from '../styles/GamePage.module.css'
import { useRef } from 'react'
import GameHeader from '@/components/GameHeader'
import GameForm from '@/components/GameForm'
import IdeaList from '@/components/IdeaList'
import GameCategory from '@/components/GameCategory'

const whoosh = new Howl({
  src: ['../assets/sounds/whoosh.mp3'],
})

const mouseClick = new Howl({
  src: ['../assets/sounds/mouseclick.mp3'],
})

const GamePage = () => {
  const [ideas, setIdeas] = useState([])
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [confettiActive, setConfettiActive] = useState(false)
  const [category, setCategory] = useState('')
  const router = useRouter()
  let intervalId

  const inputRef = useRef(null)
  const ideasContainerRef = useRef(null)

  useEffect(() => {
    intervalId = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    const { category } = router.query
    setCategory(category)
  }, [])

  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(intervalId)
      setConfettiActive(false)
      router.push(`/gameover?score=${score}`)
    }
  }, [timeLeft])

  useEffect(() => {
    if (ideasContainerRef.current) {
      ideasContainerRef.current.scrollTop =
        ideasContainerRef.current.scrollHeight
    }
  }, [ideas])

  useEffect(() => {
    const { category } = router.query
    if (category) {
      setCategory(category)
    }
  }, [router.query])

  const handleFormSubmit = async event => {
    event.preventDefault()
    const idea = event.target.elements.idea.value
    setIdeas(prevIdeas => [...prevIdeas, idea])
    setScore(prevScore => prevScore + 10)
    setTimeLeft(30)
    setConfettiActive(true)
    mouseClick.play()
    whoosh.play()
    setTimeout(() => setConfettiActive(false), 3000)
    event.target.reset()
    inputRef.current.focus()
  }

  return (
    <div className={styles['game-page-container']}>
      {confettiActive && <Confetti />}
      <GameHeader timeLeft={timeLeft} score={score} category={category} />
      <GameCategory category={category} />
      <GameForm inputRef={inputRef} handleFormSubmit={handleFormSubmit} />
      <IdeaList ideasContainerRef={ideasContainerRef} ideas={ideas} />
    </div>
  )
}

export default GamePage
