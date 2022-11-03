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
          <img src={logo} width="100px" />
        </div>

        <ul className='navbar-list-items'>
          <li className='navbar-list-item'>
            <Link to="/" >
              <FontAwesomeIcon icon={faHome} style={{ fontSize: '18px' }} />
            </Link>
            <div style={{ fontSize: '14px' }}>
              Home
            </div>
          </li>
          <li className='navbar-list-item' onClick={() => setOpen(!open)}>
            <div style={{ height: '25px' }} >
              <img src={user && (user.profilePic ? `../../../uploads/${user.profilePic}` : avatar)} style={style} alt='avatar' />
            </div>
            <div style={{ fontSize: '14px' }}>
              You <b style={{color: 'rgba(0,0,0,0.6)'}} >{open ?
                <FontAwesomeIcon icon={faCaretUp} />
                : <FontAwesomeIcon icon={faCaretDown} />}</b>
            </div>
          </li>
        </ul>
        {open && <div className='options-view' >
          <div>
            <Link to="/profile" >
              <b style={{ color: '#4BB543' }}> Profile </b>
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