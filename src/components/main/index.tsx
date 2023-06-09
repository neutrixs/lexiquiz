import React, { useEffect } from 'react'
import Game from '../game'
import Navbar from '../navbar'
import style from './style.module.scss'

export default function MainComponent() {
    useEffect(() => {
        document.body.classList.add(style.body)
    }, [])

    return (
        <React.StrictMode>
            <Navbar />
            <Game />
        </React.StrictMode>
    )
}
