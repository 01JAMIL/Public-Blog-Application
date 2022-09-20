import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import avatar from '../assets/avatar.png'

import { getUserById } from '../features/user/userSlice'
import '../styles/blog.css'

const User = ({ userId }) => {

    const { token } = useSelector(state => state.auth)
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserById({ token, id: userId }))

    }, [dispatch, token, userId])

    return (
        <div className="user-container">
            <div className="user-avatar">
                <img src={user && (user.profilePic ? `../../../uploads/${user.profilePic}` : avatar)} alt='avatar' />
            </div>
            <div className="user-name">
                {user && (user.firstName + ' ' + user.lastName)}
            </div>
        </div>
    )
}

export default User