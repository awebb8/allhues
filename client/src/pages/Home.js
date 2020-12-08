import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import MultiKit from "../components/MultiKit/MultiKit";
import API from "../utils/API";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../utils/UserContext";
import useDidMountEffect from "../utils/useDidMountEffect";

const Home = (props) => {
  const [kits, setKits] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const history = useHistory();

  const { id } = useContext(UserContext);

  const findAll = () => {
    API.getKits().then((res) => {
      // console.log(res.data);
      setKits(res.data);
    });
  };

  // Component on mount, retrieve all kits from DB
  useEffect(() => {
    findAll();
  }, []);

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
      API.putFavorite(id, favorites).then((res) => {
        // console.log("put");
      });
    } else {
      history.push("/login");
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
          className="rounded-circle fitz"
          style={{
            height: "10rem",
            width: "10rem",
            display: "inline-block",
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
          className="rounded-circle fitz"
          style={{
            height: "10rem",
            width: "10rem",
            display: "inline-block",
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
          className="rounded-circle fitz"
          style={{
            height: "10rem",
            width: "10rem",
            display: "inline-block",
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
          className="rounded-circle fitz"
          style={{
            height: "10rem",
            width: "10rem",
            display: "inline-block",
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
          className="rounded-circle fitz"
          style={{
            height: "10rem",
            width: "10rem",
            display: "inline-block",
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
          className="rounded-circle fitz"
          style={{
            height: "10rem",
            width: "10rem",
            display: "inline-block",
            backgroundColor: "#694a2e",
          }}
        ></div>
      </Link>

      <p className="mt-3">
        Select a hue to filter by products that look great on your unique skin
      </p>
      <br />
      <hr />

      <div className="container">
        <div className="row">
          <div className="col-md-4 col-xs-12" align="center" style={{padding:0}}>
            <div
              className="homeCard"
              style={{ width: "14rem", padding: "5px" }}
            >
              <img
                src="https://images.unsplash.com/photo-1576877138403-8ec2f82cb1f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                className="card-img-top"
                alt="view popular"
              />
              <div className="card-body">
                <p className="card-text">
                  Check out the looks people are loving the most.
                </p>
                <Link
                  className="buttons"
                  to={{
                    pathname: "/viewall",
                    state: { fromPopularBtn: true },
                  }}
                >
                  View Popular
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-xs-12" align="center" style={{padding:0}}>
            <div
              className="homeCard"
              style={{ width: "14rem", padding: "5px" }}
            >
              <img
                src="https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                className="card-img-top"
                alt="view all"
              />
              <div className="card-body">
                <p className="card-text">
                  Browse all looks to find the one...
                </p>
                <Link to="/viewall" className="buttons">
                  View All
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-xs-12" align="center" style={{padding:0}}>
            <div
              className="homeCard"
              style={{ width: "14rem", padding: "5px" }}
            >
              <img
                src="https://images.unsplash.com/photo-1588367171393-c0f77a14faff?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
                className="card-img-top"
                alt="view all"
              />
              <div className="card-body">
                <p className="card-text">
                  Check out what's been recently posted...
                </p>
                <br />
                <Link
                  to={{
                    pathname: "/viewall",
                    state: { fromNewBtn: true },
                  }}
                  className="buttons"
                >
                  View Recent
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />
      <br />

      <hr />

      <div className="container-fluid">
        <h1 className="featured-looks-text">Featured Looks</h1>
        <div className="row mk-row" style={{margin: 0, padding: 0}}>
          {kits.slice(0, 3).map((i) => (
            <div key={i._id} style={{margin: 0, padding: 0}} className="shrink col-lg-4 col-md-4 col-xs-12" align="center">
            <MultiKit
              setFavorites={setFavorites}
              favorites={favorites}
              filledHeart={i._id}
              src={i.imageUrl}
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

export default Home;
