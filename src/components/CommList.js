import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { comments: state.comments };
};

const ConnectedList = ({ comments }) => (
  <ul className="list-group list-group-flush">
    {comments.map(el => (
      <li className="list-group-item" key={el.id}>
        {el.title}
      </li>
  ))}
  </ul>
);

const CommList = connect(mapStateToProps)(ConnectedList);

export default CommList;