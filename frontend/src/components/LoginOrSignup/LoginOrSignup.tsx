import React, { useState, MouseEvent, ChangeEvent } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const inputStyle = {
    height: 40,
    padding: 10,
    border: '1px solid #ccc',
    outline: 'none',
    backgroundColor: '#fff'
}

const buttonStyle = {
    height: 40, width: 200, margin: '10px auto', outline: 'none', border: 'none', background: '#5657ff', cursor: 'pointer', color: '#fff'
}
const LoginOrSignup = () => {
    const [data, setData] = useState({ username: '', password: '' })
    const [isLogin, setIsLogin] = useState(true)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData(d => ({ ...d, [name]: value }))
    }
    const handleLoginOrSignup = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true)
        try {
            const res = await axios.post(`http://localhost:4100/api/star-bakery/v1/auth/${isLogin ? 'login' : 'signup'}`, data)
            if (res && res.data) {
                localStorage.setItem('token', res.data.data.token)
                navigate('/create-order')
            }
        }
        catch (e) {
            console.log(e)
        }
        setLoading(false)
    }
    return (
        <div style={{ width: '100vw', height: '100vh', display: 'grid', placeItems: 'center', }}>
            <div style={{ backgroundColor: '#fff', width: 400, padding: '50px 20px' }}>
                <div style={{ fontWeight: 600, color: '#222' }}>{isLogin ? 'Login' : 'Signup'}</div>
                <form style={{ display: 'flex', flexFlow: 'column', gap: 20, margin: '20px 0' }}>
                    <input placeholder="username" name="username" value={data.username} onChange={handleChange} style={inputStyle} type="text" />
                    <input placeholder="password" style={inputStyle} name="password" value={data.password} onChange={handleChange} type="password" />
                    <button style={{ ...buttonStyle, opacity: loading ? .3 : 1 }} onClick={handleLoginOrSignup}>{isLogin ? "Login" : 'Signup'}</button>
                </form>
                <div style={{ fontSize: 13 }}>
                    {isLogin ?
                        <p style={{ textAlign: 'center' }}>New user? {" "}
                            <span style={{ fontWeight: 500, color: '#111', cursor: 'pointer' }} onClick={() => setIsLogin(false)}>Signup here</span>
                        </p>
                        :
                        <p style={{ textAlign: 'center', fontWeight: 500, color: '#111', cursor: 'pointer' }} onClick={() => setIsLogin(true)}>Login instead</p>}

                </div>
            </div>
        </div>
    )
}

export default LoginOrSignup