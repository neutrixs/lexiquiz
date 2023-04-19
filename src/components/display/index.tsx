import React from 'react'
import style from './style.module.scss'
import DisplayColumn from './DisplayColumn'

export interface props {
    trials: string[]
    trialsIndex: number
    currentWord: string
}

export default function Display(props: props) {
    return (
        <div className={style.container}>
            <DisplayColumn {...props} index={0} />
            <DisplayColumn {...props} index={1} />
            <DisplayColumn {...props} index={2} />
            <DisplayColumn {...props} index={3} />
            <DisplayColumn {...props} index={4} />
            <DisplayColumn {...props} index={5} />
        </div>
    )
}
