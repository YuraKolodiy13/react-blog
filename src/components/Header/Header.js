import React from 'react';
import './Header.scss'
import {NavLink} from  'react-router-dom'
import {connect} from 'react-redux'
import {logout} from "../../store/actions/authAction";
import {changeBgColor} from "../../store/actions/postsAction";

const Header = props =>{

  return (
    <nav className='header__wrapper'>
      <div className='header container'>
        <h1>
          <NavLink to='/' exact>React Blog</NavLink>
        </h1>
        {props.user
          ? <ul>
            <li>
              <NavLink to='/add'>Add article</NavLink>
            </li>
          </ul>
          : null
        }

        <div className="header__switcher">
          <div className="button__day" onClick={() => props.changeBgColor('day')}/>
          <div className="button__night" onClick={() => props.changeBgColor('night')}/>
          <div className={`button__switcher`}/>
        </div>

        {props.user
          ? <ul>
            <li>
              <NavLink to="/album">Album</NavLink>
            </li>
            <li>
              <NavLink to={`/author/${props.user.id}`}>{props.user.name}</NavLink>
            </li>
            <li>
              <span onClick={props.logout}>Logout</span>
            </li>
          </ul>
          : <ul>
            <li>
              <NavLink to='/login'>Sign in</NavLink>
            </li>
            <li>
              <NavLink to='/register'>Sign up</NavLink>
            </li>
          </ul>
        }

      </div>
    </nav>
  )
};


const mapStateToProps = state => {
  return{
    user: state.auth.user
  }
}

const mapDispatchToProps ={
  logout: logout,
  changeBgColor: changeBgColor
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)