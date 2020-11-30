import React from "react";

const MultiVideo = (props) => {
  return (
    <div className="col">
      {/* <p>{() => {}}</p> */}
      <div className="card">
        <video
          width="400"
          height="280"
          controls
          // style={{ padding: "0px", margin: "0px" }}
        >
          {/* <source
              src="http://techslides.com/demos/sample-videos/small.ogv"
              type="video/ogg"
            />  */}
          <source src={props.videoUrl} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default MultiVideo;
