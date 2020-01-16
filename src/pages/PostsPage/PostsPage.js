import React, {Component} from 'react'
import {connect} from "react-redux";
import {getPosts} from "../../store/actions/postsAction";
import Loader from "../../components/Loader/Loader";
import './PostsPage.scss'
import Authors from "../../components/Authors/Authors";
import Helmet from 'react-helmet'
import Categories from "../../components/Categories/Categories";
import PostItem from "../../components/PostItem/PostItem";
import Button from '@material-ui/core/Button';
import Search from "../../components/Search/Search";

class PostsPage extends Component{

  constructor(props) {
    super(props);
    this.state = {
      visible: 5
    };
  }

  loadMore = () => {
    this.setState((prev) => {
      return {visible: prev.visible + 5};
    });
  };

  componentDidMount(){
    this.props.getPosts()
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
              {this.props.posts.slice(0, this.state.visible).map((item, key) =>
                <PostItem item={item} key={key}/>
              )}
            </div>
          {this.state.visible < this.props.posts.length &&
            <Button onClick={this.loadMore} variant="contained" color="secondary" type="button">Load more</Button>
          }
        </div>
        <div className="sidebar">
          <Categories categoryId={this.props.match.params.id}/>
          <Authors posts={this.props.posts}/>
          <Search posts={this.props.posts} themeBg={this.props.themeBg}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    posts: state.posts.posts,
    loading: state.posts.loading,
    themeBg: state.posts.themeBg
  }
};
const mapDispatchToProps = {
  getPosts: getPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsPage)