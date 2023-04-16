import React, { useContext } from 'react'
import { Key } from './key'
import store from '../../store'
import style from './style.module.scss'

export default function Keyboard() {
    const { guessedLetters } = useContext(store)

    return (
        <div className={style.keyboard}>
            <div className={style.columns + ' ' + style.c1}>
                <Key>Q</Key>
                <Key>W</Key>
                <Key>E</Key>
                <Key>R</Key>
                <Key>T</Key>
                <Key>Y</Key>
                <Key>U</Key>
                <Key>I</Key>
                <Key>O</Key>
                <Key>P</Key>
            </div>
            <div className={style.columns + ' ' + style.c2}>
                <div />
                <Key>A</Key>
                <Key>S</Key>
                <Key>D</Key>
                <Key>F</Key>
                <Key>G</Key>
                <Key>H</Key>
                <Key>J</Key>
                <Key>K</Key>
                <Key>L</Key>
                <div />
            </div>
            <div className={style.columns + ' ' + style.c3}>
                <Key special={true}>enter</Key>
                <Key>Z</Key>
                <Key>X</Key>
                <Key>C</Key>
                <Key>V</Key>
                <Key>B</Key>
                <Key>N</Key>
                <Key>M</Key>
                <Key special={true}>backspace</Key>
            </div>
        </div>
    )
}
