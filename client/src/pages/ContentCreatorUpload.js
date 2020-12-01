import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AddedAffiliateLink from "../components/AddedAffiliateLink/AddedAffiliateLink";
import API from "../utils/API";
// import AuthContext from "../utils/AuthContext";
import UserContext from "../utils/UserContext";
import Select from "react-select";
import { options, hueOptions, uploadTypeOptions } from "../utils/selectOptions";
import useDidMountEffect from "../utils/useDidMountEffect";

const styles = {
  imageUploadContainer: {
    border: "8px dashed #B29FB5",
    borderRadius: "5px",
    padding: "70px",
    height: "170px",
  },
};

const ContentCreatorUpload = () => {
  const history = useHistory();
  // States
  const [image, setImage] = useState("");

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
  const [uploadType, setUploadType] = useState("Kit");

  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState();
  const [videoEl, setVideoEl] = useState("none");
  const [putUrl, setPutUrl] = useState({
    videoUrl: "",
    title: "",
    description: "",
  });
  const [vidUploadStatus, setVidUploadStatus] = useState("");

  // useEffect
  useEffect(() => {
    setKit({ ...kit, creatorId: id });
  }, []);

  useEffect(() => {
    if (kit.imageUrl) {
      API.postKit(id, kit);
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

  const handleAddKitItem = (e) => {
    e.preventDefault();
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

  const handleTypeSelector = (e) => {
    if (e == null) {
      setUploadType("Kit");
    } else {
      setUploadType(e.value);
    }
  };

  const onChangeVideo = (e) => {
    setVideo(e.target.files[0]);
  };

  const url = "https://api.cloudinary.com/v1_1/dsi7lpcmx/image/upload";
  const preset = "askckkso";
  const urlVid = "https://api.cloudinary.com/v1_1/dsi7lpcmx/upload";

  const postData = async () => {
    const formData = new FormData();
    formData.append("file", video);
    formData.append("upload_preset", preset);
    setVidUploadStatus("Uploading video...");
    axios.post(urlVid, formData).then((res) => {
      const imageUrl = res.data.secure_url;

      setPutUrl({ ...putUrl, videoUrl: imageUrl });
    });
  };

  const handleVideoUploadSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`/api/users/videouploads/${id}`, putUrl)
      .then((res) => {
        console.log(res);
        history.push("/videos");
      })
      .catch((err) => console.log(err));
  };
  // useDidMountEffect(() => {
  //   axios
  //     .put(`/api/users/videouploads/${id}`, putUrl)
  //     .then((res) => {
  //       console.log(res);
  //       history.push("/videos");
  //     })
  //     .catch((err) => console.log(err));
  // }, [putUrl.videoUrl]);

  useDidMountEffect(() => {
    if (video != "") {
      postData();
    }
  }, [video]);

  const onSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", preset);
    try {
      const res = await axios.post(url, formData);
      const imageUrl = res.data.secure_url;

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

  if (uploadType === "Kit") {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 offset-sm-3">
            {/* <h1 className="mb-3 mt-3 text-center">Create a Kit</h1> */}
            <h2 className="text-center mb-3 mt-3">Create a Kit</h2>
            <Select
              options={uploadTypeOptions}
              placeholder="Select upload type"
              onChange={handleTypeSelector}
            />
            <br />
            <form>
              <div
                className="input-group mb-3"
                style={styles.imageUploadContainer}
              >
                <div className="custom-file d-flex justify-content-center flex-column">
                  <label className="buttons" style={styles.uploadButton}>
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

                {/* <input type="checkbox" style={{ display: "inline" }} /> */}
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
                  className="buttons btn-sm ml-2 py-0"
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
                      value={
                        makeupCategory === ""
                          ? false
                          : { label: makeupCategory, value: makeupCategory }
                      }
                    />
                  </div>
                </div>

                {/* </div> */}
              </div>

              {loading ? (
                <button
                  className="buttons"
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
                  className="buttons"
                  type="button"
                  onClick={onSubmit}
                  disabled={
                    !image ||
                    kit.kitName === "" ||
                    kit.hueType === "" ||
                    kit.kitItems.length === 0
                  }
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
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 offset-sm-3">
          {/* <h1 className="mb-3 mt-3 text-center">Create a Kit</h1> */}
          <h2 className="text-center mb-3 mt-3">Upload a Video</h2>
          <Select
            options={uploadTypeOptions}
            placeholder="Select upload type"
            // defaultValue="Kit"
            onChange={handleTypeSelector}
          />
          <br />
          <form>
            <input type="file" onChange={onChangeVideo} />
            {/* <label htmlFor="title">Title</label> */}
            <input
              placeholder="title"
              name="title"
              type="text"
              value={putUrl.title}
              onChange={(e) =>
                setPutUrl({
                  ...putUrl,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <input
              placeholder="description"
              type="text"
              name="description"
              value={putUrl.description}
              onChange={(e) =>
                setPutUrl({
                  ...putUrl,
                  [e.target.name]: e.target.value,
                })
              }
            />
            {putUrl.videoUrl === "" ? (
              <p>{vidUploadStatus}</p>
            ) : (
              <button onClick={handleVideoUploadSubmit} className="buttons">
                Done!
              </button>
            )}
            {/* <button onClick={handleVideoUploadSubmit} className="buttons">
              Done!
            </button> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContentCreatorUpload;
