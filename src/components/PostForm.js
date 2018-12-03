import React, { Component } from "react";
import PropTypes from "prop-types";
import uuidv1 from "uuid";
import { connect } from "react-redux";
import { addArticle, createPost } from "../actions/index";


const mapDispatchToProps = dispatch => {
  return {
    createPost: post => dispatch(createPost(post))
  };
};

class ConnectedPostForm extends Component {
  constructor() {
    super();

    this.state = {
      title: "",
      text: "",
      subreddit: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  static propTypes = {
    endpoint: PropTypes.string.isRequired
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { title, text, subreddit } = this.state;
    const post = { title, text, subreddit };
    const id = uuidv1();
    console.log(this.props.createPost);

    const api2_body = {
        jsonrpc: "2.0",
		method: "posts.api_create_post",
		params: post,
    }
    const conf = {
      jsonrpc: 2.0,
      method: "post",
      body: JSON.stringify(api2_body),
      headers: new Headers({ "Content-Type": "application/json" })
    };
    console.log(this.props.api_url, conf);
    fetch(this.props.api_url, conf).then(response => console.log(response));

    this.props.createPost({title, text, subreddit});
    this.setState({title: "", text: "", subreddit: ""});
  };

  render() {
    const { title, text, subreddit } = this.state;
    return (
      <div className="column">
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="title"
                onChange={this.handleChange}
                value={title}
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Text</label>
            <div className="control">
              <textarea
                className="textarea"
                type="text"
                name="text"
                onChange={this.handleChange}
                value={text}
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Subreddit</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="subreddit"
                onChange={this.handleChange}
                value={subreddit}
                required
              />
            </div>
          </div>
          <div className="control">
            <button type="submit" className="button is-info">
              Submit post
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const PostForm = connect(null, mapDispatchToProps)(ConnectedPostForm);
export default PostForm;