import React, { useState, useEffect, useContext } from "react";
// import { useHistory } from "react-router-dom";
import MultiKit from "../components/MultiKit/MultiKit";
import API from "../utils/API";
// import AuthContext from "../utils/AuthContext";
import useDidMountEffect from "../utils/useDidMountEffect";
import Select from "react-select";
import { options, hueOptions, sortOptions } from "../utils/selectOptions";
// import RoleContext from "../utils/roleContext";
import UserContext from "../utils/UserContext";
import { useHistory } from "react-router-dom";

const ConsumerViewAll = (props) => {
  // Array of all kits, this is used to true up the filterKits array when filter is cleared
  const [kits, setKits] = useState([]);
  const [favorites, setFavorites] = useState([]);
  // Array of filtered kits, this is used to render the kits on the page
  const [filterKits, setFilterKits] = useState([]);
  const history = useHistory();

  const [selectedFilterProducts, setSelectedFilterProducts] = useState([]);
  const [selectedFilterHue, setSelectedFilterHue] = useState("");
  const [fromPopularBtn, setFromPopularBtn] = useState(false);
  const [fromNewBtn, setFromNewBtn] = useState(false);

  const { id } = useContext(UserContext);
  // const history = useHistory();

  //Makes an api call to get all saved image urls so we can show em all

  const findAll = () => {
    if (fromPopularBtn) {
      API.getKits().then((res) => {
        setKits(res.data);
        setFilterKits(res.data.sort((a, b) => b.uniqueVisits - a.uniqueVisits));
      });
    } else if (fromNewBtn) {
      API.getKits().then((res) => {
        setKits(res.data);
        setFilterKits(
          res.data
            .sort((a, b) => {
              return (
                new Date(a.createdDate).getTime() -
                new Date(b.createdDate).getTime()
              );
            })
            .reverse()
        );
      });
    } else {
      API.getKits()
        .then((res) => {
          setKits(res.data);
          setFilterKits(res.data);
        })
        .catch((err) => {
          // localStorage.clear();
          // history.push("/login");
          console.log(err);
        });
    }
  };

  useEffect(() => {
    findAll();
  }, [fromPopularBtn]);

  useEffect(() => {
    findAll();
  }, [fromNewBtn]);

  useEffect(() => {
    if (favorites) {
      API.getUser()
        .then((res) => {
          // console.log(res.data);
          if (res.data) {
            setFavorites(res.data.favorites);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useDidMountEffect(() => {
    if (id) {
      API.putFavorite(id, favorites)
        .then((res) => {
          // console.log("put");
        })
        .catch((err) => console.log(err));
    } else {
      history.push("/login");
    }
  }, [favorites]);

  // Component on mount, retrieve all kits from DB
  useEffect(() => {
    findAll();
  }, []);

  useEffect(() => {
    if (
      props &&
      props.location &&
      props.location.state &&
      props.location.state.selectedFilterHue
    ) {
      // console.log("Props Location STate");
      // console.log(props.location.state);
      setSelectedFilterHue(props.location.state.selectedFilterHue);
    } else if (
      props &&
      props.location &&
      props.location.state &&
      props.location.state.fromPopularBtn
    ) {
      // console.log("Props Location STate");
      // console.log(props.location.state);
      setFromPopularBtn(props.location.state.fromPopularBtn);
    } else if (
      props &&
      props.location &&
      props.location.state &&
      props.location.state.fromNewBtn
    ) {
      // console.log("Props Location STate");
      // console.log(props.location.state);
      setFromNewBtn(props.location.state.fromNewBtn);
    } else {
      // console.log("No state found in props");
      setSelectedFilterHue("");
    }
  }, [props.location.state]);

  // Filters kits based on products selected
  const handleCategoryFilterChange = (event) => {
    // Check to see if event is null or event array is empty, if so (this means that user cleared filters) setFilterKits back to original kits array that was retrieved on component mount
    if (!event || event.length === 0) {
      if (selectedFilterHue.length) {
        filterByHue(undefined, kits);
      } else {
        setFilterKits(kits);
      }
      setSelectedFilterProducts([]);
    } else {
      // Returns an array of products that user selected
      const selectedFilters = event.map((category) => category.value);
      setSelectedFilterProducts(selectedFilters);
      // Filter logic
      filterByProduct(selectedFilters);
    }
  };

  // Function that filters by product and sets filterKit to a filtered array
  // If no argument is passed in, the function will use the state array of selectedFilterProducts
  const filterByProduct = (
    selectedFilters = selectedFilterProducts,
    kitsArray = filterKits
  ) => {
    // Don't even try asking me how I got this to work....
    const results = [];
    for (let i = 0; i < kitsArray.length; i++) {
      let match = 0;
      for (let j = 0; j < kitsArray[i].kitItems.length; j++) {
        for (let k = 0; k < selectedFilters.length; k++) {
          if (kitsArray[i].kitItems[j].makeupCategory === selectedFilters[k]) {
            match++;
          }
        }
      }
      if (match >= selectedFilters.length) {
        results.push(kitsArray[i]);
      }
    }
    setFilterKits(results);
  };

  // Filters kits based on hue type selected
  const handleHueFilterChange = (event) => {
    // Check to see if event is null, if so (this means that the user cleared filters)
    if (!event) {
      // Now check to see if selectedFilterProducts is empty or not - if not empty, call filterByProduct(), otherwise setFilterKits back to OG kits
      if (selectedFilterProducts.length) {
        filterByProduct(undefined, kits);
      } else {
        setFilterKits(kits);
      }
      setSelectedFilterHue("");
    } else {
      // Returns value of selected hue
      const selectedHue = event.value;
      setSelectedFilterHue(selectedHue);

      filterByHue(selectedHue);
    }
  };

  const filterByHue = (
    selectedHue = selectedFilterHue,
    kitArray = filterKits
  ) => {
    setFilterKits(kitArray.filter((kit) => kit.hueType === selectedHue));
  };

  const handleSortChange = (e) => {
    // console.log(e);
    if (!e) {
      //FIXME: yeah this shit doesnt work....
      if (selectedFilterProducts.length && selectedFilterHue.length) {
        const go = async () => {
          await filterByProduct(undefined, kits);
          // console.log("Done filtering by product");
          await filterByHue();
          // console.log("Done filtering by hue");
        };

        go();
      } else if (selectedFilterProducts.length) {
        filterByProduct(undefined, kits);
      } else if (selectedFilterHue.length) {
        filterByHue(undefined, kits);
      } else {
        setFilterKits(kits);
      }
    } else if (e.value === "Popularity") {
      const newSortedArray = [...filterKits].sort(
        (a, b) => b.uniqueVisits - a.uniqueVisits
      );
      setFilterKits(newSortedArray);
    } else if (e.value === "Trending") {
      // TODO: figure out what to do here instead of same as popularity
      const newSortedArray = [...filterKits].sort(
        (a, b) => b.uniqueVisits - a.uniqueVisits
      );
      setFilterKits(newSortedArray);
    } else if (e.value === "New") {
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
    } //else if ((e.target = "Yours")) {
    //   console.log(e.target);
    // }
  };

  const determineLabel = () => {
    switch (selectedFilterHue) {
      case "Fitz1":
        return hueOptions[0].label;
      case "Fitz2":
        return hueOptions[1].label;
      case "Fitz3":
        return hueOptions[2].label;
      case "Fitz4":
        return hueOptions[3].label;
      case "Fitz5":
        return hueOptions[4].label;
      case "Fitz6":
        return hueOptions[5].label;
    }
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      border: '1px solid #CCCCCC',
      boxShadow: 'none',
      '&:hover': {
        border: '1px solid #B2A0B4',
    }

    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled
          ? null
          : isSelected
          ? '#B2A0B4'
          : isFocused
          ? 'rgb(207, 190, 209, 0.3)'
          : null,
      }}
  };



  return (
    <div>
      <div
        className="container"
        style={{ marginBottom: "1%", fontSize: "0.82rem" }}
      >
        <div className="row mt-3">
          <div className="col-sm-4">
            <Select
              options={sortOptions}
              onChange={handleSortChange}
              placeholder="Sort by..."
              isClearable
              styles={customStyles}
            />
          </div>
          <div className="col-sm-4">
            <Select
              options={options}
              onChange={handleCategoryFilterChange}
              placeholder="Filter by Product"
              isClearable
              isMulti
              styles={customStyles}
            />
          </div>
          <div className="col-sm-4">
            <Select
              options={hueOptions}
              onChange={handleHueFilterChange}
              value={
                selectedFilterHue === ""
                  ? false
                  : { label: determineLabel(), value: selectedFilterHue }
              }
              placeholder="Filter by Hue"
              isClearable
              styles={customStyles}
            />
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row cva-row">
          {filterKits
            .filter((kit) => {
              if (selectedFilterProducts === undefined) {
                // console.log("elephant");
              } else if (selectedFilterHue) {
                return kit.hueType === selectedFilterHue;
              } else {
                return true;
              }
              return true;
            })
            .map((i) => (
              <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
              <MultiKit
                setFavorites={setFavorites}
                favorites={favorites}
                key={i._id}
                src={i.imageUrl}
                filledHeart={i._id}
                class={i._id}
                info={i}
              />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ConsumerViewAll;
