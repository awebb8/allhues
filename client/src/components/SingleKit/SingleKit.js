import React, { useContext } from "react";
import "./SingleKit.css";
import UserContext from "../../utils/UserContext";

const Kit = (props) => {
<<<<<<< HEAD
  return (
    <div className="card">
      <img
        src={
          props.src === undefined ? "http://via.placeholder.com/200" : props.src
        }
        className="card-img-top"
        alt="makeup kit"
      />
      <div className="card-body">
        <h5 className="card-title" style={{ textAlign: "center" }}>
          {props.info.kitName ? props.info.kitName : ""}
        </h5>
        <p className="card-text" style={{ textAlign: "center" }}>
          {props.info.kitDescription ? props.info.kitDescription : ""}
        </p>
        {/* <p className="card-text">
=======
	const { id } = useContext(UserContext);

	{
		if (id == props.info.creatorId) {
			return (
				<div className="card">
					<img
						src={
							props.src === undefined
								? "http://via.placeholder.com/200"
								: props.src
						}
						className="card-img-top"
						alt="..."
					/>
					<div className="card-body">
						<h5 className="card-title" style={{ textAlign: "center" }}>
							{props.info.kitName ? props.info.kitName : ""}
						</h5>
						<p className="card-text" style={{ textAlign: "center" }}>
							{props.info.kitDescription ? props.info.kitDescription : ""}
						</p>
						<p className="card-text">
							<small className="text-muted">Last updated 3 mins ago</small>
						</p>
					</div>
				</div>
			);
		}
	}

	return (
		<div className="card">
			<img
				src={
					props.src === undefined ? "http://via.placeholder.com/200" : props.src
				}
				className="card-img-top"
				alt="..."
			/>
			<div className="card-body">
				<h5 className="card-title" style={{ textAlign: "center" }}>
					{props.info.kitName ? props.info.kitName : ""}
				</h5>
				<p className="card-text" style={{ textAlign: "center" }}>
					{props.info.kitDescription ? props.info.kitDescription : ""}
				</p>
				{/* <p className="card-text">
>>>>>>> 2ae8c4770e1612ac856b24f6b49996df2e7af483
          <small className="text-muted">Last updated 3 mins ago</small>
        </p> */}
			</div>
		</div>
	);
};

export default Kit;
