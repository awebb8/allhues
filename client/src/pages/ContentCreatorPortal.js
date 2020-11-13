import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
// import AuthContext from "../utils/AuthContext";
import UserContext from "../utils/UserContext";
import RoleContext from "../utils/roleContext";
import MultiKit from "../components/MultiKit/MultiKit";
import ProfileCard from "../components/ProfileCard/ProfileCard";
// import NameContext from "../utils/NameContext";
// import Kit from "../components/SingleKit/SingleKit";

const ContentCreatorPortal = () => {
  const [yourKits, setYourKits] = useState([]);
  // const [kits, setKits] = useState([]);
  // const { setJwt, jwt } = useContext(AuthContext);
  const { id } = useContext(UserContext);

  const getKits = () => {
    axios.get(`/api/users/${id}`).then((res) => {
      console.log("component did mount2");
      console.log(res.data.kits);

      setYourKits(res.data[0].kits);
    });
  };

  useEffect(() => {
    getKits();
  }, [id]);

  // console.log(yourKits);
  const { role } = useContext(RoleContext);
  // const { name } = useContext(NameContext);

  if (role === "Consumer") {
    return (
      <>
        <ProfileCard />
      </>
    );
  }

  if (yourKits) {
    if (yourKits.length < 3 || (yourKits.length > 3 && yourKits.length < 6)) {
      return (
        <>
          <ProfileCard />
          <div className="container">
            <div className="row">
              {yourKits.map((kit) => (
                <MultiKit
                  key={kit._id}
                  class={kit._id}
                  src={kit.imageUrl}
                  info={kit}
                />
              ))}
            </div>
          </div>
        </>
      );
    }
    return (
      <div>
        <ProfileCard />

        {/* <h1>This is the contentCreator Portal Page.</h1> */}
        <div className="container-fluid" style={{ marginBottom: "150px" }}>
          {/* <div className="row"></div> */}
          <div className="row row-cols-1 row-cols-md-3">
            {yourKits.map((kit) => (
              <MultiKit
                key={kit._id}
                class={kit._id}
                src={kit.imageUrl}
                info={kit}
              />
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <h1>Error retrieving your kits</h1>
      </>
    );
  }
};

export default ContentCreatorPortal;
