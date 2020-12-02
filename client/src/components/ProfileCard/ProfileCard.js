import React, { useContext, useEffect, useState } from "react";
import "./profilecard.css";
// import RoleContext from "../../utils/roleContext";
import UserContext from "../../utils/UserContext";
import axios from "axios";
import API from "../../utils/API";
import { useHistory, Link } from "react-router-dom";
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
  const [followInfo, setFollowInfo] = useState({
    id: props.userProfileInfo._id,
  });
  const [alrdyFollowed, setAlrdyFollowed] = useState(false);
  const [numberOfFollowers, setNumberOfFollowers] = useState(0);

  // const { role } = useContext(RoleContext);
  const { id } = useContext(UserContext);

  const onChange = (e) => {
    setUploadedImage(e.target.files[0]);
  };
  const url = "https://api.cloudinary.com/v1_1/dsi7lpcmx/image/upload";
  // const url = "https://api.cloudinary.com/v1_1/dvr1qfvi0/image/upload";
  const preset = "askckkso";
  // const myPreset = "dklqfpym";

  useEffect(() => {
    if (uploadedImage) {
      onSubmit();
    }
  }, [uploadedImage]);

  useDidMountEffect(() => {
    setImage(props.userProfileInfo.image);
    setUsersName(props.userProfileInfo.name);
    setFollowInfo({ ...followInfo, id: props.userProfileInfo._id });
    //Crappy api route name but jsut gets all contentCreators
    API.getAllUsers()
      .then((res) => {
        let iterVal = res.data;

        for (let i = 0; i < iterVal.length; i++) {
          if (iterVal[i]._id == id) {
            const numbOfFoll = iterVal[i].followers.length;
            setNumberOfFollowers(numbOfFoll);
            if (
              iterVal[i].following
                .map((j) => j.id == props.userProfileInfo._id)
                .includes(true)
            ) {
              setAlrdyFollowed(true);
            }
          }
        }
      })
      .catch((err) => console.log(err));
  }, [props.userProfileInfo]);

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

  const handleFollowClick = () => {
    // const alrdyFollowed
    setAlrdyFollowed(true);
    const payload = {
      id,
    };

    axios
      .put(`/api/follow/${id}`, followInfo)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
    axios
      .put(`/api/followers/${followInfo.id}`, payload)
      .then((res) => {})
      .catch((err) => console.log(err));
  };

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
                {alrdyFollowed ? (
                  <button
                    onClick={handleFollowClick}
                    className="btn btn-rounded btn-info"
                    disabled
                  >
                    <i className="fa fa-plus"></i>
                    <span>Follow</span>
                  </button>
                ) : (
                  <button
                    onClick={handleFollowClick}
                    className="btn btn-rounded btn-info"
                    // disabled
                  >
                    <i className="fa fa-plus"></i>
                    <span>Follow</span>
                  </button>
                )}

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
                  <button
                    className="btn btn-rounded btn-info"
                    onClick={handleUploadButtonClick}
                  >
                    <i className="fa fa-plus"></i>
                    <span>Upload</span>
                  </button>
                  <button
                    className="btn btn-rounded btn-info"
                    // onClick={handleVideoUploadClick}
                  >
                    {/* <input type="file" onChange={onChangeVideo} /> */}
                    <Link
                      to={{
                        pathname: "/upload",
                        state: { uploadType: "Video" },
                      }}
                    >
                      <i className="fa fa-plus" style={{ color: "white" }}></i>

                      <span style={{ color: "white" }}>Upload Video</span>
                    </Link>
                  </button>
                </>
              )}
            </div>
            <div className="profile-cover__info">
              <ul className="nav">
                {props.userProfileInfo.role == "Content Creator" ? (
                  <li>
                    <strong>{numberOfFollowers}</strong>
                    Followers
                  </li>
                ) : (
                  <li>
                    <strong>{props.userProfileInfo.following.length}</strong>
                    Following
                  </li>
                )}

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
    </>
  );
};

export default ProfileCard;
