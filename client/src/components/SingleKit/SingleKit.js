import React from "react";
import "./SingleKit.css";

const Kit = (props) => {
  return (
    <div className="card">
      <img
        src={
          props.src === undefined ? "http://via.placeholder.com/200" : props.src
        }
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">
          {props.info.kitName ? props.info.kitName : ""}
        </h5>
        <p className="card-text">
          {props.info.kitDescription ? props.info.kitDescription : ""}
        </p>
        <p className="card-text">
          <small className="text-muted">Last updated 3 mins ago</small>
        </p>
      </div>
    </div>
  );
};

export default Kit;
