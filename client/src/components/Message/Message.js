import React from "react";

const Message = (props) => {
  return (
    <>
      <p>{props.sentOrRec} Messages</p>
      <li key={props.m._id}>
        Subject: {props.m.subject}
        <br />
        <br />
        <p style={{ borderBottom: "1px dotted black" }}>
          Message: {props.m.message}
        </p>
        <br />
      </li>
    </>
  );
};

export default Message;
