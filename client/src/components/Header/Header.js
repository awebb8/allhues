import "./header.css";
import introVideo from "./productionID_3971845.mp4";

function Header() {
  return (
    <>
      {/* <div className="main-image jumbotron-fluid">
      <video id="video-background" preload muted autoplay loop>
        <source src="http://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4"/>
      </video>
        <h1 className="display-4 title">AllHues</h1>
        <p className="lead">Every shade of beautiful</p>
      </div> */}
      <div className="jumbotron">
        <video
          className="video-background"
          preload="true"
          muted="true"
          autoplay="true"
          loop="true"
        >
          <source
            src={introVideo}
            // src="https://assets.mixkit.co/videos/preview/mixkit-makeup-and-powder-brush-381-large.mp4"
            type="video/mp4"
          />
        </video>
        <div className="overlay">
          <h1 className="display-4 title">AllHues</h1>
          <p className="lead">Every shade of beautiful</p>
        </div>
      </div>
    </>
  );
}

export default Header;
