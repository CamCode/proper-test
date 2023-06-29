import React from 'react'

const Repo = ({userRepos}) => {
  const {name, description, html_url, language, visibility, updated_at} = userRepos
  const date =  new Date(updated_at).toLocaleDateString()

  return (
    <div className='flex-fill m-2'>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">
          { description ? description: visibility}
          <br />
          Language: {language}
          </p>
          <a href={html_url} target='_blank' className="btn btn-outline-info">Go to the Repository</a>
        </div>
        <div className="card-footer bg-info-subtle text-body-secondary">
        Last updated {date}
      </div>
      </div>
    </div>
  )
}

export default Repo