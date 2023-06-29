import React from 'react'
import { Link } from 'react-router-dom'

const User = ({user}) => {
  const { avatar_url, login} = user
  return (
    <div className="m-3 col border-info ">
      <div className="card-body">
        <p className="card-text">{login}</p>
        <img src={avatar_url} className="img-fluid mb-3 rounded-1 mx-auto" alt="..."/>
         <Link to={`/user/${login}`} className="btn btn-primary">Detail</Link>
      </div>
    </div>
  )
}

export default User