import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from '../../../services/axios';
import Repo from '../Repo/Repo';
import Error from '../Error/Error';

const UserDetail = () => {
  const {login} = useParams();
  const [userInfo, setUserInfo] = useState({});
  const [userRepos, setUserRepos] = useState([]);

  const fetchUserInfo = async () => {
    await Promise.all([
      axios.get(`/users/${login}`),
      axios.get(`/users/${login}/repos?type=publicpage=1`)
    ]).then( res => {
        console.log(res)
        setUserInfo(res[0].data)
        setUserRepos(res[1].data)
      }).catch((error )=> {
        console.error(error)
      })
  }

  useEffect(()=> {
    fetchUserInfo()
  },[])

  return (
    <>
    {
    userInfo ?    
     <div className="container text-center">
      <Link to={'/'} className="d-block w-25 btn btn-link m-3">Back</Link>
       <div className="card-header fw-bolder mb-3">
         <h3>{userInfo.login}</h3>
       </div>
       <div className="card-body">
         <h5 className="card-title">{userInfo.name}</h5>
         <img src={userInfo.avatar_url} className="w-25 mb-3 rounded-1 mx-auto" alt={userInfo.login}/>
         <p className="card-text col-8 mx-auto">
         {userInfo?.bio}
         </p>
         <ul className="list-group list-group-horizontal mb-3 justify-content-center">
             <li className="list-group-item">
               Followers<span className="m-2 badge bg-info rounded-pill">{userInfo.followers}</span>
             </li>
             <li className="list-group-item">
               Following<span className="m-2 badge bg-info rounded-pill">{userInfo.following}</span>
             </li>
             <li className="list-group-item">
               Repos<span className="m-2 badge bg-info rounded-pill">{userInfo.public_repos}</span>
             </li>
           </ul>
         <a href={userInfo.html_url} className="btn btn-info m-3">Go to Profile</a>
       </div>
       <h3 className='m-3'>Repositories</h3>
       <div class="container d-flex p-2 flex-wrap justify-content-between flex-row">
         {
           userRepos ? userRepos.map((repo,index)=> {
             return <Repo key={index} userRepos={repo} />
           }) 
           : <h3> The User doesn't have Repositories</h3>
         }
       </div>
     </div>
     :
    <Error />
    }
  </>
  )
}

export default UserDetail