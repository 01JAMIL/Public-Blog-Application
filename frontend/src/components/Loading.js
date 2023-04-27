import React from 'react'
import '../styles/loading.css'
import logo from '../assets/blog-bg.png'
const Loading = () => {
    return (
        <div className='loading-page'>
            <div className='app-logo'>
                <img src={logo} width="80px" alt="logo" />
            </div>
            <div className="loader">Please wait ...</div>
        </div>
    )
}

export default Loading