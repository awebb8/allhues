import React from "react";

const Message = (props) => {
  return (
    <div
      key={props.info.subject}
      className="card"
      style={{ textAlign: "left" }}
    >
      <h5>
        <p style={{ display: "inline" }}>Subject: </p>
        {props.info.subject}
      </h5>
      <p>
        <p style={{ display: "inline" }}>Message: </p>
        {props.info.message}
      </p>
      <button
        style={{ margin: "auto", float: "left" }}
        data={props.info._id}
        className="buttons"
      >
        Reply
      </button>

      <button
        style={{ margin: "auto", float: "right" }}
        className="buttons"
        data={props.info._id}
        onClick={props.handleDeleteClick}
      >
        Delete
      </button>
    </div>
  );
};

export default Message;
