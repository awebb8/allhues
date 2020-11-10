import React from 'react';

const UpdateKit = (props) => {
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
              <label htmlFor="kitName">Title: </label>
              <br />
              <input type="text" name="kitName" onChange={props.handleInputChange} defaultValue={props.info.kitName ? props.info.kitName : ""}></input>
            </h5>
            <p className="card-text" style={{ textAlign: "center" }}>
            <label htmlFor="kitDescription">Description: </label>
            <br/>
            <textarea type="text" name="kitDescription" onChange={props.handleInputChange} defaultValue={props.info.kitDescription ? props.info.kitDescription : ""} />
            <br/>
            <button className="buttons" onClick={props.onClickUpdate}>Save</button>
            </p>
            {/* <p className="card-text">
              <small className="text-muted">Last updated 3 mins ago</small>
            </p> */}
          </div>
        </div>
    );
};

export default UpdateKit;