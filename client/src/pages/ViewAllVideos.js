import Axios from "axios";
import React, { useEffect, useState } from "react";
import MultiVideo from "../components/MultiVideo/MultiVideo";

const ViewAllVideos = (props) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    Axios.get("/api/videouploads").then((res) => {
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
      <div className="container-fluid">
        <div className="row row-cols-1 row-cols-md-3">
          {videos.map((i) => (
            <MultiVideo videoUrl={i.videoUrl} info={i} key={i.videoUrl} />
          ))}{" "}
        </div>
      </div>
    </div>
  );
};

export default ViewAllVideos;
