import React from 'react'
import Input from '../components/Input'

const SignupPage = () => {
  return (
    <div className="container">
      <div>
        <div className="title">Signup</div>

        <div className="container-body">

          <form className="form">

            <div className="form-row">
              <label htmlFor="firstName" className="form-label">First name</label>
              <Input
                type="text"
                id="firstName"
                name="firstName"
                className="form-input"
              />
            </div>

            <div className="form-row">
              <label htmlFor="lastName" className="form-label">Last name</label>
              <Input
                type="text"
                id="lastName"
                name="lastName"
                className="form-input"
              />
            </div>

            <div className="form-row">
              <label htmlFor="email" className="form-label">Email</label>
              <Input
                type="email"
                id="email"
                name="email"
                className="form-input"
              />
            </div>

            <div className="form-row">
              <label htmlFor="dateOfBirth" className="form-label">Date of birth</label>
              <Input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                className="form-input"
              />
            </div>

            <div className="form-row">
              <label htmlFor="userName" className="form-label">Username</label>
              <Input
                type="text"
                id="userName"
                name="userName"
                className="form-input"
              />
            </div>

            <div className="form-row">
              <label htmlFor="password" className="form-label">Password</label>
              <Input
                type="password"
                id="password"
                name="password"
                className="form-input"
              />
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