import React, { useEffect, useState, useContext } from "react";
import Kit from "../components/SingleKit/SingleKit";
import { useParams } from "react-router-dom";
import API from "../utils/API";
import UserContext from "../utils/UserContext";
import UpdateKit from "../components/UpdateKit/UpdateKit";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import "./ConsumerViewOne.css";

import fitz1 from "../assets/images/fitz1.png";
import fitz2 from "../assets/images/fitz2.png";
import fitz3 from "../assets/images/fitz3.png";
import fitz4 from "../assets/images/fitz4.png";
import fitz5 from "../assets/images/fitz5.png";
import fitz6 from "../assets/images/fitz6.png";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Modal from "react-modal";
Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");

  // Place in top-left corner of screen regardless of scroll position.
  textArea.style.position = "fixed";
  textArea.style.top = 0;
  textArea.style.left = 0;

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = "2em";
  textArea.style.height = "2em";

  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = 0;

  // Clean up any borders.
  textArea.style.border = "none";
  textArea.style.outline = "none";
  textArea.style.boxShadow = "none";

  // Avoid flash of white box if rendered for any reason.
  textArea.style.background = "transparent";

  textArea.value = text;

  document.body.appendChild(textArea);

  textArea.select();

  try {
    var successful = document.execCommand("copy");
    var msg = successful ? "successful" : "unsuccessful";
    console.log("Copying text command was " + msg);
    toast.info("Copied to clipboard!", {
      position: "bottom-right",
      autoClose: 2000,
      pauseOnHover: false,
      hideProgressBar: true,
    });
  } catch (err) {
    console.log("Oops, unable to copy");
  }

  document.body.removeChild(textArea);
}

