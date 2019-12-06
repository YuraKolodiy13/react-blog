import React, {Component} from 'react'
import {connect} from "react-redux";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import '../index.scss'
import {clearError, auth} from "../../../store/actions/authAction";
import {Helmet} from "react-helmet";

class Login extends Component{

  constructor(props){
    super(props);
    this.state = {
      showPassword: false,
      password: '',
      email: ''
    }
  }

  componentDidUpdate(){
    if(this.props.user){
      this.props.history.push('/')
    }
  }

  componentDidMount(){
    this.props.clearError()
  }

  changeValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.auth(this.state.email, this.state.password, true);
  };

  onBlur = e => {
    e.target.closest('.MuiFormControl-root').classList.remove('trigger')
  };

  changePasswordType = e => {
    console.log(5435)
    e.target.parentElement.classList.toggle('show');
    if(e.target.nextElementSibling.querySelector('input').getAttribute('type') === 'password'){
      e.target.nextElementSibling.querySelector('input').setAttribute('type', 'text');
    }else {
      e.target.nextElementSibling.querySelector('input').setAttribute('type', 'password');

    }
  }

  render(){
    return(
      <ValidatorForm className='auth trigger__wrap' onSubmit={this.onSubmit}>
        <Helmet>
          <title>Login</title>
        </Helmet>
        <div className="form__field">
          <TextValidator
            className='trigger'
            type='email'
            value={this.state.email}
            label='Email'
            variant="outlined"
            name='email'
            onChange={this.changeValue}
            validators={['required', 'isEmail']}
            errorMessages={['This field is required', 'email is not valid']}
          />
        </div>
        <div className="form__field form__password">
          <span className='form__icon' onClick={this.changePasswordType}/>
          <TextValidator
            className='trigger'
            type='password'
            value={this.state.password}
            label='Password'
            variant="outlined"
            name='password'
            onChange={this.changeValue}
            validators={['required']}
            errorMessages={['this field is required']}
          >
          </TextValidator>
        {this.props.error.error ? <p>{this.props.error.error.message}</p> : null}
        </div>
        <Button
          variant="contained"
          color="primary"
          type='submit'
          className='button'
        >Sign in</Button>
      </ValidatorForm>
    )
  }
}

const mapStateToProps = state => {
  return{
    user: state.auth.user,
    error: state.auth.error
  }
}

const mapDispatchToProps = {
  auth: auth,
  clearError: clearError
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)