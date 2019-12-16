import React, {Component} from 'react'
import {connect} from "react-redux";
import {getPosts} from "../../store/actions/postsAction";
import Loader from "../../components/Loader/Loader";
import './PostsPage.scss'
import Authors from "../../components/Authors/Authors";
import Helmet from 'react-helmet'
import Categories from "../../components/Categories/Categories";
import Posts from "../../components/Posts/Posts";

class PostsPage extends Component{

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
                  <Posts item={item} key={key}/>
                )}
            </div>
        </div>
        <div className="sidebar">
          <Categories/>
          <Authors posts={this.props.posts}/>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(PostsPage)