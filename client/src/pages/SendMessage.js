import Axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../utils/UserContext";
// import Select from "react-select";
import { Link } from "react-router-dom";

const SendMessage = (props) => {
  const [messageText, setMessageText] = useState({
    receiverId: "",
    subject: "",
    message: "",
    senderId: "",
  });
  //   const [peopleOptions, setPeopleOptions] = useState([]);
  const [recipientId, setRecipientId] = useState("");
  const [msgRecip, setMsgRecip] = useState({
    userName: "",
  });
  //   const [whoToMsgInput, setWhoToMsgInput] = useState("");
  const [searchResModal, setSearchResModal] = useState(false);
  const [foundUsers, setFoundUsers] = useState([]);

  const { id } = useContext(UserContext);
  const history = useHistory();

  // useEffect(() => {
  //   setMessageText({ ...messageText, receiverId: id });
  // }, [id]);

  useEffect(() => {
    if (props && props.location && props.location.state) {
      setRecipientId(props.location.state.id);
      setMessageText({
        ...messageText,
        receiverId: props.location.state.id,
        senderId: id,
      });
    }
  }, [props.location.state]);

  const handleTextChange = (e) => {
    const { value, name } = e.target;
    setMessageText({ ...messageText, [name]: value });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    // console.log(messageText);
    Axios.post(`/api/sentmessage/${id}`, messageText)
      .then((res) =>
        // console.log(res)
        Axios.post(`/api/receivedmessage/${recipientId}`, messageText)
          .then((resp) => history.push("/messages"))
          .catch((errors) => console.log(errors))
      )
      .catch((err) => console.log(err));
    // Axios.put(`/api/yourmessages/${recipientId}`, messageText)
    //   .then((res) => {
    //     // console.log(res.data);
    //     Axios.put(`/api/sentmessage/${id}`, messageText)
    //       .then((response) => {
    //         history.push("/messages");
    //         // console.log(response.data);
    //       })
    //       .catch((errors) => console.log(errors));
    //   })
    //   .catch((err) => console.log(err));
  };

  const handleUsernameChangeInput = (e) => {
    // console.log(e);
    // setWhoToMsgInput(e.target.value);
    setMsgRecip({ userName: e.target.value });
  };

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    // console.log(whoToMsgInput);
    Axios.get(`/api/finduser/${msgRecip.userName}`, msgRecip)
      .then((res) => {
        setFoundUsers((foundUsers) => [...foundUsers, res.data]);
      })
      .catch((err) => console.log(err));
    setSearchResModal(true);
  };

  const handleUserClick = (e) => {
    const searchId = e.target.getAttribute("data");
    setSearchResModal(false);
    setRecipientId(searchId);
  };

  if (searchResModal) {
    return (
      <div
        style={{
          zIndex: "1000",
          height: "fit-content",
          minHeight: "50vh",
          width: "20vw",
          margin: "auto",
          background: "lightyellow",
        }}
      >
        <h3>Select who to message:</h3>
        <br />
        {foundUsers[0] != null ? (
          foundUsers.map((i) => (
            <h5
              onClick={handleUserClick}
              style={{ cursor: "pointer" }}
              data={i._id}
            >
              {i.userName}
            </h5>
          ))
        ) : (
          <>
            <h5>No users match that name</h5>

            <button
              className="buttons"
              onClick={() => setSearchResModal(false)}
            >
              <i className="fas fa-step-backward"></i>
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <>
      <div style={{ margin: "auto", width: "60vw", justifyContent: "center" }}>
        <div
          className="jumbotron jumbotron-fluid"
          style={{
            width: "30vw",
            margin: "auto",
            background: "lightyellow",
            minHeight: "60vh",
            height: "fit-content",
          }}
        >
          {!recipientId && (
            <>
              <form type="submit" onSubmit={handleUsernameSubmit}>
                <label htmlFor="msgRecip" style={{ color: "red" }}>
                  Username to message
                </label>
                <input
                  type="text"
                  name="msgRecip"
                  style={{ display: "block", margin: "auto", width: "20vw" }}
                  onChange={handleUsernameChangeInput}
                />
                {msgRecip.userName !== "" && (
                  <button className="buttons" style={{ display: "inline" }}>
                    Search for user
                  </button>
                )}
              </form>
              <br />
            </>
          )}
          <div
            className="container"
            style={{ textAlign: "center", justifyContent: "center" }}
          >
            <form>
              <label htmlFor="subject">Subject: </label>
              <input
                type="text"
                name="subject"
                style={{ display: "block", margin: "auto", width: "20vw" }}
                onChange={handleTextChange}
              />
              <label htmlFor="message">Message: </label>
              <textarea
                type="text"
                name="message"
                style={{
                  height: "6em",
                  display: "block",
                  margin: "auto",
                  width: "20vw",
                }}
                onChange={handleTextChange}
              />
              <button
                className="buttons"
                type="submit"
                onClick={handleSendMessage}
                style={{ marginBottom: "50px" }}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SendMessage;
