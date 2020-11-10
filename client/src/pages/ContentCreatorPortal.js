import Axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import SingleKit from "../components/SingleKit/SingleKit";
import AuthContext from "../utils/AuthContext";
import UserContext from "../utils/UserContext";
import MultiKit from "../components/MultiKit/MultiKit";

const ContentCreatorPortal = () => {
	const [yourKits, setYourKits] = useState([]);
	const [kits, setKits] = useState([]);
	const { setJwt, jwt } = useContext(AuthContext);
	const { id, setId } = useContext(UserContext);

	useEffect(() => {
		Axios.get(`/api/users/${id}`).then((res) => {
			console.log("component did mount2");
			console.log(res.data.kits);

			setYourKits(res.data[0].kits);
		});
	}, [id]);

<<<<<<< HEAD
  console.log(yourKits);
  return (
    <div>
      <h1>This is the contentCreator Portal Page.</h1>
      <div className="container">
        {/* <div className="row"></div> */}
        <div className="row row-cols-1 row-cols-md-2">
          {yourKits.map((kit) => (
            <MultiKit src={kit.imageUrl} info={kit} class={kit._id} />
          ))}
        </div>
      </div>
    </div>
  );
=======
	console.log(yourKits);
	return (
		<div>
			<h1>This is the contentCreator Portal Page.</h1>
			<div className="container">
				{/* <div className="row"></div> */}
				<div className="row row-cols-1 row-cols-md-2">
					{yourKits.map((kit) => (
						<MultiKit class={kit._id} src={kit.imageUrl} info={kit} />
					))}
				</div>
			</div>
		</div>
	);
>>>>>>> 2ae8c4770e1612ac856b24f6b49996df2e7af483
};

export default ContentCreatorPortal;
