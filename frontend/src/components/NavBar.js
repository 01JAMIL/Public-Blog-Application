import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import logo from '../assets/blog-bg.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import '../styles/navbar.css'
import { getMe, logout, resetState } from '../features/auth/userSlice'
import avatar from '../assets/avatar.png'

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

  const style = {
    width: '25px',
    height: '25px',
    border: '1px solid rgba(0, 0, 0, 0.2)',
    borderRadius: '50%'
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
          <img src={logo} width="50px" alt='' />
        </div>

        <ul className='navbar-list-items'>
          <li className='navbar-list-item'>
            <Link to="/" onClick={() => setOpen(false)}>
              <div>
                <FontAwesomeIcon icon={faHome} style={{ fontSize: '18px' }} />
                <span style={{ fontSize: '14px' }}>
                  Home
                </span>
              </div>
            </Link>
          </li>
          <li className='navbar-list-item' onClick={() => setOpen(!open)}>
            {(user && user._id) ? <>
              <div style={{ height: '25px' }} >
                <img src={user && (user.profilePic ? `data:image/png;base64,${user.profilePic}` : avatar)} style={style} alt='avatar' />
              </div>
              <div style={{ fontSize: '14px', color: 'rgba(0,0,0,0.6)' }}>
                You <b>{open ?
                  <FontAwesomeIcon icon={faCaretUp} />
                  : <FontAwesomeIcon icon={faCaretDown} />}</b>
              </div>
            </> : null}
          </li>
        </ul>
        {open && <div className='options-view' >
          <Link to={`profile/${user.userName}`} onClick={() => setOpen(false)}>
            <div>
              <b style={{ color: 'black' }}> Profile </b>
            </div>
          </Link>

          <div onClick={dispatchLogout}>
            Logout
          </div>
        </div>}
      </div>

    </div>
  )
}

export default NavBar