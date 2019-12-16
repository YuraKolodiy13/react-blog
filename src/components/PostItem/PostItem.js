import React from 'react'
import {Link} from "react-router-dom";
import './PostItem.scss'
import Button from '@material-ui/core/Button';

const PostItem = props => {
  return (
    <div className='posts__item fade-in'>
      <div className="posts__img" style={{backgroundImage: `url(${props.item[1].featuredImage.replace(/ /g, '%20')})`}}>
        <Link to={`/post/${props.item[0]}`}/>
      </div>
      <div className="posts__wrap">
        <div className="posts__info">
          <p className='cat'><Link to={`/category/${props.item[1].category}`}>{props.item[1].category}</Link></p>
          <p className='time'>{props.item[1].timeToRead} min read</p>
        </div>
        <h4><Link to={`/post/${props.item[0]}`}>{props.item[1].title}</Link></h4>
        <div className="posts__info">
          <p><Link to={`/user/${props.item[1].author.id}`}>{props.item[1].author.name}</Link></p>
          <time>{new Date(props.item[1].date).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}</time>
          <span>{props.item[1].comments ? `${Object.entries(props.item[1].comments).length} Replies` : 'No Reply'}</span>
        </div>
        <p>{props.item.image}</p>
        <p className='posts__description'
           dangerouslySetInnerHTML={{__html: props.item[1].value._cache.html.length > 150 ? `${props.item[1].value._cache.html.slice(0, 150)}...` : props.item[1].value._cache.html}}/>
        <Button
          variant="contained"
          color="primary"
          className='button'
        >
          <Link to={`/post/${props.item[0]}`}>Read More</Link>
        </Button>
      </div>
    </div>
  )
}

export default PostItem