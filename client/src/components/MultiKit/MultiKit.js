import React from "react";
import "./MultiKit.css";
import { useHistory } from "react-router-dom";

const MultiKit = (props) => {
  const history = useHistory();
  const handleSingleKitClick = (e) => {
    // console.log(e.target);
    history.push(`/viewone/${e.target.getAttribute("class").substr(0, 25)}`);
  };
  return (
    <div
      className={
        props.class === undefined ? "col mb-4" : props.class + "col mb-4"
      }
    >
      <div
        className={
          props.class === undefined ? "grow card card-viewall" : props.class + " grow card card-viewall"
        }
        onClick={(e) => handleSingleKitClick(e)}
        style={{ cursor: "pointer" }}
      >
        <img
          src={
            props.src === undefined
              ? "http://via.placeholder.com/200"
              : props.src
          }
          className={`${props.class} card-img-top crop`}
          alt="Makeup Kit"
        />
        <div
          style={{ textAlign: "center" }}
          className={
            props.class === undefined ? "card-body-viewall" : props.class + " card-body-viewall"
          }
        >
          <h5
            style={{ textAlign: "center" }}
            className={
              props.class === undefined
                ? "card-title"
                : props.class + " card-title"
            }
          >
            {props.info.kitName ? props.info.kitName : ""}
          </h5>
          <p
            style={{ textAlign: "center" }}
            className={
              props.class === undefined
                ? "card-text"
                : props.class + " card-text"
            }
          >
            {props.info.kitDescription ? props.info.kitDescription : ""}
          </p>
        </div>
        <div
          className="text-muted d-flex"
          style={{ position: "absolute", bottom: 0, right: 5, fontSize: '15px' }}
        >
          <i className="ph-eye pr-1"></i>
          {props.info.uniqueVisits}
        </div>
      </div>
    </div>
  );
};

export default MultiKit;
