import './styles/form.css'
import { useSelector } from 'react-redux'
import SigninPage from './pages/SigninPage'
import SignupPage from './pages/SignupPage'
import HomePage from './pages/HomePage'
import { Routes, Route, Navigate } from 'react-router-dom'

function App() {

  const { token } = useSelector(state => state.auth)

  return (
    <>
      <Routes>
        <Route path='/' element={token ? <HomePage /> : <Navigate to='/signin' />} />
        <Route path='/signup' element={!token ? <SignupPage /> : <Navigate to='/' />} />
        <Route path='/signin' element={!token ? <SigninPage /> : <Navigate to='/' />} />
      </Routes>
    </>

  );
}

export default App
