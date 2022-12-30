import React, { useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenAlt, faTimes } from '@fortawesome/free-solid-svg-icons'
import '../styles/profile.css'
import avatar from '../assets/avatar.png'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import NewPost from '../components/NewPost'
import Blog from '../components/Blog'
import { getArticles } from '../features/article/articleSlice'
import { getMe, updateProfilePicture } from '../features/auth/userSlice'
import Loading from '../components/Loading'
import Modal from 'react-modal'

const ProfilePage = () => {

  document.title = 'Blogy - Profile'

  const { data } = useSelector(state => state.article)
  const auth = useSelector(state => state.auth)
  const [user, setUser] = useState({})
  const [isOpen, setIsOpen] = useState(false)
  const [updatedPic, setUpdatedPic] = useState(false)
  const [imgForm, setImgForm] = useState(new FormData())
  const [img, setImg] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  const [updated, setUpdated] = useState(false)
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [updateForm, setUpdateForm] = useState({
    _id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    userName: '',
    bio: ''
  })
  const [updateErrors, setUpdateErrors] = useState({})

  // GET THE USER_ID FROM THE URL PARAMS -
  const { username } = useParams()

  const dispatch = useDispatch()

  const modalStyle = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '300px'
    },
  }


  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = () => {
    setImg(user.profilePic ? `../../../uploads/${user.profilePic}` : avatar)
    setIsOpen(true)
  }

  const fileChangeHandler = (e) => {
    const img = document.getElementById('img')
    setImgForm({
      ...imgForm,
      profilePic: e.target.files[0]
    })
    setImg(URL.createObjectURL(e.target.files[0]))
    img.src = URL.createObjectURL(e.target.files[0])
  }

  const updateImgHandler = (e) => {
    e.preventDefault()
    const data = {
      body: imgForm,
      userName: user.userName,
      token: auth.token
    }
    dispatch(updateProfilePicture(data))
    setUpdatedPic(!updatedPic)
    setIsOpen(false)
  }

  const chnageHandler = (e) => {
    setUpdateForm({
      ...updateForm,
      [e.target.name]: e.target.value
    })
  }

  const editProfileHandler = async (e) => {
    e.preventDefault()
    await axios.put('/api/user/update-profile', updateForm, {
      headers: {
        authorization: `Bearer ${auth.token}`
      }
    }).then(res => {
      setShowUpdateForm(false)
      setUpdated(!updated)
      navigate(`/profile/${updateForm.userName}`)
    }).catch(err => {
      setUpdateErrors(err.response.data)
    })
  }

  useEffect(() => {
    const getUserDataByUserName = async () => {
      await axios.get(`/api/user/get-data-username/${username}`, {
        headers: {
          authorization: 'Bearer ' + auth.token
        }
      }).then(res => {
        const data = res.data
        setUser(data)

        setUpdateForm({
          _id: data._id,
          firstName: data.firstName,
          lastName: data.lastName,
          dateOfBirth: data.dateOfBirth,
          userName: data.userName,
          bio: data.bio
        })
      }).catch(err => {
        console.log(err)
      })
    }

    dispatch(getArticles(auth.token))
    dispatch(getMe(auth.token))
    getUserDataByUserName()

    // Scroll page to the top on every component render
    if (!location.hash) {
      window.scrollTo(0, 0);
    }

  }, [dispatch, auth.token, username, updatedPic, updated, location.hash])

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
                    <div className='profile-avatar-label'>
                      <img src={user.profilePic ? `../../../uploads/${user.profilePic}` : avatar} alt='avatar' />
                    </div>
                    {(username === auth.user.userName) ? <span onClick={openModal}> <FontAwesomeIcon icon={faPenAlt} /> </span> : null}
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
                    {
                      !showUpdateForm ?
                        <button onClick={() => setShowUpdateForm(true)}>
                          Edit profile
                        </button> :
                        null
                    }

                    {showUpdateForm ?
                      <div>
                        <form className='form' onSubmit={editProfileHandler}>
                          <div className='form-group'>
                            <input
                              name='firstName'
                              defaultValue={updateForm.firstName}
                              onChange={chnageHandler}
                            />
                            <input
                              name='lastName'
                              defaultValue={updateForm.lastName}
                              onChange={chnageHandler}
                            />
                          </div>
                          <div className='form-group'>
                            <input
                              type="date"
                              name='dateOfBirth'
                              defaultValue={updateForm.dateOfBirth}
                              onChange={chnageHandler}
                            />
                            <input
                              name='userName'
                              defaultValue={updateForm.userName}
                              onChange={chnageHandler}
                            />
                          </div>
                          <div className='form-group'>
                            <textarea name='bio' defaultValue={updateForm.bio} onChange={chnageHandler} />
                          </div>

                          <div className='form-btns'>
                            <button type='submit' className='save-btn'>Save</button>
                            <button type='button' onClick={() => setShowUpdateForm(false)}>Cancel</button>
                          </div>
                        </form>
                      </div> : null
                    }


                  </div> : null}
                </div>
              </div>
            </div> : null}
          </div>

          <Modal
            isOpen={isOpen}
            style={modalStyle}
            onRequestClose={() => setIsOpen(false)}
            ariaHideApp={false}
          >
            <div className='update-pic-modal'>
              <div className='update-pic-modal-header'>
                <div>Update profile picture</div>
                <div className='modal-btn' onClick={closeModal}>
                  <FontAwesomeIcon icon={faTimes} />
                </div>
              </div>
              <form onSubmit={updateImgHandler}>
                <div className='update-pic-modal-body'>
                  <div className='modal-pic'>
                    <input
                      type="file"
                      name="profilePic"
                      id="image"
                      onChange={fileChangeHandler}
                    />
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '10px', width: '250px', height: '250px', borderRadius: '50%' }}>
                      <img src={img} alt="img" id="img" width="100%" style={{ borderRadius: '50%' }} />
                    </div>

                    <label htmlFor="image" className="modal-pic-label">Choose image</label>
                  </div>
                </div>

                <div className='modal-footer'>
                  {imgForm.profilePic ? <button>
                    Update
                  </button> : null}
                </div>
              </form>

            </div>

          </Modal>

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