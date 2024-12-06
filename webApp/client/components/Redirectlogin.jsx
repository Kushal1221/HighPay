import React from 'react'
import { Link } from 'react-router-dom'
import "./style/redirectlogin.css"

function Redirectlogin() {
  return (
    <div className='redirectlogin'>
      <h1>User Registered Successfully Please Login</h1>
      <Link to="/login"><button>Login</button></Link>
    </div>
  )
}

export default Redirectlogin
