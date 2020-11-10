import React, { useState, useEffect, useContext } from "react";
import MultiKit from "../components/MultiKit/MultiKit";
// import axios from "axios";
import API from "../utils/API";
import AuthContext from "../utils/AuthContext";

const ConsumerViewAll = () => {
  const [kits, setKits] = useState([]);
  const { jwt } = useContext(AuthContext);
  //Makes an api call to get all saved image urls so we can show em all
  useEffect(() => {
    API.getKits().then((res) => {
      //   console.log(res.data[0].imageUrl);
      for (let i = 0; i < res.data.length; i++) {
        setKits((kits) => [...kits, res.data[i]]);
      }
    });
  }, []);

  // {
  //   if (localStorage.getItem("token") == null) {
  //     return (
  //       <h1 style={{ textAlign: "center", margin: "auto" }}>
  //         Sorry, you've got log in to see this page!
  //       </h1>
  //     );
  //   }
  // }
  return (
    <div>
      <h1>Consumer Views All images here</h1>
      <div className="container">
        {/* <div className="row"></div> */}
        <div className="row row-cols-1 row-cols-md-2">
          {kits.map((i) => (
            <MultiKit key={i._id} src={i.imageUrl} class={i._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsumerViewAll;
