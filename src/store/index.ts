import { Dispatch, SetStateAction, createContext } from 'react'

export enum guessedLettersValues {
    notExist = 1,
    misplaced,
    correct,
}

export type guessedLettersData = { [key: string]: guessedLettersValues }
const guessedLetters: guessedLettersData = {}
const setGuessedLetters: Dispatch<SetStateAction<guessedLettersData>> = () => {}

const store = createContext({
    guessedLetters,
    setGuessedLetters,
})

export default store
