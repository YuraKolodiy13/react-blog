import React, {Component} from 'react'
import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';

import Button from '@material-ui/core/Button';
import {editPost, getPost} from "../../store/actions/postsAction";
import {connect} from "react-redux";
import RichTextEditor from 'react-rte';
import './EditPost.scss'
import axios from 'axios'
import MenuItem from '@material-ui/core/MenuItem';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

class EditPost extends Component{

  constructor(props){
    super(props);
    this.state = {
      title: this.props.post.title,
      value: RichTextEditor.createValueFromString(this.props.post.value._cache.html, 'html'),
      author: this.props.post.author,
      date: this.props.post.date,
      comments: this.props.post.comments,
      featuredImage: this.props.post.featuredImage.replace(/ /g, '%20'),
      category: this.props.post.category,
      file: '',
      timeToRead: this.props.post.timeToRead || ''
    };
  }

  onSubmit = e => {
    e.preventDefault();
    this.uploadFile();
  };

  changeValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  onChange = (value) => {
    value.toString('html');
    this.setState({value: value});
  };

  uploadFile = () => {
    const fd = new FormData();
    if(this.state.file){
      fd.append('image', this.state.file, this.state.file.name);
      axios.post('https://us-central1-fir-89ca2.cloudfunctions.net/uploadFile', fd)
        .then(res => {
          this.setState({
            featuredImage: res.data.url
          }, function () {
            this.props.editPost(this.props.id, this.state)
              .then(() => this.props.getPost(this.props.id));
          });
        })
    }else{
      this.props.editPost(this.props.id, this.state)
        .then(() => this.props.getPost(this.props.id));
    }

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

  render(){
    return(
      <ValidatorForm onSubmit={this.onSubmit} className={`addPost editPost ${this.props.themeBg === 'night' ? 'night' : ''}`}>
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
        <div className="addPost__file MuiFormControl-root" style={{backgroundImage: `url(${this.state.featuredImage})`}}>
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
          onClick={this.props.closeModal}
        >Save</Button>
      </ValidatorForm>
    )
  }
}

const mapStateToProps = state => {
  return{
    categories: state.posts.categories,
    themeBg: state.posts.themeBg
  }
};

const mapDispatchToProps = {
  editPost: editPost,
  getPost: getPost
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)
