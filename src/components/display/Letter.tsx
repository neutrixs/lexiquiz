import React, { useEffect, useState } from 'react'
import { guessedLettersHex, guessedLettersValues, LETTER_ANIMATION_LENGTH_MS } from '../game'
import { findAllIndex } from '../../scripts/arrays'
import { props } from '.'
import style from './style.module.scss'
interface additionalProps extends props {
    position: number
    index: number
    animationPos: number
}

export default function Letter({
    currentWord,
    position,
    trials,
    index,
    trialsIndex,
    animationPos,
}: additionalProps) {
    const letter = trials[index]?.[position] ?? ''
    const animationStyle: React.CSSProperties = {
        animation: `${style.letterPop}`,
        animationDuration: `${LETTER_ANIMATION_LENGTH_MS}ms`,
    }

    const [applyAnimation, setApplyAnimation] = useState(false)
    const [applyColor, setApplyColor] = useState(false)

    useEffect(() => {
        if (animationPos != position) {
            return
        }

        setApplyAnimation(true)
        setApplyColor(true)
        setTimeout(() => {
            setApplyAnimation(false)
        }, LETTER_ANIMATION_LENGTH_MS)
    }, [animationPos])

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
        <div
            className={style.letterContainer}
            style={{
                transitionProperty: 'background-color',
                transitionDuration: `${LETTER_ANIMATION_LENGTH_MS / 2}ms`,
                backgroundColor: applyColor ? getColor() : '#00000000',
                ...(applyAnimation ? animationStyle : {}),
            }}
        >
            <span>{letter.toUpperCase()}</span>
        </div>
    )
}
