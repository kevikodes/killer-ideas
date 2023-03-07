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
import io from 'socket.io-client'

const whoosh = new Howl({
  src: ['../assets/sounds/whoosh.mp3'],
})

const mouseClick = new Howl({
  src: ['../assets/sounds/mouseclick.mp3'],
})

const GamePage = () => {
  const [ideas, setIdeas] = useState([])
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [confettiActive, setConfettiActive] = useState(false)
  const [category, setCategory] = useState('')
  const [addedIdeas, setAddedIdeas] = useState(0)
  const [showPlusTen, setShowPlusTen] = useState(false)
  const router = useRouter()
  let intervalId

  const inputRef = useRef(null)
  const ideasContainerRef = useRef(null)
  const socketRef = useRef()

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
      // router.push(`/gameover?score=${score}`)
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

  useEffect(() => {
    // Connect to the server using Socket.io
    socketRef.current = io()

    // Listen for incoming ideas from the server
    socketRef.current.on('idea', idea => {
      setIdeas(prevIdeas => {
        const newIdeas = [...prevIdeas, idea]
        return newIdeas
      })
    })

    return () => {
      // Disconnect from the server when the component unmounts
      socketRef.current.disconnect()
    }
  }, [])

  const handleFormSubmit = async event => {
    event.preventDefault()
    const idea = event.target.elements.idea.value
    handleShowPlusTen()

    console.log('Submitting idea:', idea)

    // Send the new idea to the server
    socketRef.current.emit('idea', idea)

    setScore(prevScore => prevScore + 10)
    setTimeLeft(prevTimeLeft => prevTimeLeft + 15)
    mouseClick.play()
    whoosh.play()
    setTimeout(() => {
      setShowPlusTen(false)
    }, 1500)
    event.target.reset()
    inputRef.current.focus()
    setConfettiActive(true)
    setTimeout(() => setConfettiActive(false), 2000)
    setShowPlusTen(true)
  }

  const handleShowPlusTen = () => {
    setShowPlusTen(true)
  }

  return (
    <div className={styles['game-page-container']}>
      {confettiActive && <Confetti />}
      <GameHeader timeLeft={timeLeft} score={score} category={category} />
      <GameCategory category={category} />
      <GameForm inputRef={inputRef} handleFormSubmit={handleFormSubmit} />
      <IdeaList ideasContainerRef={ideasContainerRef} ideas={ideas} />
      {showPlusTen && <div className={styles['plus-ten-message']}>+10</div>}
    </div>
  )
}

export default GamePage
