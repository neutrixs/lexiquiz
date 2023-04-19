import React, { useContext } from 'react'
import { context, guessedLettersHex, guessedLettersValues } from '../game'
import { findAllIndex } from '../../scripts/arrays'
import style from './style.module.scss'
import { props } from '.'
interface additionalProps extends props {
    position: number
    index: number
}

export default function Letter({
    currentWord,
    position,
    trials,
    index,
    trialsIndex,
}: additionalProps) {
    const letter = trials[index]?.[position] ?? ''

    function getColor() {
        if (trialsIndex <= index) {
            return '#00000000'
        }
        if (!currentWord) {
            return '#00000000'
        }
        if (!currentWord.includes(letter)) {
            return guessedLettersHex[guessedLettersValues.notExist]
        }
        if (currentWord[position] == letter) {
            return guessedLettersHex[guessedLettersValues.correct]
        }
        return guessedLettersHex[
            considered() ? guessedLettersValues.misplaced : guessedLettersValues.notExist
        ]
    }

    function considered() {
        const guessedWord = (trials[index] ?? '').split('')
        const correctPosIndex = findAllIndex(
            guessedWord,
            (val, i) => val == letter && currentWord[i] == letter,
        )
        const incorrectPosIndex = findAllIndex(
            guessedWord,
            (val, i) => val == letter && currentWord[i] != letter,
        )
        const remaining = findAllIndex(
            currentWord.split(''),
            (val, i) => val == letter && !correctPosIndex.includes(i),
        ).length

        const repetition = incorrectPosIndex.filter((i) => i <= position).length

        return repetition <= remaining
    }

    return (
        <div className={style.letterContainer} style={{ backgroundColor: getColor() }}>
            <span>{letter.toUpperCase()}</span>
        </div>
    )
}
