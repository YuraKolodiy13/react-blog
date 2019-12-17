import React from 'react';
import './Header.scss'
import {NavLink} from  'react-router-dom'
import {connect} from 'react-redux'
import {logout} from "../../store/actions/authAction";

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

        {props.user
          ? <ul>
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
  logout: logout
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)