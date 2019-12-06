import React, {Component} from 'react'
import {Link} from  'react-router-dom'
import './Authors.scss'

class Authors extends Component{
  render(){
    let authors = {};
    this.props.posts.map((item) => authors[item[1].author.id] = item[1].author);
    return(
      <div className="posts__authors authors">
        <h4>Our authors</h4>
        {Object.values(authors).map((item, key) =>
          <div className="posts__author" key={key}>
            <Link to={`/user/${item.id}`}>{item.name}</Link>
          </div>
        )}
      </div>
    )
  }
}

export default Authors