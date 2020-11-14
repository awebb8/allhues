import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import MultiKit from "../components/MultiKit/MultiKit";
import API from "../utils/API";
import UserContext from "../utils/UserContext";

const FavoritesPage = () => {
  const [favoriteKits, setFavoriteKits] = useState([]);

  const [kitsToMap, setKitsToMap] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const { id } = useContext(UserContext);

  useEffect(async () => {
    await API.getPopulatedUsers(id).then((resp) => {
      // console.log("Got data");
      setFavoriteKits(resp.data[0].favorites);
    });
  }, [id]);

  useEffect(async () => {
    if (favorites) {
      await API.getUser().then((res) => {
        setFavorites(res.data.favorites);
      });
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (favorites.length >= 0) {
        API.putFavorite(id, favorites).then((res) => {
          console.log("BLAH");
          API.getPopulatedUsers(id).then((resp) => {
            console.log("mybadyo");
            console.log(resp.data);
            setFavoriteKits(resp.data[0].favorites);
          });
        });
      }
    }, 200);
  }, [favorites]);

  if (favorites.length === 0) {
    return (
      <>
        <h4>You don't have any favorites yet..</h4>
        <Link to="/viewall">
          <h4>View all kits?</h4>
        </Link>
      </>
    );
  }

  return (
    <div>
      <div className="container-fluid">
        {/* <h1>hi </h1> */}
        {/* <div className="row row-cols-6">
          <Select
            options={sortOptions}
            onChange={handleSortChange}
            placeholder="Sort by..."
            isClearable
          />
        </div> */}

        {/* <div className="row"></div> */}
        <div className="row row-cols-1 row-cols-md-3">
          {(favorites != undefined) &
            favoriteKits.map((i) => (
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
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
