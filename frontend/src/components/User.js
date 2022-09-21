import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import avatar from '../assets/avatar.png'
import '../styles/blog.css'

const User = ({ userId }) => {

    const { token } = useSelector(state => state.auth)
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)


    const getUser = async () => {
        setLoading(true)
        await axios.get(`/api/user/get-data/${userId}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                setLoading(false)
                setUser(response.data)
            })
            .catch((error) => error.message)
    }

    useEffect(() => {
        userId && getUser()
    }, [userId])


    if (loading) {
        return <></>
    }

    return (
        <>
            {user && <div className="user-container">
                <div className="user-avatar">
                    <img src={user && (user.profilePic ? `../../../uploads/${user.profilePic}` : avatar)} alt='avatar' />
                </div>
                <div className="user-name">
                    {user && (user.firstName + ' ' + user.lastName)}
                </div>
            </div>}
        </>
    )
}

export default User