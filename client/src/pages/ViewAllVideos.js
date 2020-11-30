import Axios from "axios";
import React, { useEffect, useState } from "react";

const ViewAllVideos = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    Axios.get("/api/videouploads").then((res) => {
      console.log(res.data);
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].videos.length > 0) {
          for (let j = 0; j < res.data[i].videos.length; j++) {
            setVideos((videos) => [...videos, res.data[i].videos[j]]);
          }
        }
      }
    });
  }, []);
  return (
    <div>
      {videos.map((i) => (
        <>
          {/* <p>{() => {}}</p> */}
          <video width="320" height="240" controls>
            {/* <source
              src="http://techslides.com/demos/sample-videos/small.ogv"
              type="video/ogg"
            />  */}
            <source src={i.videoUrl} type="video/mp4" />
          </video>
        </>
      ))}
    </div>
  );
};

export default ViewAllVideos;
