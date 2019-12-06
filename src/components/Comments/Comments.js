import React, {Component} from 'react'
import './Comments.scss'
import Button from '@material-ui/core/Button';
import {deleteComment, editComment} from "../../store/actions/postsAction";
import {connect} from "react-redux";
import TextField from '@material-ui/core/TextField';

class Comments extends Component{

  constructor(props){
    super(props);
    this.state = {
      text: ''
    }
  }

  changeValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.editComment(this.props.id, this.state)
      .then(() => this.props.getPost(this.props.id));
  };

  render(){
    const {user, post, deleteComment} = this.props;
    return(
      <div className='comments'>
        <h2>{Object.entries(post.comments).length} Comments</h2>
        <div className="comments__items">
          {Object.entries(post.comments).map((item, key) =>
            <div key={key} className='comments__item' data-open="false">
              <p>{console.log(item[1].author, 4535)}</p>
              <h4>{item[1].author.name} says: {item[1].author.id === post.author.id ? <span>author</span> : null}</h4>
              <p>{item[1].text}</p>
              <form onSubmit={this.onSubmit}>
                <TextField
                  id="outlined-multiline-static"
                  label="Type something"
                  name='text'
                  value={this.state.text}
                  onChange={this.changeValue}
                  margin="normal"
                  variant="outlined"
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className='button'
                  onClick={(e) => e.target.closest('.comments__item').dataset.open = 'false'}
                >Save</Button>
              </form>

              {user
                ? user.id === item[1].author.id
                ?<div className="comments__edit">
                  <Button
                    variant="contained"
                    color="primary"
                    className='button'
                    onClick={(e) => {e.target.closest('.comments__item').dataset.open = 'true'; this.setState({text: item[1].text})}}
                  >Edit</Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    className='button'
                    onClick={() => deleteComment(this.props.id, item[0])}
                  >Remove</Button>
                </div>
                : null : null}

            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    user: state.auth.user,
    post: state.posts.post
  }
};
const mapDispatchToProps = {
  deleteComment: deleteComment,
  editComment: editComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);