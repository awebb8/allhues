import React, { useEffect, useState, useContext } from "react";
import MultiKit from "../components/MultiKit/MultiKit";
import API from "../utils/API";
import UserContext from "../utils/UserContext";

const FavoritesPage = () => {
  const [favoriteKits, setFavoriteKits] = useState([]);

  const [kitsToMap, setKitsToMap] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const { id } = useContext(UserContext);

  useEffect(() => {
    API.getPopulatedUsers(id).then((resp) => {
      // console.log("Got data");
      setFavoriteKits(resp.data[0].favorites);
    });
  }, [id]);

  useEffect(() => {
    if (favorites) {
      API.getUser().then((res) => {
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

  //TODO:
  setTimeout(() => {
    if (favorites.length === 0) {
      return (
        <>
          <h1>No Favorites yet!</h1>
        </>
      );
    }
  }, 330);

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
          {favoriteKits.map((i) => (
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
