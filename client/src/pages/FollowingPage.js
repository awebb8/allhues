import React, { useContext, useEffect, useState } from "react";
import API from "../utils/API";
import useDidMountEffect from "../utils/useDidMountEffect";
import FollowMulti from "../components/FollowMulti/FollowMulti";
import UserContext from "../utils/UserContext";

const FollowingPage = () => {
  const [allPpl, setAllPpl] = useState([]);
  const [pplFollowed, setPplFollowed] = useState([]);
  const [followedInfo, setFollowedInfo] = useState([]);
  const { id } = useContext(UserContext);

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

  return (
    <div>
      {/* <p>following</p> */}
      {followedInfo.map((i) => (
        <div className="container" key={i._id}>
          <p>{i.name}</p>
          {/* <p>{i.kits[0].kitName}</p> */}

          {i.kits.map((j) => (
            <FollowMulti key={j._id} info={j} />
          ))}
          <br />
        </div>
      ))}
    </div>
  );
};

export default FollowingPage;
