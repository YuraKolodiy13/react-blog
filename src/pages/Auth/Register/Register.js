import React, {Component} from 'react'
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import '../index.scss'
import {clearError, auth} from "../../../store/actions/authAction";
import {connect} from "react-redux";
import {Helmet} from "react-helmet";

class Register extends Component{

  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: ''
    }
  }

  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });

    // this.props.clearError()
  }

  componentDidUpdate(){
    if(this.props.user){
      this.props.history.push('/')
    }
  }


  changeValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.auth(this.state.email, this.state.password, false, this.state.name);
  };

  changePasswordType = e => {
    if(e.target.nextElementSibling.querySelector('input').getAttribute('type') === 'password'){
      e.target.nextElementSibling.querySelector('input').setAttribute('type', 'text')
    }else {
      e.target.nextElementSibling.querySelector('input').setAttribute('type', 'password')
    }
  }

  onBlur = e => {
    e.target.closest('.MuiFormControl-root').classList.remove('trigger')
  };

  render(){
    return(
      <ValidatorForm onSubmit={this.onSubmit} className='auth trigger__wrap'>
        <Helmet>
          <title>Register</title>
        </Helmet>
        <div className="form__field">
          <TextValidator
            id="outlined-basic"
            className='trigger'
            label="Name"
            variant="outlined"
            name='name'
            value={this.state.name}
            onChange={this.changeValue}
            onBlur={this.onBlur}
            validators={['required', 'minStringLength:2']}
            errorMessages={['This field is required', 'Need at least 2 characters']}
          />
        </div>
        <div className="form__field">
          <TextValidator
            type='email'
            className='trigger'
            value={this.state.email}
            label='Email'
            variant="outlined"
            name='email'
            onChange={this.changeValue}
            onBlur={this.onBlur}
            validators={['required', 'isEmail']}
            errorMessages={['This field is required', 'email is not valid']}
          />
        </div>
        <div className="form__field form__password">
          <span className='form__icon' onClick={this.changePasswordType}/>
          <TextValidator
            className='form__password trigger'
            type='password'
            value={this.state.password}
            label='Password'
            variant="outlined"
            name='password'
            onChange={this.changeValue}
            onBlur={this.onBlur}
            validators={['required']}
            errorMessages={['this field is required']}
          >
          </TextValidator>
        </div>
        <div className="form__field form__password">
          <span className='form__icon' onClick={this.changePasswordType}/>
          <TextValidator
            className='form__password trigger'
            type='password'
            label='Password2'
            variant="outlined"
            name='password2'
            onChange={this.changeValue}
            onBlur={this.onBlur}
            validators={['isPasswordMatch', 'required']}
            errorMessages={['password mismatch', 'this field is required']}
            value={this.state.password2}
          >
          </TextValidator>
        </div>
        <Button
          variant="contained"
          color="secondary"
          type='submit'
          className='button'
        >Sign up</Button>
      </ValidatorForm>
    )
  }
}

const mapStateToProps = state => {
  return{
    user: state.auth.user
  }
};

const mapDispatchToProps = {
  auth: auth,
  clearError: clearError
};

export default connect(mapStateToProps, mapDispatchToProps)(Register)