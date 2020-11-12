import React, { useState, useEffect, useContext } from "react";
import MultiKit from "../components/MultiKit/MultiKit";
import API from "../utils/API";
import AuthContext from "../utils/AuthContext";
import Select from "react-select";
import { options, hueOptions } from "../utils/selectOptions";

const ConsumerViewAll = () => {
  // Array of all kits, this is used to true up the filterKits array when filter is cleared
  const [kits, setKits] = useState([]);
  // Array of filtered kits, this is used to render the kits on the page
  const [filterKits, setFilterKits] = useState([]);
  //TODO: We can probably get rid of JWT here since it's not being used anywhere on the page, and the page is not going to be protected
  const { jwt } = useContext(AuthContext);

  //Makes an api call to get all saved image urls so we can show em all
  const findAll = () => {
    API.getKits().then((res) => {
      console.log(res.data);
      setKits(res.data);
      setFilterKits(res.data);
    });
  };

  // Component on mount, retrieve all kits from DB
  useEffect(() => {
    findAll();
  }, []);

  // Filters kits based on products selected
  const handleCategoryFilterChange = (event) => {
    // Check to see if event is null or event array is empty, if so (this means that user cleared filters) setFilterKits back to original kits array that was retrieved on component mount
    if (!event || event.length === 0) {
      setFilterKits(kits);
    } else {
      // Returns an array of products that user selected
      const selectedFilters = event.map((category) => category.value);

      // Filter logic
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
      
      // Finally, setFilterKits to the new results array (aka filtered kits)
      setFilterKits(results);
    }
  };

  // Filters kits based on hue type selected
  const handleHueFilterChange = (event) => {
    // Check to see if event is null, if so (this means that the user cleared filters) setFilterKits back to original kits array that was retrieved on component mount
    if (!event) {
      setFilterKits(kits);
    } else {
      // Returns value of selected hue
      const selectedHue = event.value;

      // setFilterKits to a filtered down array of kits that include the selectedHue
      setFilterKits(filterKits.filter(kit => kit.hueType === selectedHue));
    }
  };

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
              onChange={handleCategoryFilterChange}
              placeholder="Filter by Product"
              isClearable
              isMulti
            />
          </div>
          <div className="col-sm-6">
          <Select
              options={hueOptions}
              onChange={handleHueFilterChange}
              placeholder="Filter by Hue"
              isClearable
            />
          </div>
        </div>
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
