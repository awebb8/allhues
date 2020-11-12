import Axios from "axios";
import React, { useEffect, useState, useContext } from "react";
// import AuthContext from "../utils/AuthContext";
import UserContext from "../utils/UserContext";
import MultiKit from "../components/MultiKit/MultiKit";
// import Kit from "../components/SingleKit/SingleKit";

const ContentCreatorPortal = () => {
  const [yourKits, setYourKits] = useState([]);
  // const [kits, setKits] = useState([]);
  // const { setJwt, jwt } = useContext(AuthContext);
  const { id } = useContext(UserContext);

  const getKits = () => {
    Axios.get(`/api/users/${id}`).then((res) => {
      console.log("component did mount2");
      console.log(res.data.kits);

      setYourKits(res.data[0].kits);
    });
  };

  useEffect(() => {
    getKits();
  }, []);

  useEffect(() => {
    getKits();
  }, [id]);

  // console.log(yourKits);
  if (!yourKits) {
    getKits();

    // if (yourKits.length < 3 || (yourKits.length > 3 && yourKits.length < 6)) {
    //   return (
    //     <div className="container">
    //       <div className="row">
    //         {yourKits.map((kit) => (
    //           <MultiKit
    //             key={kit._id}
    //             class={kit._id}
    //             src={kit.imageUrl}
    //             info={kit}
    //           />
    //         ))}
    //       </div>
    //     </div>
    //   );
    // }
  }
  if (yourKits) {
    return (
      <div>
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
