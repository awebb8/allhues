import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import MultiKit from "../components/MultiKit/MultiKit";
import API from "../utils/API";
import AuthContext from "../utils/AuthContext";
import Select from "react-select";
import { options, hueOptions, sortOptions } from "../utils/selectOptions";
import RoleContext from "../utils/roleContext";

const ConsumerViewAll = () => {
  // Array of all kits, this is used to true up the filterKits array when filter is cleared
  const [kits, setKits] = useState([]);
  // Array of filtered kits, this is used to render the kits on the page
  const [filterKits, setFilterKits] = useState([]);
  //TODO: We can probably get rid of JWT here since it's not being used anywhere on the page, and the page is not going to be protected
  const { jwt } = useContext(AuthContext);
  const { role } = useContext(RoleContext);
  const history = useHistory();

  //Makes an api call to get all saved image urls so we can show em all
  const findAll = () => {
    API.getKits()
      .then((res) => {
        console.log(res.data);
        setKits(res.data);
        setFilterKits(res.data);
      })
      .catch((err) => {
        localStorage.clear();
        history.push("/login");
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
      setFilterKits(filterKits.filter((kit) => kit.hueType === selectedHue));
    }
  };

  const handleSortChange = (e) => {
    console.log(e);
    if (!e) {
      setFilterKits(kits);
    } else if (e.value == "Popularity") {
      const newSortedArray = [...filterKits].sort(
        (a, b) => b.uniqueVisits - a.uniqueVisits
      );
      setFilterKits(newSortedArray);
    } else if (e.value == "Trending") {
      // TODO: figure out what to do here instead of same as popularity
      const newSortedArray = [...filterKits].sort(
        (a, b) => b.uniqueVisits - a.uniqueVisits
      );
      setFilterKits(newSortedArray);
    } else if (e.value == "New") {
      // const arr = [...fil];

      const newSortedArray = [...filterKits]
        .sort((a, b) => {
          return (
            new Date(a.createdDate).getTime() -
            new Date(b.createdDate).getTime()
          );
        })
        .reverse();

      setFilterKits(newSortedArray);
    } else if ((e.target = "Yours")) {
      console.log(e.target);
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
        <div className="row row-cols-4">
          <Select
            options={sortOptions}
            onChange={handleSortChange}
            placeholder="Sort by..."
            isClearable
          />
        </div>

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
