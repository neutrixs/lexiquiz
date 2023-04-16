import React, { useEffect, useState } from 'react'
import Navbar from '../navbar'
import Keyboard from '../keyboard'
import store, { guessedLettersData } from '../../store'
import style from './style.module.scss'

export default function MainComponent() {
    const [guessedLetters, setGuessedLetters] = useState<guessedLettersData>({})

    useEffect(() => {
        document.body.classList.add(style.body)
    }, [])

    return (
        <React.StrictMode>
            <store.Provider value={{ guessedLetters, setGuessedLetters }}>
                <Navbar />
                <Keyboard />
            </store.Provider>
        </React.StrictMode>
    )
}
