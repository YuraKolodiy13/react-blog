import React, {Component} from 'react'
import './Post.scss'
import {connect} from "react-redux";
import {deletePost, getPost, getPosts} from "../../store/actions/postsAction";
import Loader from "../../components/Loader/Loader";
import Button from '@material-ui/core/Button';

import EditPost from "../../components/EditPost/EditPost";

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import AddComment from "../../components/AddComment/AddComment";
import {Link} from  'react-router-dom'
import Comments from "../../components/Comments/Comments";
import Authors from "../../components/Authors/Authors";
import {Helmet} from "react-helmet";
import Categories from "../../components/Categories/Categories";

class Post extends Component{

  constructor(props){
    super(props);
    this.state = {
      open: false,
      confirm: false
    }
  }

  componentDidMount(){
    this.props.getPost(this.props.match.params.id);
    this.props.getPosts();
  }

  closeModal = () => {
    this.setState({open: false})
  };

  Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  render(){
    const {post, user, posts, deletePost} = this.props;
    if(this.props.loading){
      return <Loader/>
    }
    return(
      <div className="post">
        <Helmet>
          <title>{post.title}</title>
        </Helmet>
        <div className="post__list">
          <h1>{post.title}</h1>
          <div className="posts__info post__info">
            <p>{post.author ? <Link to={`/user/${post.author.id}`}>{post.author.name}</Link> : null}</p>
            <time>{new Date(post.date).toLocaleDateString('en-US', {day: 'numeric', month: 'long', year: 'numeric'})}</time>
            <span>{post.comments ? `${Object.entries(post.comments).length} Replies` : 'No Reply'}</span>
          </div>

          {post.featuredImage
          ? <div className="post__img" style={{backgroundImage: `url(${post.featuredImage.replace(/ /g, '%20')})`}}/>
          : null}

          {post.value
          ? <div className='post__content' dangerouslySetInnerHTML={{__html: post.value._cache.html}}/>
          : null}

          {post.author && user && user.id === post.author.id
            ? <div className='post__edit'>
              <Button
                variant="contained"
                color="primary"
                className='button'
                onClick={() => this.setState({open: true})}
              >Edit</Button>
              <Dialog
                className='container'
                open={this.state.open}
                onClose={() => this.setState({open: false})}
                TransitionComponent={this.Transition}
                keepMounted
              >
                <DialogContent >
                  <div >
                    <EditPost post={post} id={this.props.match.params.id} open={this.state.open} closeModal={this.closeModal}/>
                  </div>
                </DialogContent>
              </Dialog>
              <Button
                variant="contained"
                color="secondary"
                className='button'
                onClick={() => this.setState({confirm: true})}
              >Remove</Button>
              <Dialog
                className='container confirm'
                open={this.state.confirm}
                onClose={() => this.setState({confirm: false})}
                TransitionComponent={this.Transition}
                keepMounted
              >
                <DialogContent >
                  <div>
                    <h4>Are you sure you really wanted to delete it?</h4>
                    <div className="confirm__answer">
                      <Button
                        variant="contained"
                        color="primary"
                        className='button'
                        onClick={() => this.setState({confirm: false})}
                      >No</Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        className='button'
                        onClick={() => deletePost(this.props.match.params.id, this.props.history)}
                      >Yes</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            : null }
          {post.comments
            ? <Comments id={this.props.match.params.id} />
            : null}

          {user
            ? <AddComment id={this.props.match.params.id} />
            : <div>
              <p>If you want to add comment please <Link to='/login'>sign in</Link> or <Link to='/register'>sign up</Link></p>
            </div>
          }
        </div>
        <div className="sidebar">
          <Categories/>
          <Authors posts={posts}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    user: state.auth.user,
    post: state.posts.post,
    posts: state.posts.posts,
    loading: state.posts.loading
  }
};
const mapDispatchToProps = {
  getPost: getPost,
  getPosts: getPosts,
  deletePost: deletePost
};

export default connect(mapStateToProps, mapDispatchToProps)(Post)