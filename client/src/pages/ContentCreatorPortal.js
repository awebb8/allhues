import axios from "axios";
import React, { useEffect, useState, useContext } from "react";

import UserContext from "../utils/UserContext";
// import RoleContext from "../utils/roleContext";
import MultiKit from "../components/MultiKit/MultiKit";
import ProfileCard from "../components/ProfileCard/ProfileCard";

import API from "../utils/API";

import { useParams } from "react-router-dom";
import useDidMountEffect from "../utils/useDidMountEffect";
import { useHistory } from "react-router-dom";

const ContentCreatorPortal = () => {
  const [yourKits, setYourKits] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const [userProfileInfo, setUserProfileInfo] = useState([]);
  // const [clickedInfo, setClickedInfo] = useState("");

  const { id } = useContext(UserContext);
  const history = useHistory;

  const userId = useParams();

  const getKits = () => {
    API.getAllUsers()
      .then((res) => {
        let iterVal = res.data;
        // console.log(userId);
        if (userId.id == id) {
          for (let i = 0; i < iterVal.length; i++) {
            if (iterVal[i]._id === userId.id) {
              setYourKits(iterVal[i].kits);
              setUserProfileInfo(iterVal[i]);
            }
          }
        } else {
          for (let j = 0; j < iterVal.length; j++) {
            if (iterVal[j]._id === userId.id) {
              setYourKits(iterVal[j].kits);
              setUserProfileInfo(iterVal[j]);
            }
          }
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getKits();
  }, [id]);

  useEffect(() => {
    if (favorites) {
      API.getUser().then((res) => {
        // console.log(res.data);
        if (res.data) {
          setFavorites(res.data.favorites);
        }
      });
    }
  }, []);

  useDidMountEffect(() => {
    if (id) {
      API.putFavorite(id, favorites).then((res) => {
        // console.log("put");
      });
    } else {
      history.push("/login");
    }
  }, [favorites]);

  // console.log(yourKits);
  // const { role } = useContext(RoleContext);

  if (yourKits) {
    return (
      <>
        <div className="container-fluid">
          <div className="row">
            <ProfileCard
              yourKits={yourKits}
              userProfileInfo={userProfileInfo}
            />
          </div>
          <div className="row row-cols-1 row-cols-md-3">
            {yourKits.map((kit) => (
              <MultiKit
                setFavorites={setFavorites}
                favorites={favorites}
                filledHeart={kit._id}
                key={kit._id}
                class={kit._id}
                src={kit.imageUrl}
                info={kit}
              />
            ))}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h1>Error retrieving your kits</h1>
      </>
    );
  }
};

export default ContentCreatorPortal;
