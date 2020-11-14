import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header/Header";
import MultiKit from "../components/MultiKit/MultiKit";
import API from "../utils/API";
import { Link } from "react-router-dom";
import UserContext from '../utils/UserContext';

const Home = (props) => {
  const [kits, setKits] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const { id } = useContext(UserContext);

  const findAll = () => {
    API.getKits().then((res) => {
      console.log(res.data);
      setKits(res.data);
    });
  };

  // Component on mount, retrieve all kits from DB
  useEffect(() => {
    findAll();
  }, []);



  useEffect(() => {
    if (favorites.length === 0) {
      API.getUser().then(res => {
        setFavorites(res.data.favorites);
      })
    } else {
      API.putFavorite(id, favorites)
      .then(res => console.log(favorites));
    }
  }, [favorites]);





  return (
    <div>
      <Header />
      <Link
        to={{
          pathname: "/viewall",
          state: { selectedFilterHue: "Fitz1" },
        }}
      >
        <div
          className="card rounded-circle fitz"
          style={{
            height: "10rem",
            width: "10rem",
            backgroundColor: "#f4d0b1",
          }}
        ></div>
      </Link>
      <Link
        to={{
          pathname: "/viewall",
          state: { selectedFilterHue: "Fitz2" },
        }}
      >
        <div
          className="card rounded-circle fitz"
          style={{
            height: "10rem",
            width: "10rem",
            backgroundColor: "#fcdbb2",
          }}
        ></div>
      </Link>
      <Link
        to={{
          pathname: "/viewall",
          state: { selectedFilterHue: "Fitz3" },
        }}
      >
        <div
          className="card rounded-circle fitz"
          style={{
            height: "10rem",
            width: "10rem",
            backgroundColor: "#dea77d",
          }}
        ></div>
      </Link>
      <Link
        to={{
          pathname: "/viewall",
          state: { selectedFilterHue: "Fitz4" },
        }}
      >
        <div
          className="card rounded-circle fitz"
          style={{
            height: "10rem",
            width: "10rem",
            backgroundColor: "#d3925c",
          }}
        ></div>
      </Link>
      <Link
        to={{
          pathname: "/viewall",
          state: { selectedFilterHue: "Fitz5" },
        }}
      >
        <div
          className="card rounded-circle fitz"
          style={{
            height: "10rem",
            width: "10rem",
            backgroundColor: "#936541",
          }}
        ></div>
      </Link>
      <Link
        to={{
          pathname: "/viewall",
          state: { selectedFilterHue: "Fitz6" },
        }}
      >
        <div
          className="card rounded-circle fitz"
          style={{
            height: "10rem",
            width: "10rem",
            backgroundColor: "#694a2e",
          }}
        ></div>
      </Link>
      <p className="mt-3">
        There are a million shades of beautiful, but select the one that most
        closely matches yours.
      </p>
      <br />

      {/* Card to view most popular */}
      <div className="homeCard" style={{ width: "14rem", padding: "5px" }}>
        <img
          src="https://images.unsplash.com/photo-1576877138403-8ec2f82cb1f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
          className="card-img-top"
          alt="view popular"
        />
        <div className="card-body">
          <p className="card-text">
            Check out the looks people are loving the most.
          </p>
          <a href="#" className="buttons">
            View Popular
          </a>
        </div>
      </div>
      <div className="homeCard" style={{ width: "14rem", padding: "5px" }}>
        <img
          src="https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
          className="card-img-top"
          alt="view all"
        />
        <div className="card-body">
          <p className="card-text">
            Look at all the beauty our talented creators have enhanced.
          </p>
          <Link to="/viewall" className="buttons">
            View All
          </Link>
        </div>
      </div>
      <div className="homeCard" style={{ width: "14rem", padding: "5px" }}>
        <img
          src="https://images.unsplash.com/photo-1588367171393-c0f77a14faff?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
          className="card-img-top"
          alt="view all"
        />
        <div className="card-body">
          <p className="card-text">Check out what's been recently posted.</p>
          <br />
          <Link to="/viewall" className="buttons">
            View Recent
          </Link>
        </div>
      </div>

      <br />
      <div className="container-fluid shrink">
        <div className="row row-cols-1 row-cols-md-4">
          {kits.slice(0, 4).map((i) => (
            <MultiKit
              setFavorites={setFavorites} 
              favorites={favorites} 
              filledHeart={i._id}
              key={i._id}
              src={i.imageUrl}
              class={i._id}
              info={i}
            />
          ))}
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default Home;
