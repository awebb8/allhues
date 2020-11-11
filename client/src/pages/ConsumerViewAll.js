import React, { useState, useEffect, useContext } from "react";
import MultiKit from "../components/MultiKit/MultiKit";
import API from "../utils/API";
import AuthContext from "../utils/AuthContext";
import Select from "react-select";
import { options, hueOptions } from '../utils/selectOptions';

const ConsumerViewAll = () => {
  const [kits, setKits] = useState([]);
  const [filterKits, setFilterKits] = useState([]);
  const { jwt } = useContext(AuthContext);
  const [checkbox, setCheckbox] = useState([]);
  //Makes an api call to get all saved image urls so we can show em all

  const findAll = () => {
    API.getKits().then((res) => {
      console.log(res.data);
      setKits(res.data);
      setFilterKits(res.data);
    });
  };

  useEffect(() => {
    findAll();
  }, []);

  const handleChoiceSubmit = (e) => {
    e.preventDefault();
    // console.log(checkbox);

    if (checkbox.length === 0) {
      findAll();
    }
    var results = [];
    for (let i = 0; i < kits.length; i++) {
      for (let j = 0; j < kits[i].kitItems.length; j++) {
        if (checkbox.includes(kits[i].kitItems[j].makeupCategory)) {
          if (!results.includes(kits[i])) {
            results.push(kits[i]);
          }
        }
      }
    }
    setFilterKits(results);
    // setKits(
    //   kits.filter((kit) => checkbox.includes(kit.kitItems[0].makeupCategory))
    // );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (checkbox.includes(value)) {
      // const name = e.target.getAttribute("name")
      setCheckbox(checkbox.filter((item) => item !== value));
    } else {
      setCheckbox((checkbox) => [...checkbox, value]);
    }
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


  const handleFilterChange = (event) => {
    if(!event || event.length === 0) {
      setFilterKits(kits);
    } else {
      const selectedFilters = event.map(category => category.value);

      let results = [];
      for (let i = 0; i < kits.length; i++) {
        for (let j = 0; j < kits[i].kitItems.length; j++) {
          if (selectedFilters.includes(kits[i].kitItems[j].makeupCategory)) {
            if (!results.includes(kits[i])) {
              results.push(kits[i]);
            }
          }
        }
      }
      setFilterKits(results);
    }
    
    
  }









  return (
    <div>
      <div
        className="container"
        style={{ marginBottom: "1%", fontSize: "0.82rem" }}
      >
        <div className="row mt-3">
          <div className="col-sm-6">
          <Select
            options={options}
            onChange={handleFilterChange}
            placeholder="Filter by Product"
            isClearable
            isMulti
          />
          </div>
        </div>
        {/* <form className="row">
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
              id="inlineCheckbox4"
              value="Eyeshadow"
            />
            <label className="form-check-label" htmlFor="inlineCheckbox4">
              Eyeshadow
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              onChange={handleInputChange}
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox5"
              value="Mascara"
            />
            <label className="form-check-label" htmlFor="inlineCheckbox5">
              Mascara
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              onChange={handleInputChange}
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox6"
              value="Eyeliner"
            />
            <label className="form-check-label" htmlFor="inlineCheckbox6">
              Eyeliner
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              onChange={handleInputChange}
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox7"
              value="Mascara"
            />
            <label className="form-check-label" htmlFor="inlineCheckbox7">
              Mascara
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              onChange={handleInputChange}
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox8"
              value="Lip Colors"
            />
            <label className="form-check-label" htmlFor="inlineCheckbox8">
              Lip Colors
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              onChange={handleInputChange}
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox9"
              value="Highlighter"
            />
            <label className="form-check-label" htmlFor="inlineCheckbox9">
              Highlighter
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              onChange={handleInputChange}
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox10"
              value="Bronzer"
            />
            <label className="form-check-label" htmlFor="inlineCheckbox10">
              Bronzer
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              onChange={handleInputChange}
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox11"
              value="Blush"
            />
            <label className="form-check-label" htmlFor="inlineCheckbox11">
              Blush
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              onChange={handleInputChange}
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox12"
              value="Eyebrow Pencil/Powder"
            />
            <label className="form-check-label" htmlFor="inlineCheckbox12">
              Eyebrow Pencil/Powder
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
        </form> */}
      </div>
      <div className="container-fluid">
        {/* <div className="row"></div> */}
        <div className="row row-cols-1 row-cols-md-3">
          {filterKits.map((i) => (
            <MultiKit key={i._id} src={i.imageUrl} class={i._id} info={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsumerViewAll;
