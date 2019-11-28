import React, {Component} from 'react'
import {Route, Switch, Redirect} from "react-router-dom";
import Posts from "../../pages/Posts/Posts";
import Post from "../../pages/Post/Post";
import Header from "../Header/Header";
import Login from "../../pages/Auth/Login/Login";
import Register from "../../pages/Auth/Register/Register";
import AddPost from "../../pages/AddPost/AddPost";
import User from "../../pages/User/User";
import './App.scss'
import {connect} from "react-redux";
import {autoLogin} from "../../store/actions/authAction";

class App extends Component{
  componentDidMount(){
    this.props.autoLogin()
  }
  render(){
    return(
      <div className='container'>
        <Header/>
        <Switch>
          <Route path='/' component={Posts} exact/>
          <Route path='/post/:id' component={Post}/>
          <Route path='/user/:id' component={User}/>
          <Route path='/add' component={AddPost}/>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <Redirect to='/'/>
        </Switch>
      </div>
    )
  }
}

export default connect(null, {autoLogin})(App);
