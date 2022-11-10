import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import avatar from '../assets/avatar.png'
import '../styles/blog.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import UserLoading from './UserLoading'

const User = ({ userId, setUserDataLoaded }) => {

    const auth = useSelector(state => state.auth)
    const [user, setUser] = useState({})
    const [loaded, setLoaded] = useState(false)
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
                setLoaded(true)
                setUserDataLoaded(true)
            })
            .catch((error) => error.message)
    }

    useEffect(() => {
        userId && getUser()
    }, [userId])


    if (loading) {
        return <UserLoading />
    }

    return (
        <>
            {loaded ? <div className="user-container">
                <div className="user-avatar">
                    <div className='user-avatar-label'> 
                        <img src={user.profilePic ? `../../../uploads/${user.profilePic}` : avatar} alt='avatar' />
                    </div>
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
                    <Link to={`/profile/${user.userName}`} style={{ textDecoration: 'none', color: 'black' }}>
                        {user.firstName + ' ' + user.lastName}
                    </Link>
                </div>
            </div> : null}
        </>
    )
}

export default User