import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import API from "../utils/API";
import AuthContext from "../utils/AuthContext";

const ContentCreatorUpload = () => {
  const [image, setImage] = useState("");
  const { jwt } = useContext(AuthContext);
  const [kit, setKit] = useState({
    kitName: "",
    kitDescription: "",
    imageUrl: "",
    kitItems: [],
  });

  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (kit.imageUrl) {
      // axios.post("/api/kits", kit);
      API.postKit(kit);
    }
  }, [kit]);

  const onChange = (e) => {
    setImage(e.target.files[0]);
  };

  // useEffect(() => {
  //   async function fetchImage() {
  //     const image = await axios.get('/getLatest');
  //     setImage(image.data);
  //   }
  //   fetchImage();
  //   // eslint-disable-next-line
  // }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setKit({ ...kit, [name]: value });
  };

  const url = "https://api.cloudinary.com/v1_1/dsi7lpcmx/image/upload";
  const preset = "askckkso";

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", preset);
    try {
      // setLoading(true);
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
          <h1>Create a Kit</h1>
          <form>
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
              <input
                type="text"
                id="kitItemsInput"
                className="form-control"
                name="kitItems"
                placeholder="Affiliate Link"
                //   onChange={handleInputChange}
              />
            </div>
            <div className="input-group mb-3">
              <div class="custom-file">
                <input
                  type="file"
                  id="kitImageInput"
                  className="custom-file-input"
                  name="image"
                  onChange={onChange}
                  accept="image/*"
                />
                <label class="custom-file-label" htmlFor="kitImageInput">
                  {image.name === undefined || image.name === ""
                    ? "Choose file"
                    : image.name}
                </label>
              </div>
            </div>
            <button
              className="btn btn-primary"
              type="submit"
              onClick={onSubmit}
            >
              Post your kit!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContentCreatorUpload;
