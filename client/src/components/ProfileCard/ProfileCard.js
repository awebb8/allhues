import React, { useContext, useEffect, useState } from "react";
import "./profilecard.css";
// import RoleContext from "../../utils/roleContext";
import UserContext from "../../utils/UserContext";
import axios from "axios";
import API from "../../utils/API";
import { useHistory, Link } from "react-router-dom";
import useDidMountEffect from "../../utils/useDidMountEffect";
import FollowMulti from "../FollowMulti/FollowMulti";

// Import Modal for the Followers Modal
import Modal from "react-modal";
Modal.setAppElement("#root");

const ProfileCard = (props) => {
  const history = useHistory();

  // Followers Modal
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleCloseBtnClick = () => {
    setModalIsOpen(false);
  };
  const handleFollowersBtnClick = () => {
    setModalIsOpen(true);
  };

  // ---------- Followers Modal content ----------
  const [allPeople, setAllPeople] = useState([]);
  const [peopleFollowing, setPeopleFollowing] = useState([]);
  const [followerInfo, setFollowerInfo] = useState([]);

  useEffect(() => {
    API.getAllUsers()
      .then((res) => {
        setAllPeople(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useDidMountEffect(() => {
    let arr = allPeople.filter((i) => i._id === id);
    setPeopleFollowing(arr[0].followers);
  }, [allPeople]);

  useDidMountEffect(() => {
    // let arr =allPeople.filter(i=>i._id )
    let arr = [];
    for (let i = 0; i < allPeople.length; i++) {
      for (let k = 0; k < peopleFollowing.length; k++) {
        if (allPeople[i]._id === peopleFollowing[k].id) {
          //   console.log("mathc");
          arr.push(allPeople[i]);
        }
      }
    }
    setFollowerInfo(arr);
    // console.log(arr);
  }, [peopleFollowing]);

  const handleProfileChange = (i) => {
    history.push(`/portal/${id}`);
    // console.log(followerInfo);
  };
  // ---------------------------------------------

  // ---------- Following Modal content ----------
  const [allPpl, setAllPpl] = useState([]);
  const [pplFollowed, setPplFollowed] = useState([]);
  const [followedInfo, setFollowedInfo] = useState([]);

  useEffect(() => {
    API.getAllUsers()
      .then((res) => {
        setAllPpl(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useDidMountEffect(() => {
    let arr = allPpl.filter((i) => i._id === id);
    setPplFollowed(arr[0].following);
  }, [allPpl]);

  useDidMountEffect(() => {
    // let arr =allPpl.filter(i=>i._id )
    let arr = [];
    for (let i = 0; i < allPpl.length; i++) {
      for (let k = 0; k < pplFollowed.length; k++) {
        if (allPpl[i]._id === pplFollowed[k].id) {
          //   console.log("mathc");
          arr.push(allPpl[i]);
        }
      }
    }
    setFollowedInfo(arr);
    // console.log(arr);
  }, [pplFollowed]);
  // ---------------------------------------------

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
  const [affilLinkClicks, setAffilLinkClicks] = useState(0);
  // const [clickedInfo, setClickedInfo] = useState("");

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

  //TODO: don't think we need this cuz of what we have in props
  // const showPersonsFollowerNumber = (iterVal) => {
  //   if (id != props.userProfileInfo._id) {
  //     let me = iterVal.filter((t) => t._id === props.userProfileInfo._id);
  //     // console.log(me);
  //     setNumberOfFollowers(me[0].followers.length);
  //   }
  // };

  // TODO: might not need this or the below api call due to props info
  const showMyFollowerNumberAndDisableBtnIfFollowed = (iterVal) => {
    for (let i = 0; i < iterVal.length; i++) {
      if (iterVal[i]._id == id) {
        const numbOfFoll = iterVal[i].followers.length;
        if (id === props.userProfileInfo._id) {
          setNumberOfFollowers(numbOfFoll);
        }

        if (
          iterVal[i].following
            .map((j) => j.id == props.userProfileInfo._id)
            .includes(true)
        ) {
          setAlrdyFollowed(true);
        }
      }
    }
  };

  useDidMountEffect(() => {
    setImage(props.userProfileInfo.image);
    setUsersName(props.userProfileInfo.name);
    setFollowInfo({ ...followInfo, id: props.userProfileInfo._id });

    setNumberOfFollowers(props.userProfileInfo.followers.length);

    //Crappy api route name but jsut gets all contentCreators
    API.getAllUsers()
      .then((res) => {
        let iterVal = res.data;

        // showPersonsFollowerNumber(iterVal);

        showMyFollowerNumberAndDisableBtnIfFollowed(iterVal);
      })
      .catch((err) => console.log(err));
  }, [props.userProfileInfo]);

  useDidMountEffect(() => {
    const urKits = props.yourKits;
    let numbba = 0;
    for (let i = 0; i < urKits.length; i++) {
      for (let j = 0; j < urKits[i].kitItems.length; j++) {
        numbba = numbba + urKits[i].kitItems[j].linkClicks;
      }
    }
    setAffilLinkClicks(numbba);
  }, [props.yourKits]);

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
    let numb = numberOfFollowers;

    setNumberOfFollowers(numb + 1);
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

  const handleUnfollowClick = () => {
    // const alrdyFollowed
    setAlrdyFollowed(false);
    let numb = numberOfFollowers;

    setNumberOfFollowers(numb - 1);
    const payload = {
      id,
    };
    axios
      .put(`/api/unfollow/${id}`, followInfo)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
    axios
      .put(`/api/unfollowers/${followInfo.id}`, payload)
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
                {alrdyFollowed || !id ? (
                  <button
                    onClick={handleUnfollowClick}
                    className="btn btn-rounded btn-info"
                    // disabled
                  >
                    <i className="fa fa-minus"></i>
                    <span>Unfollow</span>
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

                {!id ? (
                  <button className="btn btn-rounded btn-info" disabled>
                    <i className="fa fa-comment"></i>
                    <span>Message</span>
                  </button>
                ) : (
                  <button className="btn btn-rounded btn-info">
                    <i className="fa fa-comment"></i>
                    <span>Message</span>
                  </button>
                )}
              </div>
              <div className="profile-cover__info">
                <ul className="nav">
                  <li>
                    <strong>{numberOfFollowers}</strong>
                    Followers
                  </li>
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
                    <a onClick={handleFollowersBtnClick}>
                      <span>Followers</span>
                    </a>
                  </li>
                ) : (
                  <Link to="/following">
                    <li>
                      <strong>{props.userProfileInfo.following.length}</strong>
                      Following
                    </li>
                  </Link>
                )}
                <li>
                  <strong>{affilLinkClicks}</strong>
                  Affiliate Link Clicks
                </li>

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

      <Modal
        isOpen={modalIsOpen}
        className="followers-modal-content"
        overlayClassName="followers-modal-overlay"
      >
        <div>
          <h2>Followers</h2>
          <hr />
          <form>
            {/* Show followers */}
            <div>
              {followerInfo.map((i) => (
                <div className="container" key={i._id}>
                  <p>
                    <a id={i._id} onClick={handleProfileChange}>
                      {i.name}
                    </a>
                    <br />
                    {i.userName}
                  </p>
                  {/* <p>{i.kits[0].kitName}</p> */}

                  {/* {i.kits.map((j) => (
            <FollowMulti key={j._id} info={j} />
          ))} */}
                  <br />
                </div>
              ))}
            </div>
            <hr />

            <h2>Following</h2>
            <hr />
            {/* Show following */}
            <div>
              {followedInfo.map((i) => (
                <div className="container" key={i._id}>
                  <p>
                    {i.name}
                    <br />
                    {i.userName}
                  </p>
                  {/* <p>{i.kits[0].kitName}</p> */}

                  {/* {i.kits.map((j) => (
            <FollowMulti key={j._id} info={j} />
          ))} */}
                  <br />
                </div>
              ))}
            </div>

            <button
              className="buttons shadow-none py-0 px-2 text-muted"
              onClick={handleCloseBtnClick}
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                color: "black",
                backgroundColor: "white",
                border: "none",
              }}
            >
              <h3>&times;</h3>
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ProfileCard;
