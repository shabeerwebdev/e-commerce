import React, { useEffect, useState } from "react";
import Slider from "../../components/Slider";
import Artists from "./Artists";
import Featured from "./Featured";
import Footer from "./Footer";

import Intro from "../../components/Intro";

function Home() {
  const [scroll, setScroll] = useState(1);
  useEffect(() => {
    const scrollAmt = (e) => {
      if (window.scrollY * 0.005 > 0.3 && window.scrollY * 0.005 < 5) {
        console.log(window.scrollY * 0.005);
        setScroll(window.scrollY * 0.01);
      }
    };

    window.addEventListener("scroll", scrollAmt);
    return () => window.removeEventListener("scroll", scrollAmt);
  });

  const headerHeight = localStorage.getItem("headerHeight");
  return (
    <div>
      {/* <div className="hero-sec">
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
      </div> */}
      <Intro />
      <div
        className="home-text"
        style={{
          background: `rgb(17, 17, 17, ${0.3 * scroll})`,
          width: "100%",
          minHeight: `100vh`,
          marginTop: "-6rem",
        }}
      ></div>
      <Artists />
      <Featured />
      <Footer />
    </div>
  );
}

export default Home;

// custom-btn btn-11
