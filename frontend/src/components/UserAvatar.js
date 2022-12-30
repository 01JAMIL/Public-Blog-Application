import React from 'react'
import { useSelector } from 'react-redux'
import avatar from '../assets/avatar.png'
import '../styles/blog.css'

const UserAvatar = () => {
    const { user } = useSelector(state => state.auth)

    const imageStyle = {
        width: '40px',
        height: '40px',
        borderRadius: '50%'
    }

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1px',
        border: '1px solid rgba(0, 0, 0, 0.2)',
        width: '45px',
        height: '40px',
        borderRadius: '50%'
    }

    return (
        <div style={containerStyle}>
            <img src={user && (user.profilePic ? `data:image/png;base64,${user.profilePic}` : avatar)} style={imageStyle} alt='avatar' />
        </div>
    )
}

export default UserAvatar