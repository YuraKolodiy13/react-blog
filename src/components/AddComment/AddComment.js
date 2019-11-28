import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './AddComment.scss'
import {addComment} from "../../store/actions/postsAction";
import {connect} from "react-redux";


class AddComment extends Component{

  constructor(props){
    super(props);
    this.state = {
      text: '',
      author: {
        email: '',
        id: ''
      },
      date: ''
    }
  }

  componentDidMount(){

  }

  onSubmit = e => {
    e.preventDefault();

    this.setState({
      author: {
        email: this.props.user.email,
        id: this.props.user.id,
      },
      date: Date.now()
    }, function () {
      this.props.addComment(this.props.id, this.state)
        .then(() => this.setState({text: ''}))
    });
  };

  changeValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  render(){
    return(
      <div className='addComment'>
        <h4>LEAVE A REPLY</h4>
        <form onSubmit={this.onSubmit}>
          <TextField
            id="outlined-multiline-static"
            label="Type something"
            multiline
            rows="5"
            name='text'
            value={this.state.text}
            onChange={this.changeValue}
            margin="normal"
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className='button'
          >Add</Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = {
  addComment: addComment
};

export default connect(mapStateToProps, mapDispatchToProps)(AddComment)
