import { Dispatch, SetStateAction, createContext } from 'react'
import KeyPress from '../class/keypress'

export enum guessedLettersValues {
    notExist = 1,
    misplaced,
    correct,
}

export type guessedLettersData = { [key: string]: guessedLettersValues }
const guessedLetters: guessedLettersData = {}
const setGuessedLetters: Dispatch<SetStateAction<guessedLettersData>> = () => {}
const KeyPressClass = new KeyPress()

const store = createContext({
    guessedLetters,
    setGuessedLetters,
    KeyPressClass,
})

export default store
