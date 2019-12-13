import React, {Component} from 'react'
import './Comments.scss'
import Button from '@material-ui/core/Button';
import {deleteComment, editComment, getPost} from "../../store/actions/postsAction";
import {connect} from "react-redux";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

class Comments extends Component{

  constructor(props){
    super(props);
    this.state = {
      text: '',
      sortBy: 'newest'
    }
  }

  changeValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  onSubmit = (e, prop) => {
    e.preventDefault();
    this.props.editComment(this.props.id, prop, {text: this.state.text})
      .then(() => this.props.getPost(this.props.id));
  };

  handleChange = (event) => this.setState(
    {sortBy: event.target.value}
  );


  render(){
    const {user, post, deleteComment} = this.props;
    return(
      <div className='comments'>
        <h2>{Object.entries(post.comments).length} Comments</h2>
        <div className="comments__sort">
          <TextField
            select
            label="Sort by"
            value={this.state.sortBy}
            onChange={this.handleChange}
            // variant="outlined"
          >
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
          </TextField>
        </div>
        <div className="comments__items" data-sort={this.state.sortBy === 'newest' ? 'newest' : 'oldest'}>
          {Object.entries(post.comments).map((item, key) =>
            <div key={key} className='comments__item' data-open="false">
              <h4>{item[1].author.name} says: {item[1].author.id === post.author.id ? <span>author</span> : null}
                <time>{new Date(item[1].date).toLocaleDateString('en-US', {minute: 'numeric', hour: 'numeric', day: 'numeric', month: 'long', year: 'numeric'})}</time>
              </h4>
              <p>{item[1].text}</p>
              <form onSubmit={(e) => this.onSubmit(e, item[0])}>
                <TextField
                  id="outlined-multiline-static"
                  label="Type something"
                  name='text'
                  multiline
                  rows="5"
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
                  onClick={(e) => {
                    e.target.closest('.comments__item').dataset.open = 'false';
                    document.querySelector('.comments__items').classList.remove('editing');
                  }}
                >Save</Button>
              </form>

              {user
                ? user.id === item[1].author.id
                ?<div className="comments__edit">
                  <Button
                    variant="contained"
                    color="primary"
                    className='button'
                    onClick={(e) => {
                      if(document.querySelector('.comments__item[data-open="true"]')){
                        document.querySelector('.comments__item[data-open="true"]').setAttribute('data-open', 'false');
                      }
                      e.target.closest('.comments__item').dataset.open = 'true';
                      this.setState({text: item[1].text})
                    }}
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
  getPost: getPost
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);