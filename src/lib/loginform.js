import React from 'react';

import '../static/css/bootstrap.css'


class LogInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: window.localStorage.getItem('user') || 'Anonymous',
    };
  }

  handleSubmit = (event) => {
    const username = this.state.username;
    let formData = new FormData();
    formData.append('username', username);    

    fetch('https://httpbin.org/anything', {
      method: 'POST',
      body: formData,
    }).then(response => response.json())
    .then(response => {
            console.log('Success:', JSON.stringify(response));
            window.localStorage.setItem('user', username);
        })
    .catch(error => console.error('Error:', error));

    event.preventDefault();
  }

  handleUsernameChange = (event) => {
    this.setState({
      username: event.target.value,
    });
  }

  render () {
    const username = this.state.username;

    return (
      <form>
        <h5 className="auth_as">{username}</h5>
        <div className="form-group mt-2">
          <input 
          className="form-control" 
          placeholder="username" 
          name="username"
          onChange={this.handleUsernameChange} />
        </div>
        <input 
         className="btn btn-primary float-sm-none float-md-right" 
         type="submit" 
         value="Log in"
         onClick={this.handleSubmit} /> 
      </form>
    );
  }
}

export default LogInForm;