import React, { useState, useEffect, useContext } from "react";
import MultiKit from "../components/MultiKit/MultiKit";
// import axios from "axios";
import API from "../utils/API";
import AuthContext from "../utils/AuthContext";

const ConsumerViewAll = () => {
  const [kits, setKits] = useState([]);
  const { jwt } = useContext(AuthContext);
  const [checkbox, setCheckbox] = useState([]);
  //Makes an api call to get all saved image urls so we can show em all
  useEffect(() => {
    API.getKits().then((res) => {
      //   console.log(res.data[0].imageUrl);
      for (let i = 0; i < res.data.length; i++) {
        setKits((kits) => [...kits, res.data[i]]);
      }
    });
  }, []);

  const handleChoiceSubmit = (e) => {
    e.preventDefault();
    console.log(checkbox);
    // const blah = ["www.google.com"];
    //FIXME: figure out how to get this info or state for more than just index
    // postion 1 of kitItems
    setKits(
      kits.filter((kit) => checkbox.includes(kit.kitItems[0].makeupCategory))
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (checkbox.includes(value)) {
      // const name = e.target.getAttribute("name")
      setCheckbox(checkbox.filter((item) => item !== value));
    } else {
      setCheckbox((checkbox) => [...checkbox, value]);
    }
    // setCheckbox((checkbox) => [...checkbox, e.target.value]);
    // for (let i = 0; i < checkbox.length; i++) {
    //   if (checkbox[i] == e.target.value) {
    //     console.log(checkbox[i]);
    //   }
    // }
  };
  // {
  //   if (localStorage.getItem("token") == null) {
  //     return (
  //       <h1 style={{ textAlign: "center", margin: "auto" }}>
  //         Sorry, you've got log in to see this page!
  //       </h1>
  //     );
  //   }
  // }
  return (
    <div>
      {/* <h1>Consumer Views All images here</h1> */}
      <div className="container" style={{ marginBottom: "1%" }}>
        <form className="row">
          <div className="form-check form-check-inline">
            <input
              onChange={handleInputChange}
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox1"
              value="Primer"
            />
            <label className="form-check-label" htmlFor="inlineCheckbox1">
              Primer
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              onChange={handleInputChange}
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox2"
              value="Foundation"
            />
            <label className="form-check-label" htmlFor="inlineCheckbox2">
              Foundation
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              onChange={handleInputChange}
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox3"
              value="Concealer"
            />
            <label className="form-check-label" htmlFor="inlineCheckbox3">
              Concealer
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              onChange={handleInputChange}
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox3"
              value="Eyeshadow"
            />
            <label className="form-check-label" htmlFor="inlineCheckbox3">
              Eyeshadow
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              onChange={handleInputChange}
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox3"
              value="Mascara"
            />
            <label className="form-check-label" htmlFor="inlineCheckbox3">
              Mascara
            </label>
          </div>
          <div className="form-check form-check-inline">
            <button
              type="submit"
              onClick={handleChoiceSubmit}
              className="btn btn-primary btn-sm"
            >
              submit
            </button>
          </div>
        </form>
      </div>
      <div className="container">
        {/* <div className="row"></div> */}
        <div className="row row-cols-1 row-cols-md-2">
          {kits.map((i) => (
            <MultiKit key={i._id} src={i.imageUrl} class={i._id} info={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsumerViewAll;
