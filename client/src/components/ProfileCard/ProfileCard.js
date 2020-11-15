import React, { useContext, useEffect, useState } from "react";
import "./profilecard.css";
import RoleContext from "../../utils/RoleContext";
import UserContext from "../../utils/UserContext";
import axios from "axios";
import API from "../../utils/API";

const ProfileCard = (props) => {
  let totalKitViews = 0;

  if (props.yourKits) {
    props.yourKits.forEach((kit) => (totalKitViews += kit.uniqueVisits));
  }

  const [uploadedImage, setUploadedImage] = useState("");
  const [image, setImage] = useState("");
  const [usersName, setUsersName] = useState("");

  const { role } = useContext(RoleContext);
  const { id } = useContext(UserContext);

  const onChange = (e) => {
    setUploadedImage(e.target.files[0]);
    //onSubmit(e);
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
      console.log(res.data.image);
    });
  }, []);

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append("file", uploadedImage);
    formData.append("upload_preset", preset);
    try {
      // setLoading(true);
      // TODO: Note that we deleted the custom header cuz 3rd party api
      // delete axios.defaults.headers["x-auth-token"];
      const res = await axios.post(url, formData);
      const imageUrl = res.data.secure_url;
      console.log(imageUrl);

      setImage(res.data.secure_url);
      axios
        .put(`/api/users/${id}`, { image: res.data.secure_url })
        .then((res) => {
          console.log(res.data);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const determineRoleToShowConsumer = () => {
    var shownRole;
    if (role === "Consumer") {
      shownRole = "Beauty Aficionado";
    } else {
      shownRole = "Content Creator";
    }
    return shownRole;
  };


  if(id !== props.userProfileInfo._id) {
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
              <br />
              <br />
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
              <button className="btn btn-rounded btn-info">
                <i className="fa fa-plus"></i>
                <span>Upload</span>
              </button>
              <button className="btn btn-rounded btn-info">
                <i className="fa fa-comment"></i>
                <span>Message</span>
              </button>
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
    </>
  );
};

export default ProfileCard;
