import React, { createContext, useEffect, useRef, useState } from 'react'
import KeyPress from '../../class/keypress'
import Keyboard from '../keyboard'
import validate from './validate'
import Display from '../display'
import * as api from '../../api'

export const WORD_LENGTH = 5
export const MAX_TRIALS = 6
export const CLEAR_AFTER_SHAKE_DELAY_MS = 375
export const LETTER_ANIMATION_LENGTH_MS = 500

export enum guessedLettersValues {
    unknown,
    notExist,
    misplaced,
    correct,
}
export const guessedLettersHex: { [key in guessedLettersValues]: string } = {
    0: '#808080',
    1: '#303030',
    2: '#A05000',
    3: '#0050A0',
}
export type guessedLetter = { [key: string]: guessedLettersValues }
const guessedLetterInit: guessedLetter = {}
const trialsInit: string[] = []

export const context = createContext({
    KeyPressClass: new KeyPress(),
    guessedLetters: guessedLetterInit,
    trials: trialsInit,
    currentWord: '',
    index: 0,
})

function getGuessedLetters(
    trials: string[],
    currentWord: string,
    index: number,
): { [key: string]: guessedLettersValues } {
    const data: guessedLetter = {}
    trials.forEach((trial, i) => {
        // only counted when its index is i+1 or more
        if (i >= index) return

        for (let i = 0; i < trial.length; i++) {
            const letter = trial[i]
            if (!currentWord.includes(letter)) {
                data[letter] = guessedLettersValues.notExist
                continue
            }
            if (currentWord[i] == letter) {
                data[letter] = guessedLettersValues.correct
                continue
            }
            if (!data[letter] || data[letter] < guessedLettersValues.misplaced) {
                data[letter] = guessedLettersValues.misplaced
            }
        }
    })

    return data
}

export default function Game() {
    const [KeyPressClass] = useState(new KeyPress())
    const [currentWord, setCurrentWord] = useState('')
    const [trials, setTrials] = useState<string[]>([])
    const [index, setIndex] = useState(0)
    const [shake, setShake] = useState(false)
    const guessedLetters = getGuessedLetters(trials, currentWord, index)

    const trialsRef = useRef(trials)
    const indexRef = useRef(index)
    trialsRef.current = trials
    indexRef.current = index

    useEffect(() => {
        getWord()

        async function onKeyPress(key: string) {
            key = key.toLowerCase()

            switch (key) {
                case 'backspace': {
                    setTrials((prevTrials) => {
                        // creates a new reference, so react will render the change
                        const trials = [...prevTrials]

                        if (!trials[indexRef.current]) {
                            trials[indexRef.current] = ''
                            return trials
                        }
                        trials[indexRef.current] = trials[indexRef.current].slice(0, -1)
                        return trials
                    })
                    break
                }
                case 'enter': {
                    if (indexRef.current >= MAX_TRIALS) {
                        return
                    }
                    if (!trialsRef.current[indexRef.current]) {
                        return
                    }
                    if (trialsRef.current[indexRef.current].length != WORD_LENGTH) {
                        return
                    }
                    if (!(await validate(trialsRef.current[indexRef.current]))) {
                        setShake(true)
                        setTimeout(() => {
                            setTrials((prevTrials) => {
                                const trials = [...prevTrials]
                                trials[indexRef.current] = ''

                                return trials
                            })
                            setShake(false)
                        }, CLEAR_AFTER_SHAKE_DELAY_MS)
                        return
                    }
                    setIndex((index) => index + 1)
                    break
                }
                default: {
                    setTrials((prevTrials) => {
                        const trials = [...prevTrials]

                        if (!trials[indexRef.current]) {
                            trials[indexRef.current] = key
                            return trials
                        }
                        if (trials[indexRef.current].length == WORD_LENGTH) {
                            return trials
                        }
                        trials[indexRef.current] += key
                        return trials
                    })
                    break
                }
            }
        }

        KeyPressClass.addListener(onKeyPress)
        return () => KeyPressClass.removeListener(onKeyPress)
    }, [])

    async function getWord() {
        try {
            const word = await api.getWord()
            setCurrentWord(word)
        } catch (_) {
            setTimeout(() => getWord(), 2000)
        }
    }

    return (
        <context.Provider value={{ KeyPressClass, guessedLetters, trials, index, currentWord }}>
            <Display {...{ currentWord, trials, trialsIndex: index, shake }} />
            <Keyboard />
        </context.Provider>
    )
}
