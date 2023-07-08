import React from 'react'
import style from './style.module.scss'
import Letter from './Letter'
import { props } from '.'

interface additionalProps extends props {
    index: number
}

export default function DisplayColumn(props: additionalProps) {
    function shakeClassName(): string {
        const className = style.enableShake
        const enabled = props.shake && props.index == props.trialsIndex
        if (enabled) return ' ' + className

        return ''
    }

    return (
        <div className={style.displayColumnContainer + shakeClassName()}>
            <Letter {...{ ...props, position: 0 }} />
            <Letter {...{ ...props, position: 1 }} />
            <Letter {...{ ...props, position: 2 }} />
            <Letter {...{ ...props, position: 3 }} />
            <Letter {...{ ...props, position: 4 }} />
        </div>
    )
}
