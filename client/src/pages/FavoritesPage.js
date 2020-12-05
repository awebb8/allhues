import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import MultiKit from "../components/MultiKit/MultiKit";
import API from "../utils/API";
import UserContext from "../utils/UserContext";
import useDidMountEffect from "../utils/useDidMountEffect";

const FavoritesPage = () => {
  const [favoriteKits, setFavoriteKits] = useState([]);

  const history = useHistory();
  // const [kitsToMap, setKitsToMap] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const { id } = useContext(UserContext);

  useEffect(() => {
    if (id) {
      API.getPopulatedUsers(id).then((resp) => {
        // console.log("Got data");
        setFavoriteKits(resp.data[0].favorites);
      });
    }
  }, [id]);

  // useEffect(() => {
  //   if (favorites) {
  //     API.getUser().then((res) => {
  //       setFavorites(res.data.favorites);
  //     });
  //   }
  // }, []);

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

  if (favorites.length === 0) {
    return (
      <>
        <h1 className="mt-4">You don't have any favorites yet..</h1>
        <Link to="/viewall">
          <h4 style={{ color: "grey" }}>Click here to view all kits</h4>
        </Link>
      </>
    );
  }

  return (
    <div>
      <div className="container-fluid">
        <div className="row row-cols-1 row-cols-md-3">
          {favoriteKits
            .filter((kit) => favorites.includes(kit._id))
            .map((i) => (
              <MultiKit
                setFavorites={setFavorites}
                favorites={favorites}
                key={i._id}
                src={i.imageUrl}
                filledHeart={i._id}
                class={i._id}
                info={i}
              />
            ))}
          {/* {favoriteKits.map((i) => (
            <MultiKit
              setFavorites={setFavorites}
              favorites={favorites}
              key={i._id}
              src={i.imageUrl}
              filledHeart={i._id}
              class={i._id}
              info={i}
            />
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
