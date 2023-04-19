import React from 'react'
import style from './style.module.scss'
import Letter from './Letter'
import { props } from '.'

interface additionalProps extends props {
    index: number
}

export default function DisplayColumn(props: additionalProps) {
    return (
        <div className={style.displayColumnContainer}>
            <Letter {...{ ...props, position: 0 }} />
            <Letter {...{ ...props, position: 1 }} />
            <Letter {...{ ...props, position: 2 }} />
            <Letter {...{ ...props, position: 3 }} />
            <Letter {...{ ...props, position: 4 }} />
        </div>
    )
}
