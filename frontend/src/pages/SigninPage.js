import React from 'react'
import Input from '../components/Input'

const SigninPage = () => {
  return (
    <div className="container">
      <div>
        <div className="title">Signin</div>

        <div className="container-body">

          <form className="form">


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
              <button type="submit">Signin</button>
            </div>

          </form>

        </div>
      </div>
    </div>
  )
}

export default SigninPage