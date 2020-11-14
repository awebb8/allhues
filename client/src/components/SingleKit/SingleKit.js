import React, { useContext } from "react";
import "./SingleKit.css";
import UserContext from "../../utils/UserContext";

const Kit = (props) => {
  const { id } = useContext(UserContext);

  const handleImgClick = () => {
    window.location.href = props.src;
  };

  if (id === props.info.creatorId) {
    return (
      <>
        <div className="card">
          <img
            style={{ cursor: "pointer" }}
            src={
              props.src === undefined
                ? "http://via.placeholder.com/200"
                : props.src
            }
            className="card-img-top crop"
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

            {props.info.kitItems &&
              props.info.kitItems.map((item) => (
                <a
                  key={item.affiliateLink}
                  href={item.affiliateLink}
                  className="card-text"
                  target="_blank"
                  rel="noreferrer"
                  style={{ textAlign: "center", display: "block" }}
                >
                  {item.affiliateLink}
                </a>
              ))}

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
    <div className="card">
      <img
        style={{ cursor: "pointer" }}
        src={
          props.src === undefined ? "http://via.placeholder.com/200" : props.src
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
        {props.info.kitItems &&
          props.info.kitItems.map((item) => (
            <a
              key={item.affiliateLink}
              href={item.affiliateLink}
              className="card-text"
              target="_blank"
              rel="noreferrer"
              style={{ textAlign: "center", display: "block" }}
            >
              {item.affiliateLink}
            </a>
          ))}
        {/* <a
          href={
            props.info.kitItems[0].affiliateLink
              ? props.info.kitItems[0].affiliateLink
              : ""
          }
          className="card-text"
          style={{ textAlign: "center" }}
        >
          {props.info.kitItems[0].affiliateLink
            ? props.info.kitItems[0].affiliateLink
            : ""}
        </a> */}

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
  );
};

export default Kit;
