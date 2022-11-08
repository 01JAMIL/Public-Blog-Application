import React, { useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenAlt } from '@fortawesome/free-solid-svg-icons'
import '../styles/profile.css'
import avatar from '../assets/avatar.png'
import { useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import NewPost from '../components/NewPost'
import Blog from '../components/Blog'
import { getArticles } from '../features/article/articleSlice'
import { getMe } from '../features/auth/userSlice'
import Loading from '../components/Loading'
import UserLoading from '../components/UserLoading'

const ProfilePage = () => {

  const { data } = useSelector(state => state.article)
  const auth = useSelector(state => state.auth)
  const [user, setUser] = useState({})
  const location = useLocation()

  // GET THE USER_ID FROM THE URL PARAMS -
  const { username } = useParams()

  const dispatch = useDispatch()

  const getUserDataByUserName = async () => {
    await axios.get(`/api/user/get-data-username/${username}`, {
      headers: {
        authorization: 'Bearer ' + auth.token
      }
    }).then(res => {
      const data = res.data
      setUser(data)
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    dispatch(getArticles(auth.token))
    dispatch(getMe(auth.token))
    getUserDataByUserName()

    // Scroll page to the top on every component render
    if (!location.hash) {
      window.scrollTo(0, 0);
    }

  }, [dispatch, auth.token, username])

   if (Object.keys(user).length === 0) {
     return <Loading />
   }

  return (
    <div className='profile-home'>
      {auth.user !== null ?
        <div className='profile-home-container'>
          <div className='profile-container'>
            {(Object.keys(user).length !== 0) ? <div className='container-content'>
              <div className='profile-data'>
                <div className='profile-header'>
                  <div className='profile-pic'>
                    <img src={user.profilePic ? `../../../uploads/${user.profilePic}` : avatar} alt='avatar' />
                    {(username === auth.user.userName) ? <span> <FontAwesomeIcon icon={faPenAlt} /> </span> : null}
                  </div>
                </div>
                <div className='profile-description'>
                  <div className='profile-full-name'>
                    {user.firstName + ' ' + user.lastName}
                  </div>
                  <div className='profile-user-name'>
                    {user.userName}
                  </div>
                  {user.bio ? <div className='profile-bio'>
                    <div style={{ fontWeight: 'bold', fontSize: '20px' }} >Bio</div>
                    <div style={{ padding: '10px' }} >
                      {user.bio}
                    </div>
                  </div> : null}

                  {(username === auth.user.userName) ? <div className='profile-actions'>
                    <button>
                      Update profile
                    </button>
                  </div> : null}
                </div>
              </div>
            </div> : null}
          </div>

          {(username === auth.user.userName && (Object.keys(user).length !== 0)) ? <NewPost /> : null}

          {
            (user._id && data) ?
              data.map((blog, index) => (
                blog.userId === user._id ?
                  <div key={index} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Blog
                      id={blog._id}
                      time={blog.time}
                      title={blog.title}
                      content={blog.content}
                      image={blog.image}
                      categoryId={blog.categoryId}
                      userId={blog.userId}
                      likes={blog.likes}
                      comments={blog.comments}
                    />
                  </div>
                  : null
              )) : null
          }

        </div>
        : null}
    </div>
  )
}

export default ProfilePage