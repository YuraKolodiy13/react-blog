import React, {Component, Fragment} from 'react'
import {connect} from "react-redux";
import {getPosts} from "../../store/actions/postsAction";
import {Helmet} from "react-helmet";
import Posts from "../../components/Posts/Posts";

class User extends Component {

  componentDidMount() {
    this.props.getPosts()
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Author</title>
        </Helmet>
        {/*<p>{this.props.user.name}</p>*/}
        {/*<p>{this.props.user.email}</p>*/}
        <h2>Authors posts</h2>
        <div className="posts__items">
          {this.props.posts.map((item, key) =>
            <Fragment key={key}>
              {this.props.match.params.id === item[1].author.id
                ? <Posts item={item} key={key}/>
                : null}
            </Fragment>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  posts: state.posts.posts
})

const mapDispatchToProps = {
  getPosts: getPosts
}

export default connect(mapStateToProps, mapDispatchToProps)(User)