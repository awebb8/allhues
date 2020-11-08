import React, { useState, useEffect } from "react";
import MultiKit from "../components/MultiKit/MultiKit";
// import axios from "axios";
import API from "../utils/API";

const ConsumerViewAll = () => {
  const [kits, setKits] = useState([]);
  //Makes an api call to get all saved image urls so we can show em all
  useEffect(() => {
    API.getKits().then((res) => {
      //   console.log(res.data[0].imageUrl);
      for (let i = 0; i < res.data.length; i++) {
        setKits((kits) => [...kits, res.data[i].imageUrl]);
      }
    });
  }, []);
  return (
    <div>
      <h1>Consumer Views All images here</h1>
      <div className="container">
        {/* <div className="row"></div> */}
        <div className="row row-cols-1 row-cols-md-2">
          {kits.map((i) => (
            <MultiKit src={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsumerViewAll;
