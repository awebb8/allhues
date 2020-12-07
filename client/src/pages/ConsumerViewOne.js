import React, { useEffect, useState, useContext } from "react";
import Kit from "../components/SingleKit/SingleKit";
import { useParams } from "react-router-dom";
import API from "../utils/API";
import UserContext from "../utils/UserContext";
import UpdateKit from "../components/UpdateKit/UpdateKit";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import './ConsumerViewOne.css';

import fitz1 from "../assets/images/fitz1.png";
import fitz2 from "../assets/images/fitz2.png";
import fitz3 from "../assets/images/fitz3.png";
import fitz4 from "../assets/images/fitz4.png";
import fitz5 from "../assets/images/fitz5.png";
import fitz6 from "../assets/images/fitz6.png";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");

  // Place in top-left corner of screen regardless of scroll position.
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = '2em';
  textArea.style.height = '2em';

  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = 0;

  // Clean up any borders.
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';

  // Avoid flash of white box if rendered for any reason.
  textArea.style.background = 'transparent';


  textArea.value = text;

  document.body.appendChild(textArea);

  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
    toast.info("Copied to clipboard!", {
      position: 'bottom-right',
      autoClose: 2000,
      pauseOnHover: false,
      hideProgressBar: true
    })
  } catch (err) {
    console.log('Oops, unable to copy');
  }

  document.body.removeChild(textArea);
}

const ConsumerViewOne = () => {
  // image display management
  const [currentImgToShow, setCurrentImgToShow] = useState("");

  const onCarouselChange = (value) => {
    const imageAndVideoURLs = kit.imageUrl.concat(Object.values(kit.videoUrl));

    console.log(imageAndVideoURLs);

    if (typeof imageAndVideoURLs[value] === 'object') {
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
          style={{ height: "1em", width: "1em", borderRadius: 20, marginBottom: 1 }}
          alt="light skin tone"
        />
      );
    } else if (val === "Fitz2") {
      return (
        <img
          src={fitz2}
          style={{ height: "1em", width: "1em", borderRadius: 20, marginBottom: 1 }}
          alt="light skin tone"
        />
      );
    } else if (val === "Fitz3") {
      return (
        <img
          src={fitz3}
          style={{ height: "1em", width: "1em", borderRadius: 20, marginBottom: 1 }}
          alt="lightish skin tone"
        />
      );
    } else if (val === "Fitz4") {
      return (
        <img
          src={fitz4}
          style={{ height: "1em", width: "1em", borderRadius: 20, marginBottom: 1 }}
          alt="medium skin tone"
        />
      );
    } else if (val === "Fitz5") {
      return (
        <img
          src={fitz5}
          style={{ height: "1em", width: "1em", borderRadius: 20, marginBottom: 1 }}
          alt="darkish skin tone"
        />
      );
    } else if (val === "Fitz6") {
      return (
        <img
          src={fitz6}
          style={{ height: "1em", width: "1em", borderRadius: 20, marginBottom: 1 }}
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
              <h3 style={{ letterSpacing: 1.2, fontWeight: 600 }}>
              <span style={{marginRight: 10}}>{determineFitzColorToShow(kit.hueType)}</span>
                {kit && kit.kitName}
              </h3>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="img-display-container" style={{position: 'relative', width: 400, margin: '0 auto'}}>
              <div className="text-muted d-flex" style={{position: 'absolute', bottom: 5, right: -50, fontSize: 'small'}}>
                <i className="ph-eye pr-1" style={{paddingTop: 3}}></i>
                {kit.uniqueVisits}
              </div>
              <div style={{position: 'absolute', top: 5, right: -30 }}>
                <a target="_blank" href="https://twitter.com/share?ref_src=twsrc%5Etfw">
                <svg style={{cursor: 'pointer'}} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
              </div>
              <div style={{position: 'absolute', top: 45, right: -28 }}>
                <a target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2F${window.location.href}%2F&amp;src=sdkpreparse`}>
                <svg style={{cursor: 'pointer'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                </a>
              </div>
              <div style={{position: 'absolute', top: 85, right: -30 }}>
                <img onClick={() => copyTextToClipboard(window.location.href)} className="share-icon" style={{width: 20, height: 20}} src="https://ddo0fzhfvians.cloudfront.net/uploads/icons/png/11930121041540882615-512.png" />
              </div>
              {currentImgToShow ? (
                currentImgToShow
                  .toString()
                  .slice(currentImgToShow.length - 4) === ".mp4" ? (
                  <video controls style={{height: 500, width: 400}} className="video-display">
                    <source src={currentImgToShow} />
                  </video>
                ) : (
                  <img
                    src={currentImgToShow}
                    className="img-display"
                    style={{ height: 500, width: 400, objectFit: "cover", borderRadius: 8 }}
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
                      if (typeof img === 'object') {
                        return (
                          <img
                            key={index}
                            id={index}
                            src={img.url}
                            style={{ margin: 2, width: 40, height: 40, cursor: 'pointer', borderRadius: 3 }}
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
                            style={{ margin: 2, width: 40, height: 40, cursor: 'pointer',backgroundColor: 'rgb(245 245 245)', borderRadius: 3, border: '1px solid rgb(205 205 205)' }}
                            onClick={(e) => onCarouselChange(e.target.id)}
                          />
                        );
                      }
                      return (
                        <img
                          key={index}
                          id={index}
                          src={img}
                          style={{ margin: 2, width: 40, height: 40, cursor: 'pointer', borderRadius: 3 }}
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
            {kit.kitDescription}
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
      </div>
    </>
  );
};

export default ConsumerViewOne;
