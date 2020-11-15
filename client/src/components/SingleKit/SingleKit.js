import React, { useContext, useEffect, useState } from "react";
import "./SingleKit.css";
import UserContext from "../../utils/UserContext";
import API from "../../utils/API";

const Kit = (props) => {
  const { id } = useContext(UserContext);

  const handleImgClick = () => {
    window.location.href = props.src;
  };

  if (id === props.info.creatorId) {
    return (
      <>
        <div className="container mt-3 d-flex justify-content-center">
          <div className="row">
            <div className="col-sm-3">
              <img
                className="avatar"
                src={props.kitCreatorInfo && props.kitCreatorInfo.image}
                alt="content creator's profile picture"
              />
            </div>
            <div className="col-sm-9 mt-2">
              <span className="username-handle">
                {props.kitCreatorInfo && props.kitCreatorInfo.name}
              </span>
              <p>@{props.kitCreatorInfo && props.kitCreatorInfo.username}</p>
            </div>
          </div>
        </div>
        <div className="card card-viewone">
          <img
            style={{ cursor: "pointer" }}
            src={
              props.src === undefined
                ? "http://via.placeholder.com/200"
                : props.src
            }
            className="card-img-top crop-viewone"
            alt="Makeup Kit"
            onClick={handleImgClick}
          />
          <div className="card-body">
            <h5 className="card-title" style={{ textAlign: "center" }}>
              {props.info.kitName ? props.info.kitName : ""}
            </h5>
            <p className="card-text" style={{ textAlign: "center" }}>
              {props.info.kitDescription ? props.info.kitDescription : ""}
            </p>

            <div
              className="text-muted d-flex"
              style={{
                position: "absolute",
                bottom: 0,
                right: 5,
                fontSize: "15px",
              }}
            >
              <i className="ph-eye pr-1"></i>
              {props.info.uniqueVisits}
            </div>
          </div>
        </div>

        <div className="container mt-4">
        <div className="row">
          <div className="col-sm-6 offset-sm-3">
            <h3 style={{fontWeight: 600}}>
            Shop this look
            </h3>
            <hr />
            <div className="text-justify text-nowrap text-truncate">
              {props.info.kitItems &&
                props.info.kitItems.map((item) => (
                  <div>
                    <span style={{fontWeight: 600}}>{item.makeupCategory}: </span>
                    <a
                      key={item.affiliateLink}
                      href={item.affiliateLink}
                      className="card-text"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.affiliateLink}
                    </a>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>







        <div className="pt-3" style={{ textAlign: "center" }}>
          <button className="buttons" onClick={props.onClickUpdate}>
            Update
          </button>
          <button className="buttons" onClick={props.onClickDelete}>
            Delete
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container mt-3 d-flex justify-content-center">
        <div className="row">
          <div className="col-sm-3">
            <img
              className="avatar"
              src={props.kitCreatorInfo && props.kitCreatorInfo.image}
              alt="content creator's profile picture"
            />
          </div>
          <div className="col-sm-9 mt-2">
            <span className="username-handle">
              {props.kitCreatorInfo && props.kitCreatorInfo.name}
            </span>
            <p>@{props.kitCreatorInfo && props.kitCreatorInfo.username}</p>
          </div>
        </div>
      </div>
      <div className="card">
        <img
          style={{ cursor: "pointer" }}
          src={
            props.src === undefined
              ? "http://via.placeholder.com/200"
              : props.src
          }
          className="card-img-top"
          alt="Makeup Kit"
          onClick={handleImgClick}
        />
        <div className="card-body">
          <h5 className="card-title" style={{ textAlign: "center" }}>
            {props.info.kitName ? props.info.kitName : ""}
          </h5>
          <p className="card-text" style={{ textAlign: "center" }}>
            {props.info.kitDescription ? props.info.kitDescription : ""}
          </p>

          <div
            className="text-muted d-flex"
            style={{
              position: "absolute",
              bottom: 0,
              right: 5,
              fontSize: "15px",
            }}
          >
            <i className="ph-eye pr-1"></i>
            {props.info.uniqueVisits}
          </div>
        </div>
      </div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-sm-6 offset-sm-3">
            <h3 style={{fontWeight: 600}}>
            Shop this look
            </h3>
            <hr />
            <div className="text-justify text-nowrap text-truncate">
              {props.info.kitItems &&
                props.info.kitItems.map((item) => (
                  <div>
                    <span style={{fontWeight: 600}}>{item.makeupCategory}: </span>
                    <a
                      key={item.affiliateLink}
                      href={item.affiliateLink}
                      className="card-text"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.affiliateLink}
                    </a>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Kit;
