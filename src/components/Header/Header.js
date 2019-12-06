import React from 'react';
import './Header.scss'
import {Link} from  'react-router-dom'
import {connect} from 'react-redux'
import {logout} from "../../store/actions/authAction";

const Header = props =>{

  return (
    <nav className='header'>
      <h1>
        <Link to='/'>React Blog</Link>
      </h1>
      {props.user
        ? <ul>
          <li>
            <Link to='/add'>Add article</Link>
          </li>
        </ul>
      : null
      }

      {props.user
      ? <ul>
          <li>
            <Link to={`/user/${props.user.id}`}>{props.user.name}</Link>
          </li>
          <li>
            <span onClick={props.logout}>Logout</span>
          </li>
        </ul>
      : <ul>
          <li>
            <Link to='/login'>Sign in</Link>
          </li>
          <li>
            <Link to='/register'>Sign up</Link>
          </li>
        </ul>
      }

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