import React, { useContext, useEffect, useState } from "react";
import NameContext from "../../utils/NameContext";
import RoleContext from "../../utils/RoleContext";
import UserContext from "../../utils/UserContext";
import axios from "axios";
import API from "../../utils/API";

const ProfileCard = () => {
  const [image, setImage] = useState("");
  const { name } = useContext(NameContext);
  const { role } = useContext(RoleContext);
  const { id } = useContext(UserContext);
  const onChange = (e) => {
    setImage(e.target.files[0]);
  };
  const url = "https://api.cloudinary.com/v1_1/dsi7lpcmx/image/upload";
  const preset = "askckkso";
  useEffect(() => {
    axios.get(`/api/users/${id}`).then((res) => {
      console.log(res.data);
      setImage(res.data[0].image);
    });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", image);
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

    // Redirect to contentCreator portal
    // setTimeout(function () {
    //   history.push("/portal");
    // }, 1000);
  };

  const jumboStyle = {
    // margin: "auto",
    width: "fit-content",
    height: "fit-content",
    borderRadius: "15%",
    position: "absolute",
    marginLeft: "1%",
    marginTop: "1%",
  };
  //   var shownRole;
  const determineRoleToShowConsumer = () => {
    var shownRole;
    if (role === "Consumer") {
      shownRole = "Beautiful makeup artist";
    } else {
      shownRole = "Influencer";
    }
    return shownRole;
  };

  return (
    <>
      <div className="jumbotron" style={jumboStyle}>
        <img
          style={{ borderRadius: "95%", marginTop: "-20%" }}
          src={image}
          alt="placeholder image"
        />

        <h4>{name}'s profile</h4>

        <p className="lead">{determineRoleToShowConsumer()}</p>
        <hr className="my-1" />
        <p>It uses utility classe</p>
        <label className="btn btn-secondary">
          Upload
          <input
            type="file"
            id="kitImageInput"
            className="custom-file-input"
            name="image"
            onChange={onChange}
            accept="image/*"
            hidden
          />
        </label>
        <button
          className="btn btn-secondary btn-sm"
          type="button"
          onClick={onSubmit}
          disabled={!image}
        >
          Change
        </button>
      </div>
    </>
  );
};

export default ProfileCard;
