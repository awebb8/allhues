import React, { useEffect, useState } from "react";
import Kit from "../components/SingleKit/SingleKit";
import { useParams } from "react-router-dom";
import API from "../utils/API";
import UpdateKit from "../components/UpdateKit/UpdateKit";

const ConsumerViewOne = () => {
  let { id } = useParams();
  const [kit, setKit] = useState({});

  const [update, setUpdate] = useState(false);

  const [save, setSave] = useState({
    kitName: kit.kitName,
    kitDescription: kit.kitDescription,
  });


  useEffect(() => {
    API.getKit(id).then((res) => {
      console.log(res);
      setKit(res.data);
    });
  }, []);

  const onClickUpdate = () => {
    if (update === true) {
      API.putUpdate(id, save).then((res) => {
        setKit(res.data);
      })
      setUpdate(false);
    }
    else {
      setUpdate(true);
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSave({...save, [name]:value});
  }

  return (
    <div>
      {update ? <UpdateKit src={kit.imageUrl} info={kit} onClickUpdate={onClickUpdate} handleInputChange={handleInputChange}/> : 
      <div> 
        <Kit src={kit.imageUrl} info={kit} />
        <div style={{textAlign:"center"}}>
          <button className="buttons" onClick={onClickUpdate}>Update</button>
        </div>
      </div> 
      }
      <br/>
    </div>
  );
};

export default ConsumerViewOne;
