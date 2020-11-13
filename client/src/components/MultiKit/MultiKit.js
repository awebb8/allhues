import "./MultiKit.css";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";

const MultiKit = (props) => {
  const history = useHistory();

  const [favorite, setFavorite] = useState(false);

  const handleSingleKitClick = (e) => {
    console.log(e.target);
    history.push(`/viewone/${e.target.getAttribute("class").substr(0, 25)}`);
  };

  const handleFavoritesClick = (e) => {
    e.stopPropagation();
    console.log(e.target);
    setFavorite(!favorite);
    console.log(favorite);
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
      <div className={props.class === undefined ? "card" : props.class + " card"}>
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
            props.class === undefined ? "card-body" : props.class + " card-body"
          }
        >
          <button type="button" className="btn btn-default" 
          // style={{backgroundColor: favorite ? "pink" : "white"}} 
            onClick={(e) => handleFavoritesClick(e)}>
            {favorites ? <i className="far fa-heart"></i> : <i class="fas fa-heart"></i>} </button>
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
      </div>
    </div>
  );
};

export default MultiKit;
