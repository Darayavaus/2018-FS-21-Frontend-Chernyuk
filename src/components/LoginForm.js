import React from 'react';
import { connect } from "react-redux";
import { login } from "../actions/auth";

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => dispatch(login(username, password))
  };
};


class ConnectedLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();

    const {username, password} = this.state;
    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    console.log(this.props.login);
    this.props.login(username, password);

    this.setState({username: "", password: ""});
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render () {
    const username = this.state.username;

    return (
      <div className="column">
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="username"
              onChange={this.handleChange}
              required
              />
            </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="password"
              onChange={this.handleChange}
              required
              />
            </div>
        </div>
        <div className="control">
          <button type="submit" className="button is-info">
            Log in
          </button>
        </div>
      </form>
      </div>
    );
  }
}
const LoginForm = connect(null, mapDispatchToProps)(ConnectedLoginForm);
export default LoginForm;