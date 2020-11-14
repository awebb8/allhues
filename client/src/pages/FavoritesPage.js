import React, { useEffect, useState } from "react";
import MultiKit from "../components/MultiKit/MultiKit";
import API from "../utils/API";

const FavoritesPage = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [favoriteKits, setFavoriteKits] = useState([]);
  const [allKits, setAllKits] = useState([]);
  const [kitsToMap, setKitsToMap] = useState([]);

  useEffect(() => {
    API.getUser().then((res) => {
      for (let i = 0; i < res.data.favorites.length; i++) {
        setFavoriteKits((favoriteKits) => [
          ...favoriteKits,
          res.data.favorites[i],
        ]);
      }

      setUserInfo(res.data);
    });
  }, []);

  useEffect(() => {
    if (favoriteKits) {
      API.getKits().then((res) => {
        setAllKits(res.data);
      });
    }
  }, [favoriteKits]);

  useEffect(() => {
    if (allKits) {
      const intersection = allKits.filter((element) =>
        favoriteKits.includes(element._id)
      );
      setKitsToMap(intersection);
    }
  }, [allKits]);

  return (
    <div>
      <div className="container-fluid">
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
          {kitsToMap.map((i) => (
            <MultiKit
              // setFavorites={setFavorites}
              // favorites={favorites}
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
