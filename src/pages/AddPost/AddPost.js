import React, {Component, Fragment} from 'react'
import axios from "axios/index";
// import PropTypes from 'prop-types'

import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';
import RichTextEditor from 'react-rte';

import Button from '@material-ui/core/Button';
import {addPost} from "../../store/actions/postsAction";
import {connect} from "react-redux";
import './AddPost.scss'
import {Helmet} from "react-helmet";
import MenuItem from '@material-ui/core/MenuItem';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

class AddPost extends Component{

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
      comments: '',
      category: '',
      timeToRead: '1'
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
      <Fragment>
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
          <SelectValidator
            id="outlined-select-currency"
            select
            label="Category"
            name='category'
            value={this.state.category}
            onChange={this.changeValue}
            validators={['required']}
            errorMessages={['This field is required']}
            variant="outlined"
          >
            {this.props.categories.map((option, key) => (
              <MenuItem key={key} value={option.label}>{option.label}</MenuItem>
            ))}
          </SelectValidator>
          <FormControl component="fieldset" className='radio'>
            <FormLabel component="legend">Estimated time to read (min)</FormLabel>
            <RadioGroup aria-label="position" name="timeToRead" value={this.state.timeToRead} onChange={this.changeValue} row>
              <FormControlLabel value="1" control={<Radio color="primary" />} label="1" labelPlacement="top"/>
              <FormControlLabel value="2" control={<Radio color="primary" />} label="2" labelPlacement="top"/>
              <FormControlLabel value="3" control={<Radio color="primary" />} label="3" labelPlacement="top"/>
              <FormControlLabel value="4" control={<Radio color="primary" />} label="4" labelPlacement="top"/>
              <FormControlLabel value="5" control={<Radio color="primary" />} label="5" labelPlacement="top"/>
              <FormControlLabel value="6" control={<Radio color="primary" />} label="6" labelPlacement="top"/>
              <FormControlLabel value="7" control={<Radio color="primary" />} label="7" labelPlacement="top"/>
              <FormControlLabel value="8" control={<Radio color="primary" />} label="8" labelPlacement="top"/>
              <FormControlLabel value="9" control={<Radio color="primary" />} label="9" labelPlacement="top"/>
              <FormControlLabel value="10" control={<Radio color="primary" />} label="10" labelPlacement="top"/>
            </RadioGroup>
          </FormControl>
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

      </Fragment>
    )
  }
}

const mapsStateToProps = state => ({
  user: state.auth.user,
  categories: state.posts.categories
});

const mapDispatchToProps = {
  addPost: addPost
};

export default connect(mapsStateToProps, mapDispatchToProps)(AddPost)