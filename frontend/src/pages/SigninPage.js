import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';

import { signin, resetState } from '../features/auth/userSlice'

import Input from '../components/Input'
import Loading from '../components/Loading'

const SigninPage = () => {

  const { loading, success, error } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    userName: '',
    password: ''
  })

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const submitHandler = (e) => {
    e.preventDefault()

    //console.log(form)
    dispatch(signin(form))
  }


  const notify = () => toast.error(error ? error.signinError : '');

  useEffect(() => {

    if (success) {
      dispatch(resetState())
      navigate('/', { replace: true })
    }

    if (error) {
      notify()
    }
  }, [dispatch, navigate, success, error])


  if (loading) {
    return <Loading />
  }

  return (

    <div className="container">
      <ToastContainer />
      <div>
        <div className="title">Signin</div>

        <div className="container-body">

          <form className="form" onSubmit={submitHandler}>


            <div className="form-row">
              <label htmlFor="userName" className="form-label">Email or username</label>
              <Input
                type="text"
                id="userName"
                name="userName"
                value={form.userName}
                className="form-input"
                onChange={changeHandler}
              />
              {(error && error.loginError) && <span className="form-input-error">{error.loginError}</span>}
            </div>

            <div className="form-row">
              <label htmlFor="password" className="form-label">Password</label>
              <Input
                type="password"
                id="password"
                name="password"
                value={form.password}
                className="form-input"
                onChange={changeHandler}
              />
              {(error && error.passwordError) && <span className="form-input-error">{error.passwordError}</span>}
            </div>


            <div className="form-row">
              <button type="submit">Signin</button>
            </div>

          </form>

        </div>
      </div>
    </div>
  )
}

export default SigninPage