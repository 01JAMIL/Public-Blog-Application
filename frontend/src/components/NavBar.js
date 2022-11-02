import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import logo from '../assets/blog-bg.png'

import '../styles/navbar.css'

import { getMe, logout, resetState } from '../features/auth/userSlice'
import UserAvatar from './UserAvatar'

const NavBar = () => {

  const { user, token } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const listRef = useRef()

  const dispatchLogout = () => {
    dispatch(logout())
    dispatch(resetState())
    navigate('/signin', { replace: true })
  }

  useEffect(() => {
    const handleClose = (e) => {
      if (!listRef.current.contains(e.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClose)
    dispatch(getMe(token))

    return () => {
      document.removeEventListener('mousedown', handleClose)
    }
  }, [dispatch, token])

  return (
    <div className='nav'>
      <div className='navbar' ref={listRef}>
        <div className='navbar-brand'>
          <img src={logo} width="100px" />
        </div>

        <ul className='navbar-list-items'>
          <li className='navbar-list-item'> <Link to="/" > Home </Link> </li>
          <li onClick={() => setOpen(!open)}>
            <UserAvatar />
          </li>
        </ul>
        {open && <div className='options-view' >
          <div>
            <Link to="/profile" >
              <b style={{ color: '#4BB543' }}>{user && user.userName}</b>
            </Link>
          </div>

          <div onClick={dispatchLogout}>
            Logout
          </div>
        </div>}
      </div>

    </div>
  )
}

export default NavBar