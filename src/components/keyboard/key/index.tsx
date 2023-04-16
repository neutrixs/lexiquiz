import React, { useEffect } from 'react'
import style from './style.module.scss'
import enter from '../../../icons/enter.svg'
import backspace from '../../../icons/backspace.svg'

interface propsKey {
    children: string
    special?: boolean
}

export function Key({ special, children }: propsKey) {
    useEffect(() => {
        function listener(e: KeyboardEvent) {
            if (children.toLowerCase() != e.key.toLowerCase()) return
            console.log(e.key)
        }
        document.addEventListener('keydown', listener)
        return () => document.removeEventListener('keydown', listener)
    }, [])

    const normalKey = <span>{children.toUpperCase()}</span>
    const specialKey = () => {
        switch (children.toLowerCase()) {
            case 'enter':
                return <img src={enter} />
            case 'backspace':
                return <img src={backspace} />
            default:
                return <span>{children.toUpperCase()}</span>
        }
    }

    return <div className={style.key}>{special ? specialKey() : normalKey}</div>
}
