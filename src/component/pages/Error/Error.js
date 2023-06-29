import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div className="alert alert-light" role="alert">
        Something wen Wrong, please try again later.
        <Link to={'/'} className="col-2 d-block btn btn-primary m-3">Go Back</Link>
    </div>
  )
}

export default Error