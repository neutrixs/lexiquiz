import { Dispatch, SetStateAction, createContext } from 'react'
import KeyPress from '../class/keypress'

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
