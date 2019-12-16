export const changeValue = (e) => {
  console.log(e, 22)
  console.log(this, 11)
  this.setState({
    [e.target.name]: e.target.value
  })
};