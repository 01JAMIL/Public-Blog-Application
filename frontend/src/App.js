import './styles/form.css'
import { useDispatch, useSelector } from 'react-redux'
import SigninPage from './pages/SigninPage'
import SignupPage from './pages/SignupPage'
import HomePage from './pages/HomePage'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { isExpired } from 'react-jwt'
import { logout, resetState } from './features/auth/userSlice'
import { useEffect } from 'react'
import Profile from './components/Profile'
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
  }, [])

  return (
    <>
      <Routes>
        <Route path='/' element={token ? <HomePage /> : <Navigate to='/signin' />} />
        <Route path='/profile' element={token ? <Profile /> : <Navigate to='/signin' />} />
        <Route path='/signup' element={!token ? <SignupPage /> : <Navigate to='/' />} />
        <Route path='/signin' element={!token ? <SigninPage /> : <Navigate to='/' />} />
      </Routes>
    </>

  );
}

export default App
