import React, { useContext, useEffect, useRef, useState } from 'react'
import store, { guessedLettersHex as hex, guessedLettersValues } from '../../../store'
import style from './style.module.scss'
import enter from '../../../icons/enter.svg'
import backspace from '../../../icons/backspace.svg'

interface propsKey {
    children: string
    special?: boolean
}

export function Key({ special, children }: propsKey) {
    const { KeyPressClass, guessedLetters } = useContext(store)
    const [active, setActive] = useState(false)
    const button = useRef<HTMLDivElement>(null)
    const [bgColor, setBgColor] = useState(hex[guessedLettersValues.unknown])

    useEffect(() => {
        function keydownListener(e: KeyboardEvent) {
            if (children.toLowerCase() != e.key.toLowerCase()) return
            runTrigger()
            setActive(true)
        }
        function keyupListener(e: KeyboardEvent) {
            if (children.toLowerCase() != e.key.toLowerCase()) return
            setActive(false)
        }

        function clickListener() {
            runTrigger()
        }
        document.addEventListener('keydown', keydownListener)
        document.addEventListener('keyup', keyupListener)
        button.current?.addEventListener('click', clickListener)
        return () => {
            document.removeEventListener('keydown', keydownListener)
            document.removeEventListener('keyup', keyupListener)
            button.current?.removeEventListener('click', clickListener)
        }
    }, [])

    useEffect(() => {
        setBgColor(hex[guessedLetters[children.toLowerCase()] || guessedLettersValues.unknown])
    }, [guessedLetters])

    function runTrigger() {
        KeyPressClass.trigger(children)
    }

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

    return (
        <div
            style={{ backgroundColor: bgColor }}
            className={style.key + ' ' + (active ? style.active : '')}
            ref={button}
        >
            {special ? specialKey() : normalKey}
        </div>
    )
}
