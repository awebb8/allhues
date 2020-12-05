import "./MultiKit.css";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../utils/UserContext";

import fitz1 from "../../assets/images/fitz1.png";
import fitz2 from "../../assets/images/fitz2.png";
import fitz3 from "../../assets/images/fitz3.png";
import fitz4 from "../../assets/images/fitz4.png";
import fitz5 from "../../assets/images/fitz5.png";
import fitz6 from "../../assets/images/fitz6.png";

const MultiKit = (props) => {
  const history = useHistory();

  const { favorites, setFavorites, filledHeart } = props;

  const [favorite, setFavorite] = useState(
    favorites ? favorites.includes(filledHeart) : false
  );

  const { id } = useContext(UserContext);

  const handleSingleKitClick = (e) => {
    history.push(`/viewone/${e.target.getAttribute("class").substr(0, 25)}`);
  };

  const handleFavoritesClick = (e) => {
    e.stopPropagation();

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
        {typeof props.src[0] === "object" ? (
          <img
            src={props.src[0].url}
            className={`${props.class} card-img-top crop card-img-viewall`}
            alt="Makeup Kit"
          />
        ) : (
          <img
            src={
              props.src === undefined || props.src === ""
                ? "http://via.placeholder.com/200"
                : props.src
            }
            className={`${props.class} card-img-top crop card-img-viewall`}
            alt="Makeup Kit"
          />
        )}

        {/* )} */}
        <div
          style={{ textAlign: "center" }}
          className={
            props.class === undefined
              ? "card-body-viewall"
              : props.class + " card-body-viewall"
          }
        >
          {id !== "" ? (
            <button
              type="button"
              className={`${props.class} btn btn-default`}
              onClick={(e) => handleFavoritesClick(e)}
            >
              {favorites.includes(filledHeart) ? (
                <i className={`${props.class} fas fa-heart`}></i>
              ) : (
                <i className={`${props.class} far fa-heart`}></i>
              )}{" "}
            </button>
          ) : (
            <div className="mt-4"></div>
          )}

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
  );
};

export default MultiKit;
