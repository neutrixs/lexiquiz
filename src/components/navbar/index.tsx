import React from 'react'
import { useNavigate } from 'react-router-dom'
import Login from './login'
import style from './style.module.scss'

export default function Navbar() {
    const navigate = useNavigate()

    return (
        <nav className={style.navbar}>
            <div />
            <div className={style.titleHolderH}>
                <div className={style.titleHolder} onClick={() => navigate('/')}>
                    <p className={style.title}>LEXIQUIZ</p>
                </div>
            </div>

            <Login />
        </nav>
    )
}
