// import Axios from "axios";
import React, { useState, useContext, useEffect } from "react";
// import API from "../utils/API";
// import useDidMountEffect from "../utils/useDidMountEffect";
import UserContext from "../utils/UserContext";
import Message from "../components/Message/Message";
import { Link } from "react-router-dom";
import Axios from "axios";

const YourMessages = () => {
  const [yourMsgs, setYourMsgs] = useState([]);
  const [sentMsgs, setSentMsgs] = useState([]);

  const { id } = useContext(UserContext);

  useEffect(() => {
    Axios.get(`/api/messages/${id}`)
      .then((res) => {
        setSentMsgs(res.data[0].sentMessages);
        setYourMsgs(res.data[0].receivedMessages);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSentDeleteClick = (e) => {
    e.stopPropagation();
    // console.log(e.target.getAttribute("data"));
    var idToDelete = e.target.getAttribute("data");

    Axios.delete(`/api/sentmessages/${idToDelete}`)
      .then((res) => {
        // console.log(res.data);
        const filteredSent = sentMsgs.filter((i) => i._id != idToDelete);
        setSentMsgs(filteredSent);
      })
      .catch((err) => console.log(err));
  };

  const handleReceivedDeleteClick = (e) => {
    e.stopPropagation();
    var idToDelete = e.target.getAttribute("data");

    Axios.delete(`/api/receivedmessages/${idToDelete}`)
      .then((res) => {
        // console.log(res.data)
        const filteredSent = yourMsgs.filter((i) => i._id != idToDelete);
        setYourMsgs(filteredSent);
      })
      .catch((err) => console.log(err));
  };

  if (
    sentMsgs != undefined &&
    yourMsgs != undefined &&
    sentMsgs.length > 0 &&
    yourMsgs.length > 0
  ) {
    return (
      <>
        <h5 style={{ fontWeight: "bold" }}>Sent Messages</h5>
        <div
          className="container-fluid"
          style={{ width: "fit-content", minWidth: "45vw" }}
        >
          <div className="row row-cols-1 row-cols-md-3">
            {sentMsgs &&
              sentMsgs.map((i) => (
                <Message
                  key={i._id}
                  info={i}
                  url={i._id}
                  handleDeleteClick={(e) => handleSentDeleteClick(e)}
                />
              ))}
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <h5 style={{ fontWeight: "bold" }}>Received Messages</h5>
        <div
          className="container-fluid"
          style={{ width: "fit-content", minWidth: "45vw" }}
        >
          <div className="row row-cols-1 row-cols-md-3">
            {yourMsgs &&
              yourMsgs.map((i) => (
                <Message
                  key={i._id}
                  info={i}
                  url={i._id}
                  handleDeleteClick={(e) => handleReceivedDeleteClick(e)}
                  // handleReplyClick={(e) => handleReplyClick(e)}
                />
              ))}
          </div>
        </div>
      </>
    );
  } else if (
    (yourMsgs != undefined && yourMsgs.length > 0) ||
    (sentMsgs != undefined && sentMsgs.length > 0)
  ) {
    return (
      <>
        <h5 style={{ fontWeight: "bold" }}>Sent Messages</h5>
        <div
          className="container-fluid"
          style={{ width: "fit-content", minWidth: "45vw" }}
        >
          <div className="row row-cols-1 row-cols-md-3">
            {sentMsgs &&
              sentMsgs.map((i) => (
                <Message
                  key={i._id}
                  url={i._id}
                  info={i}
                  handleDeleteClick={(e) => handleSentDeleteClick(e)}
                />
              ))}
          </div>
        </div>
        {yourMsgs != undefined && yourMsgs.length > 0 && (
          <>
            <h5 style={{ fontWeight: "bold" }}>Received Messages</h5>
            <div
              className="container-fluid"
              style={{ width: "fit-content", minWidth: "45vw" }}
            >
              <div className="row row-cols-1 row-cols-md-3">
                {yourMsgs &&
                  yourMsgs.map((i) => (
                    <Message
                      key={i._id}
                      info={i}
                      url={i._id}
                      handleDeleteClick={(e) => handleReceivedDeleteClick(e)}
                    />
                  ))}
              </div>
            </div>
          </>
        )}
      </>
    );
  }

  return (
    <>
      <h4>
        No messages yet... <Link to="/newmessage">Send a message?</Link>
      </h4>
    </>
  );
};

export default YourMessages;
