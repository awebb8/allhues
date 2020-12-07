import React, { useEffect, useState, useContext } from "react";
import Kit from "../components/SingleKit/SingleKit";
import { useParams } from "react-router-dom";
import API from "../utils/API";
import UserContext from "../utils/UserContext";
import UpdateKit from "../components/UpdateKit/UpdateKit";
import { useHistory } from "react-router-dom";
import Axios from "axios";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const ConsumerViewOne = () => {
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

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-3">
          <img
            className="avatar"
            src={kitCreatorInfo && kitCreatorInfo.image}
            alt="content creator's profile picture"
            onClick={handleProfileClick}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="col-sm-9 mt-2">
          <span
            className="username-handle"
            onClick={handleProfileClick}
            style={{ cursor: "pointer" }}
          >
            {kitCreatorInfo && kitCreatorInfo.name}
          </span>
          <p onClick={handleProfileClick} style={{ cursor: "pointer" }}>
            @{kitCreatorInfo && kitCreatorInfo.username}
          </p>
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
    </div>
  );
};

export default ConsumerViewOne;
