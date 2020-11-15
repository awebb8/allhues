import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
// import AuthContext from "../utils/AuthContext";
import UserContext from "../utils/UserContext";
import RoleContext from "../utils/roleContext";
import MultiKit from "../components/MultiKit/MultiKit";
import ProfileCard from "../components/ProfileCard/ProfileCard";
// import NameContext from "../utils/NameContext";
import API from "../utils/API";
// import Kit from "../components/SingleKit/SingleKit";
import useDidMountEffect from "../utils/useDidMountEffect";
import { useHistory } from "react-router-dom";

const ContentCreatorPortal = () => {
  const [yourKits, setYourKits] = useState([]);
  const [favorites, setFavorites] = useState([]);
  // const [kits, setKits] = useState([]);
  // const { setJwt, jwt } = useContext(AuthContext);
  const { id } = useContext(UserContext);
  const history = useHistory;

  const getKits = () => {
    axios.get(`/api/users/${id}`).then((res) => {
      console.log("component did mount2");
      console.log(res.data.kits);

      setYourKits(res.data[0].kits);
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
    if (id) {
      API.putFavorite(id, favorites).then((res) => {
        console.log("put");
      });
    } else {
      history.push("/login");
    }
  }, [favorites]);

  // console.log(yourKits);
  const { role } = useContext(RoleContext);
  // const { name } = useContext(NameContext);

  if (role === "Consumer") {
    return (
      <>
        <ProfileCard />
      </>
    );
  }

  if (yourKits) {
    return (
      <>
        <div className="container-fluid">
          <div className="row">
            <ProfileCard yourKits={yourKits} />
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
