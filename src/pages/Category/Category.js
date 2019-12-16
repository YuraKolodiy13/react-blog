import React, {Component, Fragment} from 'react'
import {connect} from "react-redux";
import {getPosts} from "../../store/actions/postsAction";
import {Helmet} from "react-helmet";
import './Caregory.scss'
import PostItem from "../../components/PostItem/PostItem";
import Categories from "../../components/Categories/Categories";
import Authors from "../../components/Authors/Authors";
import Button from '@material-ui/core/Button';

class Category extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: 5
    };
  }

  loadMore = () => {
    this.setState((prev) => {
      return {visible: prev.visible + 5};
    });
  };


  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const filteredPosts = this.props.posts.filter(item => this.props.match.params.id === item[1].category);
    return (
      <div className='category posts'>
        <Helmet>
          <title>{this.props.match.params.id}</title>
        </Helmet>
        <div className="posts__list">
          <h2>{this.props.match.params.id}</h2>
          <div className="posts__items">
            {filteredPosts.slice(0, this.state.visible).map((item, key) =>
              <Fragment key={key}>
                <PostItem item={item} key={key}/>
              </Fragment>
            )}
            <p className='category__empty'>This category is empty now</p>
          </div>
          {this.state.visible < filteredPosts.length &&
            <Button onClick={this.loadMore} variant="contained" color="secondary" type="button">Load more</Button>
          }
        </div>
        <div className="sidebar">
          <Categories categoryId={this.props.match.params.id}/>
          <Authors posts={this.props.posts}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts.posts
});

const mapDispatchToProps = {
  getPosts: getPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(Category)