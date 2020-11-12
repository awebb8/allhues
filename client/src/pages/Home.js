import React, { useState, useEffect } from "react";
import Header from '../components/Header/Header';
import MultiKit from '../components/MultiKit/MultiKit';
import API from "../utils/API";

const Home = () => {

    const [kits, setKits] = useState([]);

    const findAll = () => {
        API.getKits().then((res) => {
          console.log(res.data);
          setKits(res.data);
        })
    };

    // Component on mount, retrieve all kits from DB
    useEffect(() => {
        findAll();
    }, []);


    return (
        <div>
            <Header />
            <div className="card rounded-circle fitz" style={{height:"10rem",width:"10rem",backgroundColor:"#f4d0b1"}}></div>
            <div className="card rounded-circle fitz" style={{height:"10rem",width:"10rem",backgroundColor:"#fcdbb2"}}></div>
            <div className="card rounded-circle fitz" style={{height:"10rem",width:"10rem",backgroundColor:"#dea77d"}}></div>
            <div className="card rounded-circle fitz" style={{height:"10rem",width:"10rem",backgroundColor:"#d3925c"}}></div>
            <div className="card rounded-circle fitz" style={{height:"10rem",width:"10rem",backgroundColor:"#936541"}}></div>
            <div className="card rounded-circle fitz" style={{height:"10rem",width:"10rem",backgroundColor:"#694a2e"}}></div>
            <p>There are a million shades of beautiful, but select the one that most closely matches yours.</p>

            <div className="container-fluid" style={{display:"inline!important"}}>
                <div>
                {kits.slice(0,4).map((i) => (
                    <MultiKit key={i._id} src={i.imageUrl} class={i._id} info={i} />
                ))}
                </div>
            </div>
        </div>
    );
};

export default Home;