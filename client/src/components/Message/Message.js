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
    <>
      <div
        key={props.info.subject}
        // className="card"
        // style={{ textAlign:"left", borderRadius:"50px"}}
      >
        {/* <h5>
        <p style={{ display: "inline" }}>Subject: </p>
        {props.info.subject}
      </h5> */}
        {/* <p style={{ display: "inline" }}>Message: </p> */}
        {props.info.senderId ? (
          <>
            <div style={{ float: "left" }}>
              <div
                style={{
                  display: "inline-block",
                  clear: "both",
                  padding: "10px",
                  marginBottom: "10px",
                  border: "1px solid black",
                  borderRadius: "30px 0 0 30px",
                  backgroundColor: "#eee",
                }}
              >
                {props.info.message}
              </div>

              <Link
                to={{
                  pathname: "/newmessage",
                  state: { id: props.info.senderId },
                }}
              >
                <button
                  style={{
                    margin: "auto",
                    border: "1px solid black",
                    borderRadius: "0",
                  }}
                  // data={props.info.senderId}
                  className="buttons"
                >
                  <i className="fas fa-reply"></i>
                </button>
              </Link>
              <button
                style={{
                  margin: "auto",
                  border: "1px solid black",
                  borderRadius: "0 30px 30px 0px",
                }}
                className={props.info._id + " buttons"}
                data={props.url}
                onClick={props.handleDeleteClick}
              >
                <i data={props.url} className="fas fa-trash-alt"></i>
              </button>
            </div>
            <br />
            <br />
          </>
        ) : (
          <>
            <div style={{ float: "right" }}>
              <div
                style={{
                  display: "inline-block",
                  clear: "both",
                  padding: "10px",
                  marginBottom: "10px",
                  border: "1px solid black",
                  borderRadius: "30px 0 0 30px",
                  backgroundColor: "#0084ff",
                  color: "#fff",
                }}
              >
                {props.info.message}
              </div>

              <button
                style={{
                  margin: "auto",
                  border: "1px solid black",
                  borderRadius: "0 30px 30px 0px",
                }}
                className={props.info._id + " buttons"}
                data={props.info._id}
                onClick={props.handleDeleteClick}
              >
                <i data={props.url} className="fas fa-trash-alt"></i>
              </button>
            </div>
            <br />
            <br />
          </>
        )}
      </div>
    </>
  );
};

export default Message;
