import React, {Component, Fragment} from 'react'
import {connect} from "react-redux";
import {getPosts} from "../../store/actions/postsAction";
import {Link} from  'react-router-dom'
import {Helmet} from "react-helmet";
import './Caregory.scss'

class Category extends Component{

  componentDidMount(){
    this.props.getPosts()
  }

  render(){
    return(
      <div className='category'>
        <Helmet>
          <title>{this.props.match.params.id}</title>
        </Helmet>
        <h2>{this.props.match.params.id}</h2>
        {this.props.posts.map((item, key) =>
          <Fragment key={key}>
            {this.props.match.params.id === item[1].category
              ?<ul>
                <li>
                  <Link to={`/category/${item[0]}`}>{item[1].title}</Link>
                </li>
              </ul>
              : null}
          </Fragment>
        )}
        <p className='category__empty'>This category is empty now</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts.posts
})

const mapDispatchToProps = {
  getPosts: getPosts
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)