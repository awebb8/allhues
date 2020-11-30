import React, { useContext, useEffect, useState } from "react";
import "./profilecard.css";
import RoleContext from "../../utils/roleContext";
import UserContext from "../../utils/UserContext";
import axios from "axios";
import API from "../../utils/API";
import { useHistory } from "react-router-dom";
import useDidMountEffect from "../../utils/useDidMountEffect";

const ProfileCard = (props) => {
  const history = useHistory();

  let totalKitViews = 0;

  if (props.yourKits) {
    props.yourKits.forEach((kit) => (totalKitViews += kit.uniqueVisits));
  }

  const [uploadedImage, setUploadedImage] = useState("");
  const [image, setImage] = useState("");
  const [usersName, setUsersName] = useState("");
  const [video, setVideo] = useState("");
  const [videoEl, setVideoEl] = useState("none");
  const [putUrl, setPutUrl] = useState({
    videoUrl: "",
  });

  // const { role } = useContext(RoleContext);
  const { id } = useContext(UserContext);

  const onChange = (e) => {
    setUploadedImage(e.target.files[0]);
  };
  const url = "https://api.cloudinary.com/v1_1/dsi7lpcmx/image/upload";
  const preset = "askckkso";

  useEffect(() => {
    if (uploadedImage) {
      onSubmit();
    }
  }, [uploadedImage]);

  useEffect(() => {
    API.getUser().then((res) => {
      setImage(res.data.image);
      //setUploadedImage(res.data.image);
      setUsersName(res.data.name);
    });
  }, []);

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append("file", uploadedImage);
    formData.append("upload_preset", preset);
    try {
      const res = await axios.post(url, formData);

      setImage(res.data.secure_url);
      axios
        .put(`/api/users/${id}`, { image: res.data.secure_url })
        .then((res) => {
          // console.log(res.data);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const onChangeVideo = (e) => {
    setVideo(e.target.files[0]);
  };

  const determineRoleToShowConsumer = () => {
    var shownRole;
    if (props.userProfileInfo.role === "Consumer") {
      shownRole = "Beauty Aficionado";
    } else {
      shownRole = "Content Creator";
    }
    return shownRole;
  };

  const handleUploadButtonClick = () => {
    history.push("/upload");
  };

  const handleVideoUploadClick = () => {
    if (videoEl === "none") {
      setVideoEl("block");
    } else {
      setVideoEl("none");
    }
  };

  const urlVid = "https://api.cloudinary.com/v1_1/dsi7lpcmx/upload";
  // const urlVid = "https://api.cloudinary.com/v1_1/dvr1qfvi0/upload";
  // const setStateWaitForMe = async (returnedUrl) => {
  //   setPutUrl({ videoUrl: returnedUrl });
  // };

  const postData = async () => {
    const formData = new FormData();
    formData.append("file", video);
    formData.append("upload_preset", preset);

    axios.post(urlVid, formData).then((res) => {
      const imageUrl = res.data.secure_url;

      setPutUrl({ videoUrl: imageUrl });
    });
  };

  useDidMountEffect(() => {
    axios
      .put(`/api/users/videouploads/${id}`, putUrl)
      .then((res) => {
        console.log(res);
        history.push("/videos");
      })
      .catch((err) => console.log(err));
  }, [putUrl]);

  useDidMountEffect(() => {
    if (video != "") {
      postData();
    }
  }, [video]);

  if (id !== props.userProfileInfo._id) {
    return (
      <>
        <div className="container-fluid">
          <div className="col-lg-12">
            <div className="panel profile-cover">
              <div className="profile-cover__img">
                <label htmlFor="AvatarImageInput">
                  <img
                    src={props.userProfileInfo.image}
                    alt="placeholder image"
                  />
                </label>
                <h3 className="h3">
                  {determineRoleToShowConsumer()}: {props.userProfileInfo.name}
                </h3>
              </div>
              <div className="profile-cover__action bg--img" data-overlay="0.3">
                <button className="btn btn-rounded btn-info">
                  <i className="fa fa-plus"></i>
                  <span>Follow</span>
                </button>
                <button className="btn btn-rounded btn-info">
                  <i className="fa fa-comment"></i>
                  <span>Message</span>
                </button>
              </div>
              <div className="profile-cover__info">
                <ul className="nav">
                  <li>
                    <strong>
                      {props.yourKits ? props.yourKits.length : 0}
                    </strong>
                    Created Kits
                  </li>
                  <li>
                    <strong>{totalKitViews}</strong>Total Kit Views
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container-fluid">
        <div className="col-lg-12">
          <div className="panel profile-cover">
            <div className="profile-cover__img">
              <label htmlFor="AvatarImageInput">
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="AvatarImageInput"
                  className="custom-file-input"
                  name="image"
                  onChange={onChange}
                  accept="image/*"
                  hidden
                />
                <img
                  className="crop"
                  src={image}
                  alt="placeholder image"
                  style={{ cursor: "pointer" }}
                />
              </label>
              <h3 className="h3">
                {determineRoleToShowConsumer()}: {usersName}
              </h3>
            </div>
            <div className="profile-cover__action bg--img" data-overlay="0.3">
              {props.userProfileInfo.role === "Consumer" ? (
                <>
                  <br />
                  <br />
                </>
              ) : (
                <>
                  <div
                    style={{
                      display: videoEl,
                      background: "#f9e5d2",
                      width: "210px",
                    }}
                  >
                    <form>
                      <input type="file" onChange={onChangeVideo} />
                    </form>
                  </div>
                  <button
                    className="btn btn-rounded btn-info"
                    onClick={handleUploadButtonClick}
                  >
                    <i className="fa fa-plus"></i>
                    <span>Upload</span>
                  </button>
                  <button
                    className="btn btn-rounded btn-info"
                    onClick={handleVideoUploadClick}
                  >
                    <i className="fa fa-plus"></i>
                    <span>Upload Video</span>
                  </button>
                </>
              )}
            </div>
            <div className="profile-cover__info">
              <ul className="nav">
                <li>
                  <strong>{props.yourKits ? props.yourKits.length : 0}</strong>
                  Created Kits
                </li>
                <li>
                  <strong>{totalKitViews}</strong>Total Kit Views
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* <div style={{ display: videoEl }}>
        <form>
          <input type="file" onChange={onChangeVideo} />
        </form>
      </div> */}
    </>
  );
};

export default ProfileCard;
