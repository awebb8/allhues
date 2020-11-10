import React, { useEffect, useState } from "react";
import Kit from "../components/SingleKit/SingleKit";
import { useParams } from "react-router-dom";
import API from "../utils/API";

const ConsumerViewOne = () => {
  let { id } = useParams();
  const [kit, setKit] = useState({});

  useEffect(() => {
    API.getKit(id).then((res) => {
      console.log(res);
      setKit(res.data);
    });
  }, []);

  return (
    <div>
      <h1>Consumer Views One image here with the products listed</h1>
      <Kit src={kit.imageUrl} />
    </div>
  );
};

export default ConsumerViewOne;
