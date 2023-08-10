import React from 'react'
import { useNavigate } from 'react-router-dom'
import useDimension from '../../hooks/useDimension'
import style from './style.module.scss'
import loginIcon from '../../icons/login.svg'

const HIDE_TEXT_AT_WIDTH = 600

export default function Login() {
    const navigate = useNavigate()
    const { width } = useDimension()

    return (
        <div className={style.loginHolderH}>
            <div className={style.loginHolder} onClick={() => navigate('/login')}>
                <img src={loginIcon} />
                {width >= HIDE_TEXT_AT_WIDTH ? <p>Login</p> : null}
            </div>
        </div>
    )
}
