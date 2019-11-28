import React from 'react'
import {Link} from  'react-router-dom'

const Authors = props => {
  return(
    <div className="posts__authors">
      {props.posts.map((item, key) =>
        <div className='post__author' key={key}>
          <Link to={`/user/${item[1].author.id}`} >{item[1].author.email}</Link>
        </div>
      )}
    </div>
  )
}

export default Authors