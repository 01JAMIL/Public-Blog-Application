import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import '../styles/navbar.css'

import { getMe, logout, resetState } from '../features/auth/userSlice'

const NavBar = () => {

  const { user, token } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const dispatchLogout = () => {
    dispatch(logout())
    dispatch(resetState())
    navigate('/signin', { replace: true })
  }

  useEffect(() => {
    dispatch(getMe(token))
  }, [dispatch, token])

  return (
    <div className='nav'>
      <div className='navbar'>
        <div className='navbar-brand'>LOGO</div>

        <ul className='navbar-list-items'>
          <li className='navbar-list-item'> <Link to="/" > Home </Link> </li>
          <li className='navbar-list-item'>
            <Link to="/profile" >
              <b>{user && user.userName}</b>
            </Link>
          </li>
          <li className='navbar-list-item' > <span onClick={dispatchLogout}>Logout</span> </li>
        </ul>

      </div>
    </div>
  )
}

export default NavBar