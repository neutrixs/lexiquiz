import React from 'react'
import style from './style.module.scss'

export default function Navbar() {
    return (
        <nav className={style.navbar}>
            <div className={style.container}>
                <div className={style.titleHolder}>
                    <p className={style.title}>LEXIQUIZ</p>
                </div>
            </div>
        </nav>
    )
}
