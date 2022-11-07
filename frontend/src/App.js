import './styles/form.css'
import { useDispatch, useSelector } from 'react-redux'
import SigninPage from './pages/SigninPage'
import SignupPage from './pages/SignupPage'
import HomePage from './pages/HomePage'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { isExpired } from 'react-jwt'
import { logout, resetState } from './features/auth/userSlice'
import { useEffect } from 'react'
import NavBar from './components/NavBar'
import ProfilePage from './pages/ProfilePage'
function App() {

  const { token } = useSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (token && isExpired(token)) {
      dispatch(logout())
      dispatch(resetState())
      navigate('/', { replace: true })
      window.location.reload()
    }
  }, [dispatch, navigate, token])

  return (
    <>
      {token ? <NavBar /> : null}
      <Routes>
        <Route path='/' element={token ? <HomePage /> : <Navigate to='/signin' />} />
        <Route path='/profile/:username' element={token ? <ProfilePage /> : <Navigate to='/signin' />} />
        <Route path='/signup' element={!token ? <SignupPage /> : <Navigate to='/' />} />
        <Route path='/signin' element={!token ? <SigninPage /> : <Navigate to='/' />} />
      </Routes>
    </>

  );
}

export default App
