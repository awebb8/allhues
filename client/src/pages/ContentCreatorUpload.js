import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AddedAffiliateLink from '../components/AddedAffiliateLink/AddedAffiliateLink';
import API from "../utils/API";
import AuthContext from "../utils/AuthContext";

const styles = {
  imageUploadContainer: {
    border: "8px dashed #e6f5e9",
    borderRadius: "5px",
    padding: "50px",
  },
  // uploadButton: {
  //   backgroundColor: '#e6f5e9',
  //   borderColor: '#e6f5e9',
  //   color: 'black',
  // },
};

const ContentCreatorUpload = () => {
  // States
  const [image, setImage] = useState("");
  const { jwt } = useContext(AuthContext);
  const [kit, setKit] = useState({
    kitName: "",
    kitDescription: "",
    imageUrl: "",
    kitItems: [],
  });
  const [kitItemLink, setKitItemLink] = useState("");


  // useEffect
  useEffect(() => {
    if (kit.imageUrl) {
      // axios.post("/api/kits", kit);
      API.postKit(kit);
    }
  }, [kit]);


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
  }

  const handleAddKitItem = () => {
    setKit({...kit, kitItems: [...kit.kitItems, {affiliateLink: kitItemLink}] });
    setKitItemLink('');
  }

  const removeKitItem = () => {

  }

  const url = "https://api.cloudinary.com/v1_1/dsi7lpcmx/image/upload";
  const preset = "askckkso";

  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", preset);
    try {
      const res = await axios.post(url, formData);
      const imageUrl = res.data.secure_url;
      console.log(imageUrl);

      setKit({ ...kit, imageUrl: imageUrl });
    } catch (err) {
      console.error(err);
    }
  };

  {
    if (localStorage.getItem("token") == null) {
      return (
        <h1 style={{ textAlign: "center", margin: "auto" }}>
          Sorry, you've got to log in to see this page!
        </h1>
      );
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 offset-sm-3">
          <h1 className="mb-4 text-center">Create a Kit</h1>
          <form>
            <div
              className="input-group mb-3"
              style={styles.imageUploadContainer}
            >
              <div className="custom-file d-flex justify-content-center">
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
                  {/* <label className="custom-file-label" htmlFor="kitImageInput">
                  {image.name === undefined || image.name === ""
                    ? "Choose file"
                    : image.name}
                </label> */}
                </label>
              </div>
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
              />
            </div>
            <div className="form-group">
              <label htmlFor="kitDescriptionInput">Kit Description</label>
              <textarea
                id="kitDescriptionInput"
                className="form-control"
                name="kitDescription"
                placeholder="Provide a brief description of your kit.."
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="kitItemsInput">Kit Items</label>

                {kit.kitItems.map((kitItem, index) => (<AddedAffiliateLink key={index} affiliateLink={kitItem.affiliateLink} />))}

              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Url to product"
                  id="kitItemsInput"
                  value={kitItemLink}
                  onChange={handleInputLinkChange}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={handleAddKitItem}
                  >
                    Add link
                  </button>
                </div>
                {/* <label class="custom-file-label" htmlFor="kitImageInput">
                  {image.name === undefined || image.name === ""
                    ? "Choose file"
                    : image.name}
                </label> */}
              </div>

            </div>

            <button
              className="btn btn-primary"
              type="submit"
              onClick={onSubmit}
            >
              Post your look!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContentCreatorUpload;
