import React, { useEffect, useContext, useState } from 'react'
import { context, LETTER_ANIMATION_LENGTH_MS, WORD_LENGTH } from '../game'
import sleep from '../../scripts/sleep'
import style from './style.module.scss'
import Letter from './Letter'
import { props } from '.'

interface additionalProps extends props {
    index: number
}

export default function DisplayColumn(props: additionalProps) {
    const ctx = useContext(context)
    const { KeyPressClass } = ctx
    const [animationPos, setAnimationPos] = useState(-1)

    useEffect(() => {
        if (props.trialsIndex != props.index + 1) {
            return
        }

        ;(async () => {
            KeyPressClass.blockInput()
            for (let i = 0; i < WORD_LENGTH; i++) {
                setAnimationPos(i)
                await sleep(LETTER_ANIMATION_LENGTH_MS)
            }
            setAnimationPos(-1)
            KeyPressClass.unblockInput()
        })()
    }, [props.trialsIndex])

    function shakeClassName(): string {
        const className = style.enableShake
        const enabled = props.shake && props.index == props.trialsIndex
        if (enabled) return ' ' + className

        return ''
    }

    return (
        <div className={style.displayColumnContainer + shakeClassName()}>
            <Letter {...{ ...props, position: 0, animationPos }} />
            <Letter {...{ ...props, position: 1, animationPos }} />
            <Letter {...{ ...props, position: 2, animationPos }} />
            <Letter {...{ ...props, position: 3, animationPos }} />
            <Letter {...{ ...props, position: 4, animationPos }} />
        </div>
    )
}
