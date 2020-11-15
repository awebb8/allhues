import "./MultiKit.css";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../utils/UserContext";
import API from "../../utils/API";

const MultiKit = (props) => {
  const history = useHistory();

  // const [addFavorite, setAddFavorite] = useState("");
  const { favorites, setFavorites, filledHeart } = props;

  const [favorite, setFavorite] = useState(
    favorites ? favorites.includes(filledHeart) : false
  );
  const { id } = useContext(UserContext);

  const handleSingleKitClick = (e) => {
    // console.log(e.target);
    history.push(`/viewone/${e.target.getAttribute("class").substr(0, 25)}`);
  };

  const handleFavoritesClick = (e) => {
    e.stopPropagation();
    //setAddFavorite({favorites: e.target.getAttribute("class").substr(0,25).trim()})
    //console.log(e.target.getAttribute("class").substr(0,25).trim());
    setFavorite(!favorite);

    const targetId = e.target.getAttribute("class").substr(0, 25).trim();

    if (!favorites.includes(targetId)) {
      setFavorites([...favorites, targetId]);
    } else {
      const filteredFaves = favorites.filter((i) => i !== targetId);

      setFavorites(filteredFaves);
    }
  };

  useEffect(() => {
    if (favorite === false) {
      setFavorite(favorites.includes(filledHeart));
    }
  }, [favorite]);

  return (
    <div
      className={
        props.class === undefined ? "col mb-4" : props.class + " col mb-4"
      }
    >
      <div
        className={
          props.class === undefined
            ? "grow card card-viewall"
            : props.class + " grow card card-viewall"
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
            props.class === undefined
              ? "card-body-viewall"
              : props.class + " card-body-viewall"
          }
        > 
        {id !== "" ? <button
            type="button"
            className={`${props.class} btn btn-default`}
            onClick={(e) => handleFavoritesClick(e)}
          >
            {favorites.includes(filledHeart) ? (
              <i className={`${props.class} fas fa-heart`}></i>
            ) : (
              <i className={`${props.class} far fa-heart`}></i>
            )}{" "}
          </button> : <div className="mt-4"></div> }
          
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

export default MultiKit;
