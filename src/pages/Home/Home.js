import React from "react";
import Slider from "../../components/Slider";
import Artists from "./Artists";
import Featured from "./Featured";
import Footer from "./Footer";

function Home() {
  return (
    <div>
      <div className="hero-sec">
        <div className="hero-sec-shadow">
          <p className="head">Welcome to shabeer's painting ecommerce app</p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              width: "fit-content",
            }}
          >
            <button className="fill">Buy / Explore</button>
            <button className="fill">Sell Paintings</button>
          </div>
        </div>
        <div>
          <Slider />
        </div>
      </div>
      <Artists />
      <Featured />
      <Footer />
    </div>
  );
}

export default Home;

// custom-btn btn-11
