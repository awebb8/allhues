import React, { useContext } from "react";
import "./SingleKit.css";
import UserContext from "../../utils/UserContext";
import { useHistory } from "react-router-dom";
import API from "../../utils/API";
import fitz1 from "../../assets/images/fitz1.png";
import fitz2 from "../../assets/images/fitz2.png";
import fitz3 from "../../assets/images/fitz3.png";
import fitz4 from "../../assets/images/fitz4.png";
import fitz5 from "../../assets/images/fitz5.png";
import fitz6 from "../../assets/images/fitz6.png";

const Kit = (props) => {
  const { id } = useContext(UserContext);

  const handleImgClick = () => {
    window.location.href = props.src;
  };

  const history = useHistory();

  const handleProfileClick = () => {
    history.push(`/portal/${props.kitCreatorInfo.id}`);
  };

  const handleAffiliateClick = (e) => {
    const idVal = e.target.getAttribute("id");
    API.updateAffiliateLinkNumbers(idVal)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const determineFitzColorToShow = (val) => {
    if (val === "Fitz1") {
      return (
        <img
          src={fitz1}
          style={{ height: "1.3em", width: "1.3em" }}
          alt="light skin tone"
        />
      );
    } else if (val === "Fitz2") {
      return (
        <img
          src={fitz2}
          style={{ height: "1.3em", width: "1.3em" }}
          alt="light skin tone"
        />
      );
    } else if (val === "Fitz3") {
      return (
        <img
          src={fitz3}
          style={{ height: "1.3em", width: "1.3em" }}
          alt="lightish skin tone"
        />
      );
    } else if (val === "Fitz4") {
      return (
        <img
          src={fitz4}
          style={{ height: "1.3em", width: "1.3em" }}
          alt="medium skin tone"
        />
      );
    } else if (val === "Fitz5") {
      return (
        <img
          src={fitz5}
          style={{ height: "1.3em", width: "1.3em" }}
          alt="darkish skin tone"
        />
      );
    } else if (val === "Fitz6") {
      return (
        <img
          src={fitz6}
          style={{ height: "1.3em", width: "1.3em" }}
          alt="dark skin tone"
        />
      );
    }
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
                onClick={handleProfileClick}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="col-sm-9 mt-2">
              <span
                className="username-handle"
                onClick={handleProfileClick}
                style={{ cursor: "pointer" }}
              >
                {props.kitCreatorInfo && props.kitCreatorInfo.name}
              </span>
              <p onClick={handleProfileClick} style={{ cursor: "pointer" }}>
                @{props.kitCreatorInfo && props.kitCreatorInfo.username}
              </p>
            </div>
          </div>
        </div>
        <div className="card card-viewone">
          {typeof props.src[0] === "object" ? (
            <img
              src={props.src[0].url}
              style={{ cursor: "pointer" }}
              alt="Makeup Kit"
              className="card-img-top crop"
              alt="Makeup Kit"
              onClick={handleImgClick}
            />
          ) : (
            <img
              src={
                props.src === undefined || props.src === ""
                  ? "http://via.placeholder.com/200"
                  : props.src
              }
              style={{ cursor: "pointer" }}
              alt="Makeup Kit"
              className="card-img-top crop"
              alt="Makeup Kit"
              onClick={handleImgClick}
            />
          )}
          {/* <img
            style={{ cursor: "pointer" }}
            src={
              props.src === undefined
                ? "http://via.placeholder.com/200"
                : props.src
            }
            className="card-img-top crop"
            alt="Makeup Kit"
            onClick={handleImgClick}
          /> */}
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
                left: 5,
                fontSize: "15px",
              }}
            >
              <i className="fas fa-palette"></i>
              {determineFitzColorToShow(props.info.hueType)}
            </div>

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
              <h3 style={{ fontWeight: 600 }}>Shop this look</h3>
              <hr />
              <div className="text-justify text-nowrap text-truncate">
                {props.info.kitItems &&
                  props.info.kitItems.map((item) => (
                    <div>
                      <span style={{ fontWeight: 600 }}>
                        {item.makeupCategory}:{" "}
                      </span>
                      <a
                        id={item._id}
                        key={item.affiliateLink}
                        href={item.affiliateLink}
                        onClick={handleAffiliateClick}
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
              onClick={handleProfileClick}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="col-sm-9 mt-2">
            <span
              className="username-handle"
              onClick={handleProfileClick}
              style={{ cursor: "pointer" }}
            >
              {props.kitCreatorInfo && props.kitCreatorInfo.name}
            </span>
            <p onClick={handleProfileClick} style={{ cursor: "pointer" }}>
              @{props.kitCreatorInfo && props.kitCreatorInfo.username}
            </p>
          </div>
        </div>
      </div>
      <div className="card">
        {props.src && typeof props.src[0] === "object" ? (
          <img
            style={{ cursor: "pointer" }}
            src={props.src[0].url}
            className="card-img-top"
            alt="Makeup Kit"
            onClick={handleImgClick}
          />
        ) : (
          <img
            style={{ cursor: "pointer" }}
            src={
              props.src === undefined || props.src === ""
                ? "http://via.placeholder.com/200"
                : props.src
            }
            className="card-img-top"
            alt="Makeup Kit"
            onClick={handleImgClick}
          />
        )}
        {/* <img
          style={{ cursor: "pointer" }}
          src={
            props.src === undefined
              ? "http://via.placeholder.com/200"
              : props.src
          }
          className="card-img-top"
          alt="Makeup Kit"
          onClick={handleImgClick}
        /> */}
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
            <h3 style={{ fontWeight: 600 }}>Shop this look</h3>
            <hr />
            <div className="text-justify text-nowrap text-truncate">
              {props.info.kitItems &&
                props.info.kitItems.map((item) => (
                  <div>
                    <span style={{ fontWeight: 600 }}>
                      {item.makeupCategory}:{" "}
                    </span>
                    <a
                      id={item._id}
                      key={item.affiliateLink}
                      href={item.affiliateLink}
                      onClick={handleAffiliateClick}
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
