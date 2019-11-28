import React, {Component} from 'react'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import Button from '@material-ui/core/Button';
import {editPost, getPost} from "../../store/actions/postsAction";
import {connect} from "react-redux";
import './EditPost.scss'

class EditPost extends Component{

  constructor(props){
    super(props);
    this.state = {
      title: this.props.post.title,
      value: this.props.post.value,
      author: this.props.post.author,
      date: this.props.post.date,
      comments: this.props.post.comments,
    };
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.editPost(this.props.id, this.state)
      .then(() => this.props.getPost(this.props.id));
  };

  changeValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  render(){
    return(
      <ValidatorForm onSubmit={this.onSubmit} className='editPost'>
        <TextValidator
          ref={this.state.title}
          id="outlined-basic"
          label="Title"
          variant="outlined"
          name='title'
          value={this.state.title}
          onChange={this.changeValue}
          validators={['required', 'minStringLength:2']}
          errorMessages={['This field is required', 'Need at least 2 characters']}
        />
        <TextValidator
          ref={this.state.text}
          id="outlined-multiline-static"
          label="Text"
          multiline
          rows="7"
          name='text'
          value={this.state.value}
          onChange={this.changeValue}
          margin="normal"
          variant="outlined"
          validators={['required', 'minStringLength:5']}
          errorMessages={['This field is required', 'Need at least 5 characters']}
        />
        <Button
          variant="contained"
          color="secondary"
          type='submit'
          className='button'
          onClick={this.props.closeModal}
        >Save</Button>
      </ValidatorForm>
    )
  }
}

const mapDispatchToProps = {
  editPost: editPost,
  getPost: getPost
};

export default connect(null, mapDispatchToProps)(EditPost)
