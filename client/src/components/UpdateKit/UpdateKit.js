import React, { useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import useDidMountEffect from "../../utils/useDidMountEffect";
import UserContext from "../../utils/UserContext";

const UpdateKit = (props) => {
  const [displayShow, setDisplayShow] = useState("Title");
  const [putUrl, setPutUrl] = useState({
    videoUrl: "",
    title: "",
    description: "",
  });
  const [video, setVideo] = useState();
  const [vidUploadStatus, setVidUploadStatus] = useState("");
  const [uploadedVidUrl, setUploadedVidUrl] = useState({
    url: "",
  });
  // const { kitId } = useParams();
  const { id } = useContext(UserContext);
  const history = useHistory();

  // const preset = "askckkso";
  const preset = "dklqfpym";
  // const urlVid = "https://api.cloudinary.com/v1_1/dsi7lpcmx/upload";
  const urlVid = "https://api.cloudinary.com/v1_1/dvr1qfvi0/upload";

  const handleAddVideoClick = () => {
    if (displayShow === "Title") {
      setDisplayShow("Video");
    } else {
      setDisplayShow("Title");
    }
  };

  const onChangeVideo = (e) => {
    setVideo(e.target.files[0]);
  };

  const postData = async () => {
    const formData = new FormData();
    formData.append("file", video);
    formData.append("upload_preset", preset);
    setVidUploadStatus("Uploading video...");
    await axios.post(urlVid, formData).then((res) => {
      const imageUrl = res.data.secure_url;
      setUploadedVidUrl({ url: imageUrl });

      setPutUrl({ ...putUrl, videoUrl: imageUrl });
    });
  };

  const handleVideoUploadSubmit = (e) => {
    e.preventDefault();
    if (video.type === "video/mp4") {
      axios
        .put(`/api/users/videouploads/${props.info.creatorId}`, putUrl)
        .then((res) => {
          console.log(res);
          axios
            .put(`/api/vidtokit/${props.info._id}`, uploadedVidUrl)
            .then((res) => history.push(`/portal/${id}`))
            .catch((err) => console.log(err));
          // history.push(`/portal/${id}`);
        })
        .catch((err) => console.log(err));
    } else if (video.type === "image/jpeg" || video.type === "image/png") {
      axios
        .put(`/api/picuploads/${props.info._id}`, uploadedVidUrl)
        .then((res) => history.push(`/viewone/${props.info._id}`))
        .catch((err) => console.log(err));
      // history.push(`/viewone/${props.info._id}`);
    }
    history.push(`/portal/${id}`);
  };

  useDidMountEffect(() => {
    if (video != "" && video != null) {
      postData();
    }
  }, [video]);

  return (
    <div className="card card-viewone">
      {props.src && typeof props.src[0] === "object" ? (
        <img
          src={props.src[0].url}
          className="card-img-top crop card-image-viewone"
          alt="Makeup Kit"
        />
      ) : (
        <img
          src={
            props.src === undefined || props.src === ""
              ? "http://via.placeholder.com/200"
              : props.src
          }
          className="card-img-top crop card-image-viewone"
          alt="Makeup Kit"
        />
      )}
      {/* <img
        src={
          props.src === undefined ? "http://via.placeholder.com/200" : props.src
        }
        className="card-img-top crop card-image-viewone"
        alt="..."
      /> */}
      <div className="card-body">
        {displayShow === "Title" ? (
          <>
            <h5 className="card-title" style={{ textAlign: "center" }}>
              <label htmlFor="kitName">Title: </label>
              <br />
              <input
                type="text"
                name="kitName"
                onChange={props.handleInputChange}
                defaultValue={props.info.kitName ? props.info.kitName : ""}
              ></input>
            </h5>
            <p className="card-text" style={{ textAlign: "center" }}>
              <label htmlFor="kitDescription">Description: </label>
              <br />
              <textarea
                type="text"
                name="kitDescription"
                onChange={props.handleInputChange}
                defaultValue={
                  props.info.kitDescription ? props.info.kitDescription : ""
                }
              />
              <br />

              <br />
              <button className="buttons" onClick={props.onClickUpdate}>
                Save
              </button>
              <button className="buttons" onClick={() => handleAddVideoClick()}>
                Add video/picture
              </button>
            </p>
          </>
        ) : (
          <>
            <div className="container">
              <div className="row">
                <div className="col-sm-6 offset-sm-3">
                  {/* <h1 className="mb-3 mt-3 text-center">Create a Kit</h1> */}
                  <h2 className="text-center mb-3 mt-3">
                    Upload Image or video
                  </h2>

                  <br />
                  <form style={{ margin: "auto" }}>
                    <div
                      className="input-group mb-3"
                      // style={styles.imageUploadContainer}
                    >
                      <div className="custom-file d-flex justify-content-center flex-column">
                        {vidUploadStatus === "Uploading video..." ? (
                          <label
                            className="buttons"
                            //  style={styles.uploadButton}
                          >
                            Upload
                            <input
                              disabled
                              type="file"
                              id="kitImageInput"
                              // className="custom-file-input"
                              hidden
                              onChange={onChangeVideo}
                            />
                          </label>
                        ) : (
                          <label
                            className="buttons"
                            //  style={styles.uploadButton}
                          >
                            Upload
                            <input
                              type="file"
                              id="kitImageInput"
                              // className="custom-file-input"
                              // accept="image/* || video/*"
                              hidden
                              onChange={onChangeVideo}
                            />
                          </label>
                        )}

                        <p>
                          {video
                            ? video.name.substr(0, 15) + "..."
                            : "Select a file.."}
                        </p>
                      </div>
                    </div>
                    {/* <input type="file" onChange={onChangeVideo} /> */}
                    {/* <label htmlFor="title">Title</label> */}
                    {/* <br /> */}
                    <input
                      style={{
                        display: "block",
                        width: "fit-content",
                        margin: "auto",
                      }}
                      placeholder="title"
                      name="title"
                      className="form-control"
                      type="text"
                      value={putUrl.title}
                      onChange={(e) =>
                        setPutUrl({
                          ...putUrl,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                    <textarea
                      style={{
                        display: "block",
                        width: "fit-content",
                        height: "100px",
                        margin: "auto",
                      }}
                      placeholder="description"
                      type="text"
                      className="form-control"
                      name="description"
                      value={putUrl.description}
                      onChange={(e) =>
                        setPutUrl({
                          ...putUrl,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                    {/* <button className="buttons">Save</button> */}

                    {putUrl.videoUrl === "" ? (
                      <>
                        <br />
                        <h4>{vidUploadStatus}</h4>
                      </>
                    ) : (
                      <button
                        onClick={handleVideoUploadSubmit}
                        className="buttons"
                      >
                        Done!
                      </button>
                    )}

                    <button
                      className="buttons"
                      onClick={() => setDisplayShow("Title")}
                    >
                      Go back
                    </button>
                    {/* <button onClick={handleVideoUploadSubmit} className="buttons">
              Done!
            </button> */}
                  </form>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UpdateKit;
