// import Axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import API from "../utils/API";
import useDidMountEffect from "../utils/useDidMountEffect";
import UserContext from "../utils/UserContext";
import Message from "../components/Message/Message";
import { Link } from "react-router-dom";

const YourMessages = () => {
  const [yourMsgs, setYourMsgs] = useState([]);
  const [sentMsgs, setSentMsgs] = useState([]);
  const { id } = useContext(UserContext);

  useEffect(() => {
    API.getUser()
      .then((res) => {
        setYourMsgs(res.data.receivedMessages);
        setSentMsgs(res.data.sentMessages);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (yourMsgs.length > 0 || sentMsgs.length > 0) {
    return (
      <div
        className="container-fluid"
        style={{ width: "fit-content", minWidth: "45vw" }}
      >
        <div className="row row-cols-1 row-cols-md-3">
          {sentMsgs &&
            sentMsgs.map((i) => (
              <div key={i._id} className="card" style={{ textAlign: "left" }}>
                <h5>
                  <p style={{ display: "inline" }}>Subject: </p>
                  {i.subject}
                </h5>
                <p>
                  <p style={{ display: "inline" }}>Message: </p>
                  {i.message}
                </p>
              </div>
            ))}
        </div>
      </div>

      //   <div>
      //     <ul style={{ listStyleType: "none" }}>
      //       <div style={{ width: "45vw", float: "right" }}>
      //         {yourMsgs &&
      //           yourMsgs.map((m) => (
      //             <Message m={m} key={m._id} sentOrRec={"Received"} />
      //           ))}
      //       </div>
      //       {/* <br />
      //     <br />
      //     <br /> */}
      //       <div style={{ width: "45vw" }}>
      //         {sentMsgs.map((i) => (
      //           <Message m={i} key={i._id} sentOrRec={"Sent"} />
      //         ))}
      //       </div>
      //     </ul>
      //   </div>
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
