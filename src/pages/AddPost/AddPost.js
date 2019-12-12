import React, {Component} from 'react'
import axios from "axios/index";
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
        id: '',
        name: ''
      },
      featuredImage: '',
      file: '',
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

  flag = true;
  onChange = (value) => {
    this.flag = false;
    value.toString('html');
    if(value.toString('html').replace(/<\/?[^>]+(>|$)/g, "").length){
      document.querySelector('.RichTextEditor__root___2QXK-').classList.remove('error')
    }

    this.setState({value});
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({
      author: {
        email: this.props.user.email,
        id: this.props.user.id,
        name: this.props.user.name
      },
      date: Date.now()
    });
    if(this.state.file && Object.entries(this.state.value._cache).length){
      this.uploadFile();
    }
  };

  uploadFile = () => {
    const fd = new FormData();
    fd.append('image', this.state.file, this.state.file.name);
    axios.post('https://us-central1-fir-89ca2.cloudfunctions.net/uploadFile', fd)
      .then(res => {
        this.setState({
          featuredImage: res.data.url
        }, function () {
          this.props.addPost(this.state, this.props.history)
        });
      })
  };

  onBlur = e => {
    e.target.closest('.MuiFormControl-root').classList.remove('trigger')
  };

  handleFileChange = (event) => {
    this.setState({file: event.target.files[0]});
    const input = event.target;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        input.closest('.addPost__file').style.backgroundImage = "url('" + e.target.result + "')";
        input.closest('.addPost__file').classList.remove('error');
      };
      reader.readAsDataURL(file);
    }else {
      input.closest('.addPost__file').removeAttribute('style');
      input.closest('.addPost__file').classList.add('error');
      this.setState({file: ''});
    }
  };

  onError = () => {
    if(!this.state.file){
      document.querySelector('.addPost__file').classList.add('error');
    }
    if(this.flag){
      if(!('html' in this.state.value._cache)){
        document.querySelector('.RichTextEditor__root___2QXK-').classList.add('error');
      }
    }
  };

  render(){
    return(
      <div className='container'>
        <Helmet>
          <title>Add post</title>
        </Helmet>
        <ValidatorForm onSubmit={this.onSubmit} onError={this.onError} className='addPost trigger__wrap'>
          <TextValidator
            id="outlined-basic"
            className='trigger'
            label="Title"
            variant="outlined"
            name='title'
            type='text'
            value={this.state.title}
            onChange={this.changeValue}
            onBlur={this.onBlur}
            validators={['required', 'minStringLength:2', 'trim']}
            errorMessages={['This field is required', 'Need at least 2 characters', 'Your title is empty']}
          />

          <div className="addPost__file MuiFormControl-root">
            <label htmlFor="input-file">Featured image
              <input
                type="file"
                name='file'
                accept="image/*"
                id='input-file'
                onChange={this.handleFileChange}
                style={{display: 'none'}}
              />
            </label>
            <span className='MuiFormHelperText-root Mui-error'>This field is required</span>
          </div>
          <div className="editor MuiFormControl-root">
            <RichTextEditor
              placeholder='Type something'
              value={this.state.value}
              onChange={this.onChange}
            />
            <span className='MuiFormHelperText-root Mui-error'>This field is required</span>
          </div>
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