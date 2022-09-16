import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import Loading from '../components/Loading'
import { signup, resetState } from '../features/auth/userSlice'


const SignupPage = () => {

  const { loading, success, error } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
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

    dispatch(signup(form))
  }


  useEffect(() => {
    if (success) {
      dispatch(resetState())
      navigate('/signin', { replace: true })
    }
  }, [dispatch, success, navigate])


  if (loading) {
    return <Loading />
  }

  return (
    <div className="container">
      <div>
        <div className="title">Signup</div>

        <div className="container-body">

          <form className="form" onSubmit={submitHandler}>

            <div className="form-row">
              <label htmlFor="firstName" className="form-label">First name</label>
              <Input
                type="text"
                id="firstName"
                name="firstName"
                className="form-input"
                value={form.firstName}
                onChange={changeHandler}
              />
              {(error && error.firstNameError) && <span className="form-input-error">{error.firstNameError}</span>}
            </div>

            <div className="form-row">
              <label htmlFor="lastName" className="form-label">Last name</label>
              <Input
                type="text"
                id="lastName"
                name="lastName"
                className="form-input"
                value={form.lastName}
                onChange={changeHandler}
              />
              {(error && error.lastNameError) && <span className="form-input-error">{error.lastNameError}</span>}
            </div>

            <div className="form-row">
              <label htmlFor="email" className="form-label">Email</label>
              <Input
                type="email"
                id="email"
                name="email"
                className="form-input"
                value={form.email}
                onChange={changeHandler}
              />
              {(error && error.emailError) && <span className="form-input-error">{error.emailError}</span>}
            </div>

            <div className="form-row">
              <label htmlFor="dateOfBirth" className="form-label">Date of birth</label>
              <Input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                className="form-input"
                value={form.dateOfBirth}
                onChange={changeHandler}
              />
              {(error && error.dateOfBirthError) && <span className="form-input-error">{error.dateOfBirthError}</span>}
            </div>

            <div className="form-row">
              <label htmlFor="userName" className="form-label">Username</label>
              <Input
                type="text"
                id="userName"
                name="userName"
                className="form-input"
                value={form.userName}
                onChange={changeHandler}
              />
              {(error && error.userNameError) && <span className="form-input-error">{error.userNameError}</span>}
            </div>

            <div className="form-row">
              <label htmlFor="password" className="form-label">Password</label>
              <Input
                type="password"
                id="password"
                name="password"
                className="form-input"
                value={form.password}
                onChange={changeHandler}
              />
              {(error && error.passwordError) && <span className="form-input-error">{error.passwordError}</span>}
            </div>


            <div className="form-row">
              <button type="submit">Signup</button>
            </div>

          </form>

        </div>
      </div>
    </div>
  )
}

export default SignupPage