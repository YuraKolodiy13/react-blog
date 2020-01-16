import React, {Component} from 'react'
import {Route, Switch, Redirect} from "react-router-dom";
import PostsPage from "../../pages/PostsPage/PostsPage";
import Post from "../../pages/Post/Post";
import Header from "../Header/Header";
import Login from "../../pages/Auth/Login/Login";
import Register from "../../pages/Auth/Register/Register";
import AddPost from "../../pages/AddPost/AddPost";
import AuthorPage from "../../pages/AuthorPage/AuthorPage";
import './App.scss'
import {connect} from "react-redux";
import {autoLogin} from "../../store/actions/authAction";
import Footer from "../Footer/Footer";
import Category from "../../pages/Category/Category";

class App extends Component{
  componentDidMount(){
    this.props.autoLogin();
    this.checkMenu();
    window.addEventListener('scroll', this.checkMenu);
  }

  checkMenu = () => {
    if(document.querySelector('body').getBoundingClientRect().top < 0){
      document.querySelector('.header__wrapper').classList.add('fixed');
    }else {
      document.querySelector('.header__wrapper').classList.remove('fixed');
    }
  };

  render(){
    return(
      <div className={`app-container ${this.props.themeBg === 'night' ? 'night' : ''}`}>
        <div className="container">
          <Header/>
          <Switch>
            <Route path='/' component={PostsPage} exact/>
            <Route path='/post/:id' component={Post}/>
            <Route path='/author/:id' component={AuthorPage}/>
            <Route path='/category/:id' component={Category}/>
            <Route path='/add' component={AddPost}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Redirect to='/'/>
          </Switch>
          <Footer/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    themeBg: state.posts.themeBg
  }
}

export default connect(mapStateToProps, {autoLogin})(App);
