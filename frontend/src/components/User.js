import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import avatar from '../assets/avatar.png'
import '../styles/blog.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

const User = ({ userId }) => {

    const auth = useSelector(state => state.auth)
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)

    const getUser = async () => {
        setLoading(true)
        await axios.get(`/api/user/get-data/${userId}`, {
            headers: {
                authorization: `Bearer ${auth.token}`
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
                    <img src={user.profilePic ? `../../../uploads/${user.profilePic}` : avatar} alt='avatar' />
                    {(auth && auth.user && userId === auth.user._id) && <>
                        <span>
                            <FontAwesomeIcon icon={faCircle} />
                        </span>

                        <i>
                            <FontAwesomeIcon icon={faCircle} />
                        </i>
                    </>}
                </div>
                <div className="user-name">
                    {(user.firstName && user.lastName) && (user.firstName + ' ' + user.lastName)}
                </div>
            </div>}
        </>
    )
}

export default User