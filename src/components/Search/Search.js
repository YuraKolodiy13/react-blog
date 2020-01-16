import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './Search.scss';


class Search extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     autocompleteOpen: false
  //   };
  // }
  //
  // onChangeValue = (event) => {
  //   event.target.value.length > 0 ? this.setState({autocompleteOpen: true}) : this.setState({autocompleteOpen: false})
  // };
  //
  // onBlur = () => {
  //   this.setState({autocompleteOpen: false});
  // };

  render() {

    const test = this.props.posts.map(item => {
      return {
        id: item[0],
        content: item[1].value._cache.html,
        title: item[1].title,
      }
    });
    return (
      <div className="search " >
        <Autocomplete
          // debug={true}
          freeSolo
          // id="free-solo-demo"
          id={`search__list-${this.props.themeBg === 'night' ? 'night' : ''}`}
          // open={true}
          // disableOpenOnFocus
          disableClearable
          options={test}
          renderOption={option => (
            <Link to={`/post/${option.id}`} className="search__item">
              {console.log(option)}
              <div>{option.title}</div>
              {/*<span dangerouslySetInnerHTML={{__html: option.content}}/>*/}
            </Link>
          )}
          getOptionLabel={option => option.title}
          renderInput={params => (
            <TextField
              {...params}
              label="Search Articles"
              variant="outlined"
              margin="normal"
              fullWidth
              InputProps={{...params.InputProps, type: 'search'}}
              // onChange={this.onChangeValue}
              // onBlur={this.onBlur}
            />
          )}
        />
        {/*<button type="submit" className="button">Search</button>*/}
      </div>
    );
  }
}

export default Search;