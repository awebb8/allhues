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
  const [putPayload, setPutPayload] = useState({
    message: "",
  });
  const { id } = useContext(UserContext);

  useEffect(() => {
    setPutPayload({
      message: "test",
    });
    Axios.get(`/api/messages/${id}`)
      .then((res) => {
        // console.log(res.data);
        setSentMsgs(res.data[0].sentMessages);
        setYourMsgs(res.data[0].receivedMessages);
        // console.log(res.data);
        // setYourMsgs(res.data.receivedMessages);
        // setSentMsgs(res.data.sentMessages);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSentDeleteClick = (e) => {
    // console.log(e.target.getAttribute("data"));
    const idToDelete = e.target.getAttribute("data");
    console.log(idToDelete);
    Axios.delete(`/api/sentmessages/${e.target.getAttribute("data")}`)
      .then((res) => {
        console.log(res.data);
        const filteredSent = sentMsgs.filter((i) => i._id != idToDelete);
        setSentMsgs(filteredSent);
      })
      .catch((err) => console.log(err));
    // Axios.put(`/api/deletesentmsg/${id}`, test).then((res) => console.log(res));
  };

  const handleReceivedDeleteClick = (e) => {
    const idToDelete = e.target.getAttribute("data");
    Axios.delete(`/api/receivedmessages/${e.target.getAttribute("data")}`)
      .then((res) => {
        // console.log(res.data)
        const filteredSent = yourMsgs.filter((i) => i._id != idToDelete);
        setYourMsgs(filteredSent);
      })
      .catch((err) => console.log(err));
  };

  if (sentMsgs.length > 0 && yourMsgs.length > 0) {
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
                  handleDeleteClick={(e) => handleReceivedDeleteClick(e)}
                />
              ))}
          </div>
        </div>
      </>
    );
  } else if (yourMsgs.length > 0 || sentMsgs.length > 0) {
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
                  handleDeleteClick={(e) => handleSentDeleteClick(e)}
                />
              ))}
          </div>
        </div>
        {yourMsgs.length > 0 && (
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
