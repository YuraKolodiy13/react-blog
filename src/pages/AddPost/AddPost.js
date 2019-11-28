import React, {Component} from 'react'
// import PropTypes from 'prop-types'

import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import RichTextEditor from 'react-rte';

import Button from '@material-ui/core/Button';
import {addPost} from "../../store/actions/postsAction";
import {connect} from "react-redux";
import './AddPost.scss'
import {Helmet} from "react-helmet";

class AddPost extends Component{

  //
  // static propTypes = {
  //   onChange: PropTypes.func
  // };

  constructor(props){
    super(props);
    this.state = {
      title: '',
      value: RichTextEditor.createEmptyValue(),
      author: {
        email: '',
        id: ''
      },
      date: '',
      comments: ''
    };
  }

  componentDidMount(){
    setTimeout(() => {
      if(!this.props.user){
        this.props.history.push('/login')
      }
    })
  }
  componentDidUpdate(){
    if(!this.props.user){
      this.props.history.push('/login')
    }
  }

  changeValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  onChange = (value) => {
    value.toString('html')
    this.setState({value});
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({
      author: {
        email: this.props.user.email,
        id: this.props.user.id,
      },
      date: Date.now()
    });
    this.props.addPost(this.state, this.props.history);
  };

  onBlur = e => {
    e.target.closest('.MuiFormControl-root').classList.remove('trigger')
  };

  render(){
    return(
      <div className='container'>
        <Helmet>
          <title>Add post</title>
        </Helmet>
        <ValidatorForm onSubmit={this.onSubmit} className='addPost trigger__wrap'>
          <TextValidator
            id="outlined-basic"
            className='trigger'
            label="Title"
            variant="outlined"
            name='title'
            value={this.state.title}
            onChange={this.changeValue}
            onBlur={this.onBlur}
            validators={['required', 'minStringLength:2']}
            errorMessages={['This field is required', 'Need at least 2 characters']}
          />
          {/*<TextValidator*/}
            {/*id="outlined-basic"*/}
            {/*className='trigger'*/}
            {/*label="image"*/}
            {/*name='image'*/}
            {/*value={this.state.image}*/}
            {/*type='file'*/}
            {/*onChange={this.changeI}*/}
          {/*/>*/}
          {/*<TextValidator*/}
            {/*id="outlined-multiline-static"*/}
            {/*className='trigger'*/}
            {/*label="Text"*/}
            {/*multiline*/}
            {/*rows="7"*/}
            {/*value={this.state.text}*/}
            {/*margin="normal"*/}
            {/*variant="outlined"*/}
            {/*name='text'*/}
            {/*onChange={this.changeValue}*/}
            {/*onBlur={this.onBlur}*/}
            {/*validators={['required', 'minStringLength:5']}*/}
            {/*errorMessages={['This field is required', 'Need at least 5 characters']}*/}
          {/*/>*/}
          <RichTextEditor
            value={this.state.value}
            onChange={this.onChange}
          />
          <Button
            variant="contained"
            color="secondary"
            type='submit'
            className='button'
            onClick={e => e.target.closest('.addPost').classList.remove('trigger__wrap')}
          >Add</Button>
        </ValidatorForm>

      </div>
    )
  }
}

const mapsStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = {
  addPost: addPost
};

export default connect(mapsStateToProps, mapDispatchToProps)(AddPost)