const ConsumerViewOne = () => {
  // Add video modal state management
  const [addVideoModalIsOpen, setAddVideoModalIsOpen] = useState(false);
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

  // const preset = "askckkso";
  const preset = "dklqfpym";
  // const urlVid = "https://api.cloudinary.com/v1_1/dsi7lpcmx/upload";
  const urlVid = "https://api.cloudinary.com/v1_1/dvr1qfvi0/upload";

  const onChangeVideo = (e) => {
    setVideo(e.target.files[0]);
  };

  const postData = async () => {
    const formData = new FormData();
    formData.append("file", video);
    formData.append("upload_preset", preset);
    setVidUploadStatus("Uploading...");
    await Axios.post(urlVid, formData).then((res) => {
      const imageUrl = res.data.secure_url;
      setUploadedVidUrl({ url: imageUrl });

      setPutUrl({ ...putUrl, videoUrl: imageUrl });
    });
  };

  useEffect(() => {
    if (video != "" && video != null) {
      postData();
    }
  }, [video]);

  const handleVideoUploadSubmit = () => {
    if (video.type === "video/mp4") {
      Axios.put(`/api/users/videouploads/${kit.creatorId}`, putUrl)
        .then((res) => {
          console.log(res);
          Axios.put(`/api/vidtokit/${kit._id}`, uploadedVidUrl)
            .then((res) => history.push(`/portal/${id}`))
            .catch((err) => console.log(err));
          // history.push(`/portal/${id}`);
        })
        .catch((err) => console.log(err));
    } else if (video.type === "image/jpeg" || video.type === "image/png") {
      Axios.put(`/api/picuploads/${kit._id}`, uploadedVidUrl)
        .then((res) => history.push(`/viewone/${kit._id}`))
        .catch((err) => console.log(err));
    }
    // history.push(`/portal/${id}`);
    //reset all states
    setAddVideoModalIsOpen(false);
    setPutUrl({
      videoUrl: "",
      title: "",
      description: "",
    });
    setVidUploadStatus("");
  };

  // Delete modal state management
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  // image display management
  const [currentImgToShow, setCurrentImgToShow] = useState("");

  const onCarouselChange = (value) => {
    const imageAndVideoURLs = kit.imageUrl.concat(Object.values(kit.videoUrl));

    console.log(imageAndVideoURLs);

    if (typeof imageAndVideoURLs[value] === "object") {
      setCurrentImgToShow(imageAndVideoURLs[value].url);
    } else {
      setCurrentImgToShow(imageAndVideoURLs[value]);
    }
  };

  let { id } = useParams();
  const userId = useContext(UserContext);

  const [kit, setKit] = useState([]);

  const [update, setUpdate] = useState(false);

  const [save, setSave] = useState({
    kitName: kit.kitName,
    kitDescription: kit.kitDescription,
  });

  const [kitCreatorInfo, setKitCreatorInfo] = useState({});

  useEffect(() => {
    API.getKit(id).then((res) => {
      setKit(res.data);

      console.log(res.data);
      if (typeof res.data.imageUrl[0] === "object") {
        setCurrentImgToShow(res.data.imageUrl[0].url);
      } else {
        setCurrentImgToShow(res.data.imageUrl[0]);
      }

      Axios.put(`/api/kits/uniquevisits/${id}`)
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
      // console.log(res.data);
      API.getPopulatedUsers(res.data.creatorId).then((res) => {
        // console.log("This is the res", res.data);

        setKitCreatorInfo({
          image: res.data[0].image,
          username: res.data[0].userName,
          id: res.data[0]._id,
          name: res.data[0].name,
          role: res.data[0].role,
        });
      });
    });
  }, []);

  const onClickUpdate = () => {
    if (update === true) {
      API.putUpdate(id, save).then((res) => {
        setKit(res.data);
      });
      setUpdate(false);
      toast.info("Saved changes!", {
        position: "bottom-right",
        autoClose: 1500,
        pauseOnHover: false,
        hideProgressBar: true,
      });
    } else {
      setUpdate(true);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSave({ ...save, [name]: value });
  };

  const history = useHistory();

  const onClickDelete = () => {
    API.deleteKit(id).then((res) => {
      history.push(`/portal/${userId.id}`);
    });
  };

  const handleProfileClick = () => {
    console.log("hi");
  };

  const handleAffiliateClick = (e) => {
    const idVal = e.target.getAttribute("id");
    API.updateAffiliateLinkNumbers(idVal)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const determineFitzColorToShow = (val) => {
    if (val === "Fitz1") {
      return (
        <img
          src={fitz1}
          style={{
            height: "1em",
            width: "1em",
            borderRadius: 20,
            marginBottom: 1,
          }}
          alt="light skin tone"
        />
      );
    } else if (val === "Fitz2") {
      return (
        <img
          src={fitz2}
          style={{
            height: "1em",
            width: "1em",
            borderRadius: 20,
            marginBottom: 1,
          }}
          alt="light skin tone"
        />
      );
    } else if (val === "Fitz3") {
      return (
        <img
          src={fitz3}
          style={{
            height: "1em",
            width: "1em",
            borderRadius: 20,
            marginBottom: 1,
          }}
          alt="lightish skin tone"
        />
      );
    } else if (val === "Fitz4") {
      return (
        <img
          src={fitz4}
          style={{
            height: "1em",
            width: "1em",
            borderRadius: 20,
            marginBottom: 1,
          }}
          alt="medium skin tone"
        />
      );
    } else if (val === "Fitz5") {
      return (
        <img
          src={fitz5}
          style={{
            height: "1em",
            width: "1em",
            borderRadius: 20,
            marginBottom: 1,
          }}
          alt="darkish skin tone"
        />
      );
    } else if (val === "Fitz6") {
      return (
        <img
          src={fitz6}
          style={{
            height: "1em",
            width: "1em",
            borderRadius: 20,
            marginBottom: 1,
          }}
          alt="dark skin tone"
        />
      );
    }
  };

  return (
    <>
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-sm-12 col-xs-12 col-md-12 col-lg-3">
            <div style={{ display: "inline-flex" }}>
              <div className="image-holder">
                <img
                  className="avatar"
                  src={kitCreatorInfo && kitCreatorInfo.image}
                  alt="content creator's profile picture"
                  onClick={handleProfileClick}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <div className="text-holder mt-2 ml-1">
                <div
                  style={{
                    whiteSpace: "nowrap",
                    fontSize: 22,
                    letterSpacing: 1,
                  }}
                >
                  @{kitCreatorInfo && kitCreatorInfo.username}
                </div>
                <div
                  className="text-muted"
                  style={{ whiteSpace: "nowrap", fontSize: 14 }}
                >
                  {kitCreatorInfo && kitCreatorInfo.name}
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12 col-sm-12 col-xs-12 col-lg-6">
            <div className="mt-3">
              {update ? (
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="kitName"
                  className="px-5"
                  defaultValue={kit.kitName}
                  style={{
                    letterSpacing: 1.2,
                    fontWeight: 600,
                    fontSize: 26,
                    height: 45,
                    border: "none",
                    border: "2px solid rgb(178,159,181)",
                    borderRadius: 5,
                  }}
                />
              ) : (
                <h3 style={{ letterSpacing: 1.2, fontWeight: 600 }}>
                  <span style={{ marginRight: 10 }}>
                    {determineFitzColorToShow(kit.hueType)}
                  </span>
                  {kit && kit.kitName}
                </h3>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div
              className="img-display-container"
              style={{ position: "relative", width: 400, margin: "0 auto" }}
            >
              <div
                className="text-muted d-flex"
                style={{
                  position: "absolute",
                  bottom: 5,
                  right: -45,
                  fontSize: "small",
                }}
              >
                <i className="ph-eye pr-1" style={{ paddingTop: 3 }}></i>
                {kit.uniqueVisits}
              </div>
              <div style={{ position: "absolute", top: 5, right: -30 }}>
                <a
                  target="_blank"
                  href="https://twitter.com/share?ref_src=twsrc%5Etfw"
                >
                  <svg
                    style={{ cursor: "pointer" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
              </div>
              <div style={{ position: "absolute", top: 45, right: -28 }}>
                <a
                  target="_blank"
                  href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2F${window.location.href}%2F&amp;src=sdkpreparse`}
                >
                  <svg
                    style={{ cursor: "pointer" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
              </div>
              <div style={{ position: "absolute", top: 85, right: -30 }}>
                <img
                  onClick={() => copyTextToClipboard(window.location.href)}
                  className="share-icon"
                  style={{ width: 20, height: 20 }}
                  src="https://ddo0fzhfvians.cloudfront.net/uploads/icons/png/11930121041540882615-512.png"
                />
              </div>
              {userId.id === kit.creatorId ? (
                update ? (
                  <>
                    <div style={{ position: "absolute", top: 125, right: -28 }}>
                      <img
                        className="share-icon"
                        onClick={onClickUpdate}
                        style={{ width: 14, height: 14, cursor: "pointer" }}
                        src="https://www.clipartmax.com/png/middle/320-3206777_svg-library-download-check-mark-svg-png-icon-free-download-sign-check.png"
                      />
                    </div>
                    <div style={{ position: "absolute", top: 165, right: -28 }}>
                      <img
                        className="share-icon"
                        onClick={() => setAddVideoModalIsOpen(true)}
                        style={{
                          width: 14,
                          height: 14,
                          cursor: "pointer",
                        }}
                        src="https://icons-for-free.com/iconfiles/png/512/box+document+outline+share+top+upload+icon-1320195323221671611.png"
                      />
                    </div>
                    <div style={{ position: "absolute", top: 205, right: -28 }}>
                      <img
                        className="share-icon"
                        onClick={() => setDeleteModalIsOpen(true)}
                        style={{
                          width: 14,
                          height: 14,
                          cursor: "pointer",
                        }}
                        src="data:image/png;base64,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"
                      />
                    </div>
                  </>
                ) : (
                  <div style={{ position: "absolute", top: 125, right: -28 }}>
                    <img
                      className="share-icon"
                      onClick={onClickUpdate}
                      style={{ width: 14, height: 14, cursor: "pointer" }}
                      src="https://www.flaticon.com/svg/static/icons/svg/61/61456.svg"
                    />
                  </div>
                )
              ) : (
                ""
              )}
              {currentImgToShow ? (
                currentImgToShow
                  .toString()
                  .slice(currentImgToShow.length - 4) === ".mp4" ? (
                  <video
                    controls
                    style={{ height: 500, width: 400 }}
                    className="video-display"
                  >
                    <source src={currentImgToShow} />
                  </video>
                ) : (
                  <img
                    src={currentImgToShow}
                    className="img-display"
                    style={{
                      height: 500,
                      width: 400,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                )
              ) : (
                <h1>false</h1>
              )}
            </div>

            {kit &&
            kit.imageUrl &&
            kit.imageUrl.length !== 0 &&
            kit.videoUrl &&
            kit.videoUrl.length !== 0 ? (
              <div className="row mt-1">
                <div className="col-lg-12">
                  {kit.imageUrl
                    .concat(Object.values(kit.videoUrl[0]))
                    .map((img, index) => {
                      if (typeof img === "object") {
                        return (
                          <img
                            key={index}
                            id={index}
                            src={img.url}
                            style={{
                              margin: 2,
                              width: 40,
                              height: 40,
                              cursor: "pointer",
                              borderRadius: 3,
                            }}
                            onClick={(e) => onCarouselChange(e.target.id)}
                          />
                        );
                      }

                      const imgType = img.toString().slice(img.length - 4);

                      if (imgType === ".mp4") {
                        return (
                          <img
                            key={index}
                            id={index}
                            src="https://static.thenounproject.com/png/1813969-200.png"
                            style={{
                              margin: 2,
                              width: 40,
                              height: 40,
                              cursor: "pointer",
                              backgroundColor: "rgb(245 245 245)",
                              borderRadius: 3,
                              border: "1px solid rgb(205 205 205)",
                            }}
                            onClick={(e) => onCarouselChange(e.target.id)}
                          />
                        );
                      }
                      return (
                        <img
                          key={index}
                          id={index}
                          src={img}
                          style={{
                            margin: 2,
                            width: 40,
                            height: 40,
                            cursor: "pointer",
                            borderRadius: 3,
                          }}
                          onClick={(e) => onCarouselChange(e.target.id)}
                        />
                      );
                    })}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-lg-4 offset-lg-4 text-muted">
            {update ? (
              <textarea
                onChange={handleInputChange}
                type="text"
                name="kitDescription"
                className="px-1"
                defaultValue={kit.kitDescription}
                style={{
                  fontSize: 16,
                  height: 100,
                  width: 300,
                  border: "none",
                  border: "2px solid rgb(178,159,181)",
                  borderRadius: 5,
                }}
              />
            ) : (
              kit.kitDescription
            )}
          </div>
        </div>

        <div className="row mt-4 mb-4">
          <div className="col-lg-4 offset-lg-4">
            <h3 style={{ fontWeight: 600 }}>Shop this look</h3>
            <hr />
            <div className="text-justify text-nowrap text-truncate">
              {kit.kitItems &&
                kit.kitItems.map((item) => (
                  <div>
                    <span style={{ fontWeight: 600, letterSpacing: 1 }}>
                      {item.makeupCategory}:{" "}
                    </span>
                    <a
                      id={item._id}
                      key={item.affiliateLink}
                      href={item.affiliateLink}
                      onClick={handleAffiliateClick}
                      className="card-text"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.affiliateLink}
                    </a>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* <div style={{width: 300, height: 300}}>
      <Carousel>
        {kit.length !== 0 && kit.imageUrl.map(media => (
          <div>
            <img src={media} className="card-img-top crop" />
          </div>
        ))}
      </Carousel>
      </div> */}

        {/* {update ? (
        <UpdateKit
          src={kit.imageUrl}
          key={kit._id}
          info={kit}
          onClickUpdate={onClickUpdate}
          handleInputChange={handleInputChange}
          kitCreatorInfo={kitCreatorInfo}
        />
      ) : (
        <div>
          <Kit
            src={kit.imageUrl}
            key={kit._id}
            info={kit}
            onClickDelete={onClickDelete}
            onClickUpdate={onClickUpdate}
            kitCreatorInfo={kitCreatorInfo}
          />
        </div>
      )}
      <br /> */}
        <ToastContainer />
        <Modal
          isOpen={deleteModalIsOpen}
          overlayClassName={{
            base: "followers-modal-overlay",
            afterOpen: "followers-modal-overlay--after",
            beforeClose: "followers-modal-overlay--before",
          }}
          onRequestClose={() => setDeleteModalIsOpen(false)}
          closeTimeoutMS={200}
          style={customStyles}
        >
          <h3>Are you sure you want to delete this kit?</h3>
          <p>This action cannot be undone.</p>
          <button
            onClick={() => setDeleteModalIsOpen(false)}
            className="buttons"
          >
            Cancel
          </button>
          <button onClick={onClickDelete} className="delete-button">
            Delete
          </button>
        </Modal>
        <Modal
          isOpen={addVideoModalIsOpen}
          overlayClassName={{
            base: "followers-modal-overlay",
            afterOpen: "followers-modal-overlay--after",
            beforeClose: "followers-modal-overlay--before",
          }}
          onRequestClose={() => setAddVideoModalIsOpen(false)}
          closeTimeoutMS={200}
          style={customStyles}
        >
          <h3>Add a video or image</h3>
          {vidUploadStatus === "Uploading..." ? (
            <label className="buttons">
              Upload
              <input disabled type="file" id="kitImageInput" hidden />
            </label>
          ) : (
            <label className="buttons">
              Upload
              <input
                type="file"
                id="kitImageInput"
                hidden
                onChange={onChangeVideo}
              />
            </label>
          )}
          {putUrl.videoUrl === "" ? (
            <>
              <br />
              <h4>{vidUploadStatus}</h4>
            </>
          ) : (
            <button onClick={handleVideoUploadSubmit} className="buttons">
              Done!
            </button>
          )}
        </Modal>
      </div>
    </>
  );
};

export default ConsumerViewOne;
