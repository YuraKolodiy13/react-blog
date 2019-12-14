import React, {Component, Fragment} from 'react'
import {connect} from "react-redux";
import {getPosts} from "../../store/actions/postsAction";
import {Helmet} from "react-helmet";
import './Caregory.scss'
import Posts from "../../components/Posts/Posts";

class Category extends Component {

  componentDidMount() {
    this.props.getPosts()
  }

  render() {
    return (
      <div className='category posts'>
        <Helmet>
          <title>{this.props.match.params.id}</title>
        </Helmet>
        <h2>{this.props.match.params.id}</h2>
        <div className="posts__items">
          {this.props.posts.map((item, key) =>
            <Fragment key={key}>
              {this.props.match.params.id === item[1].category
                ? <Posts item={item} key={key}/>
                : null}
            </Fragment>
          )}
        </div>
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