import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
// import AuthContext from "../utils/AuthContext";
import UserContext from "../utils/UserContext";
import RoleContext from "../utils/RoleContext";
import MultiKit from "../components/MultiKit/MultiKit";
import ProfileCard from "../components/ProfileCard/ProfileCard";
// import NameContext from "../utils/NameContext";
import API from "../utils/API";
// import Kit from "../components/SingleKit/SingleKit";
import { useParams } from 'react-router-dom';
import useDidMountEffect from "../utils/useDidMountEffect";

const ContentCreatorPortal = () => {
  const [yourKits, setYourKits] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const [userProfileInfo, setUserProfileInfo] = useState([]);

  const { id } = useContext(UserContext);

  const userId = useParams();

  const getKits = () => {
      axios.get(`/api/users/${id}`).then((res) => {
        setYourKits(res.data[0].kits);
    });

    axios.get(`/api/users/${userId.id}`).then((res) => {
      setYourKits(res.data[0].kits);
      setUserProfileInfo(res.data[0]);
    });
  };

  useEffect(() => {
    getKits();
  }, [id]);

  useEffect(() => {
    if (favorites) {
      API.getUser().then((res) => {
        setFavorites(res.data.favorites);
      });
    }
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (favorites.length >= 0) {
  //       API.putFavorite(id, favorites).then((res) => {
  //         console.log("BLAH");
  //       });
  //     }
  //   }, 200);
  // }, [favorites]);
  useDidMountEffect(() => {
    API.putFavorite(id, favorites).then((res) => {
      console.log("put");
    });
  }, [favorites]);

  // console.log(yourKits);
  const { role } = useContext(RoleContext);

  // if (role === "Consumer") {
  //   return (
  //     <>
  //       <ProfileCard yourKits={yourKits} userProfileInfo={userProfileInfo} />
  //     </>
  //   );
  // }


  if (yourKits) {
    return (
      <>
        <div className="container-fluid">
          <div className="row">
            <ProfileCard yourKits={yourKits} userProfileInfo={userProfileInfo} />
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
