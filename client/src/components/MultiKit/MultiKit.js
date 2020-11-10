import React from "react";
import "./MultiKit.css";
import { useHistory } from "react-router-dom";

const MultiKit = (props) => {
  const history = useHistory();
  const handleSingleKitClick = (e) => {
    // console.log(e.target.getAttribute("class"));
    history.push(`/viewall/${e.target.getAttribute("class").substr(0, 25)}`);
  };
  return (
    <div
      className="grow col mb-4"
      className={
        props.class === undefined
          ? "grow col mb-4"
          : props.class + " grow col mb-4"
      }
      onClick={(e) => handleSingleKitClick(e)}
      style={{ cursor: "pointer" }}
    >
      <div
        className="card"
        className={props.class === undefined ? "" : props.class}
      >
        <img
          src={
            props.src === undefined
              ? "http://via.placeholder.com/200"
              : props.src
          }
          className={`${props.class} card-img-top`}
          alt="..."
        />
        <div
          className="card-body"
          className={props.class === undefined ? "" : props.class}
        >
          <h5
            className="card-title"
            className={props.class === undefined ? "" : props.class}
          >
            {props.info.kitName ? props.info.kitName : ""}
          </h5>
          <p
            className="card-text"
            className={props.class === undefined ? "" : props.class}
          >
            {props.info.kitDescription ? props.info.kitDescription : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MultiKit;
