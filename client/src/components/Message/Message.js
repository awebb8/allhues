import React from "react";
import { Link } from "react-router-dom";

const Message = (props) => {
  // const handleSentDeleteClick = (e) => {
  //   // console.log(e.target.getAttribute("data"));
  //   const idToDelete = e.target.getAttribute("data");
  //   console.log(idToDelete);
  //   // Axios.delete(`/api/sentmessages/${e.target.getAttribute("data")}`)
  //   Axios.delete(`/api/sentmessages/${idToDelete}`)
  //     .then((res) => {
  //       console.log(res.data);
  //       const filteredSent = sentMsgs.filter((i) => i._id != idToDelete);
  //       setSentMsgs(filteredSent);
  //     })
  //     .catch((err) => console.log(err));
  //   // Axios.put(`/api/deletesentmsg/${id}`, test).then((res) => console.log(res));
  // };

  // const handleReceivedDeleteClick = (e) => {
  //   const idToDelete = e.target.getAttribute("data");
  //   // Axios.delete(`/api/receivedmessages/${e.target.getAttribute("data")}`)
  //   Axios.delete(`/api/receivedmessages/${idToDelete}`)
  //     .then((res) => {
  //       // console.log(res.data)
  //       const filteredSent = yourMsgs.filter((i) => i._id != idToDelete);
  //       setYourMsgs(filteredSent);
  //     })
  //     .catch((err) => console.log(err));
  // };
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
      {/* <p> */}
      <p style={{ display: "inline" }}>Message: </p>
      {props.info.message}
      {/* </p> */}
      <br />
      <br />

      {props.info.senderId ? (
        <>
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
              <i className="fas fa-reply"></i>
            </button>
          </Link>
          <button
            style={{ margin: "auto", float: "right" }}
            className="buttons"
            data={props.info._id}
            onClick={props.handleDeleteClick}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </>
      ) : (
        <button
          style={{ margin: "auto", float: "right" }}
          className="buttons"
          data={props.info._id}
          onClick={props.handleDeleteClick}
        >
          <i className="fas fa-trash-alt"></i>
        </button>
      )}
    </div>
  );
};

export default Message;
