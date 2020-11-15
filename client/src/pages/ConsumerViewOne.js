import React, { useEffect, useState, useContext } from "react";
import Kit from "../components/SingleKit/SingleKit";
import { useParams } from "react-router-dom";
import API from "../utils/API";
import UserContext from "../utils/UserContext";
import UpdateKit from "../components/UpdateKit/UpdateKit";
import { useHistory } from "react-router-dom";
import Axios from "axios";

const ConsumerViewOne = () => {
  let { id } = useParams();
  const userId = useContext(UserContext);

  const [kit, setKit] = useState({});

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
        .then((res) => {
        })
        .catch((err) => {
          console.log(err);
        });

      API.getPopulatedUsers(res.data.creatorId).then(res => {
        console.log("This is the res", res.data);
        setKitCreatorInfo({image: res.data[0].image, username: res.data[0].userName, id: res.data[0]._id});
      })
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
      console.log("kit deleted");
      history.push(`/portal/${userId.id}`);
    });
  };

  return (
    <div>
      {update ? (
        <UpdateKit
          src={kit.imageUrl}
          info={kit}
          onClickUpdate={onClickUpdate}
          handleInputChange={handleInputChange}
          kitCreatorInfo={kitCreatorInfo}
        />
      ) : (
        <div>
          <Kit
            src={kit.imageUrl}
            info={kit}
            onClickDelete={onClickDelete}
            onClickUpdate={onClickUpdate}
            kitCreatorInfo={kitCreatorInfo}
          />
        </div>
      )}
      <br />
    </div>
  );
};

export default ConsumerViewOne;
