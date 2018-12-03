import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadPosts } from "../actions/index";


const mapDispatchToProps = dispatch => {
  return {
    loadPosts: posts => dispatch(loadPosts(posts))
  };
};

class ConnectedDataProvider extends Component {
  static propTypes = {
    endpoint: PropTypes.string.isRequired,
  };
  state = {
      data: [],
      loaded: false,
      placeholder: "Loading..."
    };
  componentDidMount() {
    const fetch_request = {
      headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
    };
    console.log(fetch_request);
    fetch(this.props.endpoint, fetch_request)
      .then(response => {
        if (response.status !== 200) {
          return this.setState({ placeholder: "Something went wrong" });
        }
        return response.json();
      })
      .then(data => {
        console.log(this.props.loadPosts);
        console.log(data);
        this.props.loadPosts(data);
        this.setState({ data: data, loaded: true });
      });
  }
  render() {
    const { data, loaded, placeholder } = this.state;
    return loaded ? <p>loaded data: </p> : <p>{placeholder}</p>;
  }
}

const DataProvider = connect(null, mapDispatchToProps)(ConnectedDataProvider);
export default DataProvider;