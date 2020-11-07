import React, { useState, useEffect } from "react";
import MultiKit from "../components/MultiKit/MultiKit";
import axios from "axios";

const ConsumerViewAll = () => {
  const [kits, setKits] = useState([]);
  //Makes an api call to get all saved image urls so we can show em all
  useEffect(() => {
    axios.get("/api/kits").then((res) => {
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
          {/* <MultiKit src="https://thumbs.dreamstime.com/z/funny-summer-black-dog-summer-accessories-concept-73236347.jpg" />
          <MultiKit src="https://a6p8a2b3.stackpathcdn.com/ZeDAld-TixBCgHQrdbL0UG82Z98=/600x/smart/filters:watermark(https://www.rockol.it/assets/img/2019/placeholder-image-credits.png,repeat,repeat,50)/rockol-img/img/foto/upload/kanye-west.2018-05-24-13-13-07.jpg" />
          <MultiKit src="https://l450v.alamy.com/450v/k736c5/funny-dog-hold-banner-on-white-background-k736c5.jpg" />
          <MultiKit />
          <MultiKit src="https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/1702543/settings_images/pXy3p6mQyyJtrgTNitHg_stones-451329_1920.jpg" />
          <MultiKit /> */}
        </div>
      </div>
    </div>
  );
};

export default ConsumerViewAll;
