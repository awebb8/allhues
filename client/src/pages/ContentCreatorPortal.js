import Axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import SingleKit from "../components/SingleKit/SingleKit";
import AuthContext from "../utils/AuthContext";
import UserContext from "../utils/UserContext";

const ContentCreatorPortal = () => {
  const [yourKits, setYourKits] = useState([]);
  const [kits, setKits] = useState([]);
  const { setJwt, jwt } = useContext(AuthContext);
  const { id, setId } = useContext(UserContext);
  //   const [user,setUser]=useState({})
  // const
  useEffect(() => {
    Axios.get("/api/users").then((res) => {
      //   console.log(res.data[0].kits);
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].kits.length > 0) {
          setYourKits((yourKits) => [...yourKits, res.data[i]]);
        }
      }
      setJwt(localStorage.getItem("token"));
      //   for (let i=0; i<yourKits.length;i++){

      //   }
      // if(yourKits)
    });
  }, []);
  console.log(yourKits);
  return (
    <div>
      <h1>This is the contentCreator Portal Page.</h1>
      {/* <SingleKit src={yourKits} /> */}
      {yourKits.map((kit) => (
        <SingleKit src={kit.kits[0].imageUrl} />
      ))}
    </div>
  );
};

export default ContentCreatorPortal;
