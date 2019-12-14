import React, {Component} from 'react'
import {Link} from  'react-router-dom'
import {connect} from "react-redux";
import './Categories.scss'

class Categories extends Component{
  render(){
    return(
      <div className="posts__categories categories">
        <h4>Categories</h4>
        {this.props.categories.map((item, key) =>
          <div className="categories__item" key={key}>
            <Link to={`/category/${item.label}`}>{item.label}</Link>
          </div>
        )}
      </div>
    )
  }
}


const mapStateToProps = state => {
  return{
    categories: state.posts.categories
  }
};


export default connect(mapStateToProps)(Categories);