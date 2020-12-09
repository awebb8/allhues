// import Axios from "axios";
import React, { useState, useContext, useEffect } from "react";
// import API from "../utils/API";
// import useDidMountEffect from "../utils/useDidMountEffect";
import UserContext from "../utils/UserContext";
import Message from "../components/Message/Message";
import { Link } from "react-router-dom";
import Axios from "axios";
import Modal from "react-modal";
import useDidMountEffect from "../utils/useDidMountEffect";
import makeupArtist from "../assets/images/makeup-artist.jpeg";

Modal.setAppElement("#root");

const YourMessages = () => {
  const [yourMsgs, setYourMsgs] = useState([]);
  const [sentMsgs, setSentMsgs] = useState([]);
  const [messageThreadUsername, setMessageThreadUsername] = useState("");
  // const [filteredSent, setFilteredSent] = useState([]);
  // const [filteredReceived, setFilteredReceived] = useState([]);
  const [allFilteredMessages, setAllFilteredMessages] = useState([]);
  const [uniqueUsernames, setUniqueUsernames] = useState([]);
  // ---- Modal ----
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
    const idToDelete = e.target.getAttribute("data");

    Axios.delete(`/api/sentmessages/${idToDelete}`)
      .then((res) => {
        // console.log(res.data);
        const filteredSent = sentMsgs.filter((i) => i._id != idToDelete);
        setSentMsgs(filteredSent);
        const filteredAll = allFilteredMessages.filter(
          (j) => j._id != idToDelete
        );
        setAllFilteredMessages(filteredAll);
      })
      .catch((err) => console.log(err));
  };

  const handleReceivedDeleteClick = (e) => {
    e.stopPropagation();
    const idToDelete = e.target.getAttribute("data");

    Axios.delete(`/api/receivedmessages/${idToDelete}`)
      .then((res) => {
        // console.log(res.data)
        const filteredSent = yourMsgs.filter((i) => i._id != idToDelete);
        setYourMsgs(filteredSent);
        const filteredAll = allFilteredMessages.filter(
          (j) => j._id != idToDelete
        );
        setAllFilteredMessages(filteredAll);
      })
      .catch((err) => console.log(err));
  };

  const handleCloseBtnClick = () => {
    setModalIsOpen(false);
  };

  const handleShowMessages = (e) => {
    setModalIsOpen(true);
    // console.log(yourMsgs);

    setMessageThreadUsername(e.target.getAttribute("class"));
  };

  useDidMountEffect(() => {
    if (
      (uniqueUsernames.length === 0 && sentMsgs !== undefined) ||
      (uniqueUsernames.length === 0 && yourMsgs !== undefined)
    ) {
      const r = [];
      if (sentMsgs != undefined && yourMsgs != undefined) {
        for (let i = 0; i < sentMsgs.length; i++) {
          // console.log(sentMsgs[i]);
          if (!r.includes(sentMsgs[i].receiverUsername)) {
            r.push(sentMsgs[i].receiverUsername);
          }
        }
        for (let j = 0; j < yourMsgs.length; j++) {
          if (!r.includes(yourMsgs[j].senderUsername)) {
            r.push(yourMsgs[j].senderUsername);
          }
        }
      } else if (sentMsgs != undefined && yourMsgs == undefined) {
        for (let i = 0; i < sentMsgs.length; i++) {
          // console.log(sentMsgs[i]);
          if (!r.includes(sentMsgs[i].receiverUsername)) {
            r.push(sentMsgs[i].receiverUsername);
          }
        }
      } else if (yourMsgs != undefined && sentMsgs == undefined) {
        for (let j = 0; j < yourMsgs.length; j++) {
          if (!r.includes(yourMsgs[j].senderUsername)) {
            r.push(yourMsgs[j].senderUsername);
          }
        }
      }

      // console.log(r);
      setUniqueUsernames(r);
    }
  }, [sentMsgs, yourMsgs]);

  // useDidMountEffect(() => {
  //   if (uniqueUsernames.length === 0) {
  //     const arr = [];
  //     for (let i = 0; i < yourMsgs.length; i++) {
  //       if (!arr.includes(yourMsgs[i].senderUsername)) {
  //         arr.push(yourMsgs[i].senderUsername);
  //       }
  //     }
  //     // console.log(r);
  //     setUniqueUsernames(r);
  //   }
  // }, [yourMsgs]);

  useDidMountEffect(() => {
    // console.log(messageThreadUsername);
    const showSent = yourMsgs.filter(
      (name) => name.senderUsername === messageThreadUsername
    );
    // yourMsgs.filter(name => console.log(name.senderUsername))
    // setFilteredSent(showSent);

    const showReceived = sentMsgs.filter(
      (name) => name.receiverUsername === messageThreadUsername
    );
    // setFilteredReceived(showReceived);

    const allFilteredMessagesArray = showSent.concat(showReceived);
    const sortedFilter = allFilteredMessagesArray.sort((a, b) => {
      return (
        new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime()
      );
    });
    setAllFilteredMessages(sortedFilter);
    // console.log(x);
  }, [messageThreadUsername]);

  // ---------------

  if (
    sentMsgs != undefined &&
    yourMsgs != undefined &&
    sentMsgs.length > 0 &&
    yourMsgs.length > 0
  ) {
    // console.log("me");
    return (
      <>
      <div className="messagesSidebar">
          <h3 style={{backgroundColor:"#b29fb5", color:"white", float:"left", padding:"10px 20px 8px 20px", marginTop:"20px"}}>
            View Messages:
          </h3>
          <br />
          <br />
          <br />
          <br />

          <div style={{float:"left", margin:"0 0 0 20px", textAlign:"left"}}>
          {/* Map over users who have messaged with this person */}
          {uniqueUsernames &&
            uniqueUsernames.map((i) => (
              // i.senderUsername
                <p>
                <a
                  style={{ cursor: "pointer" }}
                  className={i}
                  onClick={(e) => handleShowMessages(e)}
                >
                  {i}
                </a>
              </p>
            ))}
          {/* ------------------------------------------------- */}
          </div>

          <h3 style={{backgroundColor:"#b29fb5", color:"white", position:"absolute", bottom:"20%", float:"left", padding:"10px 20px 8px 20px", marginTop:"20px", width:"246.25px"}}>
          <Link to="/newmessage">Create New <br /> Message <i class="fas fa-envelope"></i></Link>
          </h3>

          </div>

          <div>
              <img className="crop messageImg" style={{width:"600px", height:"400px"}} src={makeupArtist}></img>
          </div>

          <Modal isOpen={modalIsOpen} className="messages-modal-content">
            <div>
              <h4 style={{backgroundColor:"#b29fb5", color:"white", padding:"10px"}}>
                {messageThreadUsername}
              </h4>
              <br />
              {/* <h5 style={{ fontWeight: "bold" }}>Sent Messages</h5> */}
              {/* <div
                className="container-fluid"
                style={{ width: "fit-content", minWidth: "45vw" }}
              > */}
                {/* {filteredReceived &&
              filteredReceived.map((i) => (
                <Message
                  key={i._id}
                  info={i}
                  url={i._id}
                  handleDeleteClick={(e) => handleSentDeleteClick(e)}
                />
              ))}
            {filteredSent &&
              filteredSent.map((i) => (
                <Message
                  key={i._id}
                  info={i}
                  url={i._id}
                  handleDeleteClick={(e) => handleReceivedDeleteClick(e)}
                />
              ))} */}
                {allFilteredMessages &&
                  allFilteredMessages.map((i) => (
                    <ul style={{ listStyle: "none", padding:"5px"}}>
                      <li>
                        <Message
                          key={i._id}
                          info={i}
                          url={i._id}
                          handleReceivedDeleteClick={handleReceivedDeleteClick}
                          handleSentDeleteClick={handleSentDeleteClick}
                        />
                      </li>
                    </ul>
                  ))}
              {/* </div> */}
              <button
                className="buttons shadow-none py-0 px-2 text-muted"
                onClick={handleCloseBtnClick}
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  color: "black",
                  border: "none",
                }}
              >
                <h3>&times;</h3>
              </button>
            </div>
          </Modal>
      </>
    );
  } else if (
    (yourMsgs != undefined && yourMsgs.length > 0) ||
    (sentMsgs != undefined && sentMsgs.length > 0)
  ) {
    return (
      <>
        <div>
          <h3 style={{backgroundColor:"#b29fb5", color:"white", float:"left", padding:"10px 20px 8px 20px", marginTop:"20px"}}>
            View Messages:
          </h3>
          <br />
          <br />
          <br />
          <br />
          {/* Map over users who have messaged with this person */}
          <div style={{float:"left", margin:"0 0 0 20px", textAlign:"left"}}>
          {uniqueUsernames &&
            uniqueUsernames.map((i) => (
              // i.senderUsername
              <p>
                <a
                  style={{ cursor: "pointer" }}
                  className={i}
                  onClick={(e) => handleShowMessages(e)}
                >
                  {i}
                </a>
              </p>
            ))}
          {/* ------------------------------------------------- */}
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <h3 style={{backgroundColor:"#b29fb5", color:"white", float:"left", padding:"10px 20px 8px 20px", marginTop:"20px", width:"246.25px"}}>
          <Link to="/newmessage">Create New <br /> Message <i class="fas fa-envelope"></i></Link>
          </h3>

          <Modal isOpen={modalIsOpen} className="messages-modal-content">
            <div>
              <h4 style={{backgroundColor:"#b29fb5", color:"white", padding:"10px"}}>
                {messageThreadUsername}
              </h4>
              <br />
              {/* <h5 style={{ fontWeight: "bold" }}>Sent Messages</h5> */}
              {/* <div
                className="container-fluid"
                style={{ width: "fit-content", minWidth: "45vw" }}
              > */}
                {/* {filteredReceived &&
              filteredReceived.map((i) => (
                <Message
                  key={i._id}
                  info={i}
                  url={i._id}
                  handleDeleteClick={(e) => handleSentDeleteClick(e)}
                />
              ))}
            {filteredSent &&
              filteredSent.map((i) => (
                <Message
                  key={i._id}
                  info={i}
                  url={i._id}
                  handleDeleteClick={(e) => handleReceivedDeleteClick(e)}
                />
              ))} */}
              <div style={{padding:"0 8px 0 8px"}}>
                {allFilteredMessages &&
                  allFilteredMessages.map((i) => (
                    <ul style={{ listStyle: "none", padding:"5px"}}>
                      <li>
                        <Message
                          key={i._id}
                          info={i}
                          url={i._id}
                          handleReceivedDeleteClick={handleReceivedDeleteClick}
                          handleSentDeleteClick={handleSentDeleteClick}
                        />
                      </li>
                    </ul>
                  ))}
              </div>
              <button
                className="buttons shadow-none py-0 px-2 text-muted"
                onClick={handleCloseBtnClick}
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  color: "black",
                  border: "none",
                }}
              >
                <h3>&times;</h3>
              </button>
            </div>
          </Modal>
        </div>
      </>
    );
  }
  // else if (
  //   (yourMsgs != undefined && yourMsgs.length > 0) ||
  //   (sentMsgs != undefined && sentMsgs.length > 0)
  // ) {
  //   return (
  //     <>
  //     <Modal
  //       isOpen={modalIsOpen}
  //       className="modal-content"
  //     >
  //   <div>
  //     <h4>Messages with {messageThreadUsername}</h4>
  //     <br />
  //       {/* <h5 style={{ fontWeight: "bold" }}>Sent Messages</h5> */}
  //       <div
  //         className="container-fluid"
  //         style={{ width: "fit-content", minWidth: "45vw" }}
  //       >
  //           {
  //           sentMsgs &&
  //             sentMsgs
  //             .map((i) => (
  //               <Message
  //                 key={i._id}
  //                 url={i._id}
  //                 info={i}
  //                 handleDeleteClick={(e) => handleSentDeleteClick(e)}
  //               />
  //             ))}
  //       </div>
  //       {yourMsgs != undefined && yourMsgs.length > 0 && (
  //         <>
  //           <h5 style={{ fontWeight: "bold" }}>Received Messages</h5>
  //           <div
  //             className="container-fluid"
  //             style={{ width: "fit-content", minWidth: "45vw" }}
  //           >
  //               {yourMsgs &&
  //                 yourMsgs.map((i) => (
  //                   <Message
  //                     key={i._id}
  //                     info={i}
  //                     url={i._id}
  //                     handleDeleteClick={(e) => handleReceivedDeleteClick(e)}
  //                   />
  //                 ))}
  //           </div>
  //         </>
  //       )}
  //       <button
  //           className="buttons shadow-none py-0 px-2 text-muted"
  //           onClick={handleCloseBtnClick}
  //           style={{
  //             position: "absolute",
  //             right: 0,
  //             top: 0,
  //             color: "black",
  //             backgroundColor: "white",
  //             border: "none",
  //           }}
  //         >
  //           <h3>&times;</h3>
  //       </button>
  //       </div>
  //       </Modal>
  //     </>
  // );
  // }

  return (
    <>
      <h4>
        No messages yet... <Link to="/newmessage">Send a message?</Link>
      </h4>
    </>
  );
};

export default YourMessages;
