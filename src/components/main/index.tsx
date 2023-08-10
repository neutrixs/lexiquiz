import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Game from '../game'
import Navbar from '../navbar'
import style from './style.module.scss'

export default function MainComponent() {
    useEffect(() => {
        document.body.classList.add(style.body)
    }, [])

    return (
        <React.StrictMode>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Game />} />
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    )
}
