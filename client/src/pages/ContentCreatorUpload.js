import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AddedAffiliateLink from "../components/AddedAffiliateLink/AddedAffiliateLink";
import API from "../utils/API";
// import AuthContext from "../utils/AuthContext";
import UserContext from "../utils/UserContext";
import Select from "react-select";
import { options, hueOptions } from "../utils/selectOptions";

const styles = {
  imageUploadContainer: {
    border: "8px dashed #e6f5e9",
    borderRadius: "5px",
    padding: "70px",
    height: "170px",
  },
};

const ContentCreatorUpload = () => {
  const history = useHistory();
  // States
  const [image, setImage] = useState("");
  // const { jwt } = useContext(AuthContext);
  const { id } = useContext(UserContext);
  const [kit, setKit] = useState({
    kitName: "",
    kitDescription: "",
    imageUrl: "",
    kitItems: [],
    creatorId: "",
    hueType: "",
  });
  const [kitItemLink, setKitItemLink] = useState("");
  const [makeupCategory, setMakeupCategory] = useState("");

  const [loading, setLoading] = useState(false);

  // useEffect
  useEffect(() => {
    setKit({ ...kit, creatorId: id });
  }, []);

  useEffect(() => {
    if (kit.imageUrl) {
      API.postKit(id, kit);
      alert("Your kit has been posted!");
    }
  }, [kit, id]);

  // Event listener functions
  const onChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setKit({ ...kit, [name]: value });
  };

  const handleInputLinkChange = (event) => {
    const { value } = event.target;
    setKitItemLink(value);
  };

  const handleAddKitItem = () => {
    setKit({
      ...kit,
      kitItems: [
        ...kit.kitItems,
        { affiliateLink: kitItemLink, makeupCategory: makeupCategory },
      ],
    });
    setKitItemLink("");
    setMakeupCategory("");
  };

  const removeKitItem = (id) => {
    setKit({
      ...kit,
      kitItems: kit.kitItems.filter((kitItem) => kitItem.affiliateLink !== id),
    });
  };

  const handleMakeupCategoryChange = (event) => {
    if (event === null) {
      setMakeupCategory("");
    } else {
      setMakeupCategory(event.value);
    }
  };

  const handleHueChange = (event) => {
    if (event === null) {
      setKit({ ...kit, hueType: "" });
    } else {
      setKit({ ...kit, hueType: event.value });
    }
  };

  const url = "https://api.cloudinary.com/v1_1/dsi7lpcmx/image/upload";
  const preset = "askckkso";

  const onSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

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

      setKit({ ...kit, imageUrl: imageUrl });
    } catch (err) {
      console.error(err);
    }

    // Redirect to contentCreator portal
    setTimeout(function () {
      history.push(`/portal/${id}`);
    }, 1500);
  };

  if (localStorage.getItem("token") == null) {
    return (
      <h1 style={{ textAlign: "center", margin: "auto" }}>
        Sorry, you've got to log in to see this page!
      </h1>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 offset-sm-3">
          {/* <h1 className="mb-3 mt-3 text-center">Create a Kit</h1> */}
          <h2 className="text-center mb-3 mt-3">Create a Kit</h2>
          <form>
            <div
              className="input-group mb-3"
              style={styles.imageUploadContainer}
            >
              <div className="custom-file d-flex justify-content-center flex-column">
                <label
                  className="btn btn-secondary"
                  style={styles.uploadButton}
                >
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
                <p>{image.name ? image.name : "Select a file"}</p>
              </div>
            </div>

            <div className="mb-3" style={{ width: 230 }}>
              <Select
                options={hueOptions}
                placeholder="Select Hue"
                isClearable
                onChange={handleHueChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="kitNameInput">Kit Name</label>
              <input
                type="text"
                id="kitNameInput"
                className="form-control"
                name="kitName"
                placeholder="Give your kit a name!"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="kitDescriptionInput">Kit Description</label>
              <textarea
                id="kitDescriptionInput"
                className="form-control"
                name="kitDescription"
                placeholder="Provide a brief description for your kit.."
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="kitItemsInput">Kit Items</label>
              <button
                className="btn btn-outline-secondary btn-sm ml-2 py-0"
                type="submit"
                onClick={handleAddKitItem}
                disabled={!kitItemLink || !makeupCategory}
              >
                Add link
              </button>

              {kit.kitItems.map((kitItem, index) => (
                <AddedAffiliateLink
                  key={index}
                  affiliateLink={kitItem.affiliateLink}
                  removeKitItem={removeKitItem}
                  id={kitItem.affiliateLink}
                  makeupCategory={kitItem.makeupCategory}
                />
              ))}

              {/* <div className="input-group mb-3"> */}
              <div className="row no-gutters">
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Url to product"
                    id="kitItemsInput"
                    value={kitItemLink}
                    onChange={handleInputLinkChange}
                  />
                </div>
                <div className="col-sm-4">
                  <Select
                    options={options}
                    onChange={handleMakeupCategoryChange}
                    placeholder="Category"
                    isClearable
                  />
                </div>
              </div>

              {/* </div> */}
            </div>

            {loading ? (
              <button
                className="btn btn-secondary"
                type="button"
                disabled
                style={{ marginBottom: "100px" }}
              >
                <span
                  className="spinner-border spinner-border-sm mr-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Posting your look...
              </button>
            ) : (
              <button
                className="btn btn-secondary"
                type="button"
                onClick={onSubmit}
                disabled={!image}
                style={{ marginBottom: "100px" }}
              >
                Post your look!
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContentCreatorUpload;
