import React, {Component} from 'react'
import {connect} from "react-redux";
import {getPosts} from "../../store/actions/postsAction";
import {Link} from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import './Posts.scss'
import Button from '@material-ui/core/Button';
import Authors from "../../components/Authors/Authors";
import Helmet from 'react-helmet'

class Posts extends Component{

  componentDidMount(){
    this.props.getPosts();
  }

  render(){
    if(this.props.loading){
      return <Loader/>
    }
    return(
      <div className='posts'>
        <Helmet>
          <title>Home Page</title>
        </Helmet>
        <div className="posts__list">
          <h1>List of articles</h1>
          <div className="posts__items">
            {this.props.posts.map((item, key) =>
              <div key={key} className='posts__item'>
                <div className="posts__img" style={{backgroundImage: `url(${item[1].featuredImage.replace(/ /g, '%20')})`}}>
                  <Link to={`post/${item[0]}`}/>
                </div>
                <div className="posts__wrap">
                  <h4><Link to={`post/${item[0]}`}>{item[1].title}</Link></h4>
                  <div className="posts__info">
                    <p><Link to={`/user/${item[1].author.id}`}>{item[1].author.name}</Link></p>
                    <time>{new Date(item[1].date).toLocaleDateString('en-US', {day: 'numeric', month: 'long', year: 'numeric'})}</time>
                    <span>{item[1].comments ? `${Object.entries(item[1].comments).length} Replies` : 'No Reply'}</span>
                  </div>
                  <p>{item.image}</p>
                  <p className='posts__description' dangerouslySetInnerHTML={{__html: item[1].value._cache.html.length > 150 ? `${item[1].value._cache.html.slice(0, 150)}...` : item[1].value._cache.html}}/>
                  <Button
                    variant="contained"
                    color="primary"
                    className='button'
                  >
                    <Link to={`post/${item[0]}`}>Read More</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        <Authors posts={this.props.posts}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    posts: state.posts.posts,
    loading: state.posts.loading
  }
};
const mapDispatchToProps = {
  getPosts: getPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts)