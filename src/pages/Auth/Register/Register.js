import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';

import '../index.scss'
import {clearError, auth} from "../../../store/actions/authAction";
import {connect} from "react-redux";
import {Helmet} from "react-helmet";

class Register extends Component{

  constructor(props){
    super(props);
    this.state = {
      showPassword: false,
      showPassword2: false,
      name: '',
      password: '',
      password2: '',
      email: '',
    }
  }

  componentDidUpdate(){
    if(this.props.user){
      this.props.history.push('/')
    }
  }

  // componentDidMount(){
  //   this.props.clearError()
  // }

  changeValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.auth(this.state.email, this.state.password, false);
  };

  render(){
    return(
      <form onSubmit={this.onSubmit} className='auth'>
        <Helmet>
          <title>Register</title>
        </Helmet>
        <div className="form__field">
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            name='name'
            value={this.state.name}
            onChange={this.changeValue}
          />
          {this.props.error.name ? <p>{this.props.error.name}</p> : null}
        </div>
        <div className="form__field">
          <TextField
            type='email'
            value={this.state.email}
            label='Email'
            variant="outlined"
            name='email'
            onChange={this.changeValue}
          />
          {this.props.error.email ? <p>{this.props.error.email}</p> : null}
        </div>
        <div className="form__field">
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={this.state.showPassword ? 'text' : 'password'}
              value={this.state.password}
              name='password'
              onChange={this.changeValue}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => this.setState({showPassword: !this.state.showPassword})}
                  >
                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          {this.props.error.password ? <p>{this.props.error.password}</p> : null}
        </div>
        <div className="form__field">
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password2">Password2</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password2"
              type={this.state.showPassword2 ? 'text' : 'password'}
              value={this.state.password2}
              name='password2'
              onChange={this.changeValue}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => this.setState({showPassword2: !this.state.showPassword2})}
                  >
                    {this.state.showPassword2 ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={80}
            />
          </FormControl>
          {this.props.error.password2 ? <p>{this.props.error.password2}</p> : null}
        </div>
        <Button
          variant="contained"
          color="secondary"
          type='submit'
          className='button'
        >Sign up</Button>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return{
    user: state.auth.user,
    error: state.auth.error
  }
};

const mapDispatchToProps = {
  auth: auth,
  clearError: clearError
};

export default connect(mapStateToProps, mapDispatchToProps)(Register)