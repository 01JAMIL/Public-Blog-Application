import React from 'react'
import { useSelector } from 'react-redux'
import avatar from '../assets/avatar.png'
import '../styles/blog.css'

const UserAvatar = () => {
    const { user } = useSelector(state => state.auth)

    const style = {
        width: '40px',
        height: '40px',
        border: '1px solid rgba(0, 0, 0, 0.2)',
        borderRadius: '50%'
    }

    return (
        <div style={{height: '40px'}}>
            <img src={user && (user.profilePic ? `../../../uploads/${user.profilePic}` : avatar)} style={style} alt='avatar' />
        </div>
    )
}

export default UserAvatar