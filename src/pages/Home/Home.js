import React, { useEffect, useState } from "react";
import Slider from "../../components/Slider";
import Artists from "./Artists";
import Featured from "./Featured";
import Footer from "./Footer";
import DialogBox from "../../components/DialogBox";
import Intro from "../../components/Intro";
import { Link } from "react-router-dom";

function Home() {
  const [scroll, setScroll] = useState(1);
  useEffect(() => {
    const scrollAmt = (e) => {
      if (window.scrollY * 0.005 > 0.3 && window.scrollY * 0.005 < 4) {
        // console.log(window.scrollY * 0.005);
        setScroll(window.scrollY * 0.01);
      }
    };

    window.addEventListener("scroll", scrollAmt);
    return () => window.removeEventListener("scroll", scrollAmt);
  });

  // counter

  useEffect(() => {
    const counters = document.querySelectorAll(".counter");

    console.log(counters);

    counters.forEach((counter) => {
      // function to increment the counter
      function updateCount() {
        const target = +counter.getAttribute("data-count");
        const count = +counter.innerHTML;

        // const inc = Math.floor((target - count) / 10);
        const inc = 1;

        if (count < target && inc > 0) {
          counter.innerHTML = count + inc;
          // repeat the function
          setTimeout(updateCount, 100);
        }
        // if the count not equal to target, then add remaining count
        else {
          counter.innerHTML = target;
        }
      }
      updateCount();
    });
  });

  const [showDialog, setShowDialog] = useState(false);

  const displayTxt = () => {
    return (
      <div>
        <p style={{ color: "#00f" }}>
          You can download all our paintings for free with details <br />
          4242 4242 4242 4242 Date-12/50 CVV-111
        </p>
        <br />
        <p style={{ color: "#555" }}>
          Buymyart is a MERN stack project. The payment is done by stripe. This
          project involves most of the crucial concepts of web development DOM
          Manipulation, event capturing, Hooks, State management, Authentication
          and Authorization, Stripe webhooks and many more.
        </p>
        <br />
        <a
          style={{ fontFamily: "GatterSans" }}
          target="_blank"
          rel="noreferrer"
          href="https://shabeer.vercel.app"
        >
          About Developer
        </a>
      </div>
    );
  };

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
          background: `rgb(17, 17, 17, ${0.7 * scroll})`,
          // background: rgba(0, 0, 0, 0.6);
          width: "100%",
          minHeight: `100vh`,
          marginTop: "-6rem",
        }}
      >
        <div className="home-text-p">
          <h4>
            Buymyart is an E-commerce platform with self evaluated{" "}
            <span style={{ color: "#d7fc70" }}>⋆⋆⋆</span> ranking system for
            paintings and artists, ensuring a good UX for users to choose from
            the best. With more than{" "}
            <span
              style={{ color: "#d7fc70" }}
              className="counter"
              data-count="15"
            >
              0
            </span>
            ⁺ artists and{" "}
            <span
              style={{ color: "#d7fc70" }}
              className="counter"
              data-count="50"
            >
              {" "}
              0
            </span>
            ⁺ artworks.
            {/* Artists can showcase their artworks and list it for sale. */}
            {/* Users can download all the artworks for free using card details 4242
          4242 4242 4242 , 12/50, 111. Do not enter your real card details this
          is my project btw. */}
          </h4>
          <p
            style={{ marginTop: "3rem", cursor: "pointer" }}
            onClick={() => {
              setShowDialog(true);
            }}
          >
            Free download <span>ℹ</span>
          </p>
        </div>
      </div>
      <Artists />
      <Featured />
      <Footer />
      {/* <DialogBox /> */}
      {showDialog && (
        <DialogBox displayTxt={displayTxt} setShowDialog={setShowDialog} />
      )}
    </div>
  );
}

export default Home;

// custom-btn btn-11
