import React from "react";
import { Link } from "react-router-dom";

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
      <Link
        to={{
          pathname: "/newmessage",
          state: { id: props.info.senderId },
        }}
      >
        <button
          style={{ margin: "auto", float: "left" }}
          // data={props.info.senderId}
          className="buttons"
        >
          Reply
        </button>
      </Link>

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
