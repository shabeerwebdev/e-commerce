import React, { useEffect, useState } from "react";
import painting1 from "../assets/samples/painting1.jpg";
import painting2 from "../assets/samples/painting2.jpg";
import painting3 from "../assets/samples/painting3.jpg";
import painting4 from "../assets/samples/painting4.jpg";
import painting5 from "../assets/samples/painting5.jpg";
import painting6 from "../assets/samples/painting6.jpg";
import painting7 from "../assets/samples/painting7.jpg";
import painting8 from "../assets/samples/painting8.jpg";

function Intro() {
  const imgs = [
    painting1,
    painting2,
    painting3,
    painting4,
    painting5,
    painting6,
    painting7,
    painting8,
    painting1,
    painting2,
    painting3,
    painting4,
    painting5,
    painting6,
    painting7,
    painting8,
    painting1,
    painting2,
    painting3,
    painting4,
    painting5,
    painting6,
    painting7,
    painting8,
    painting1,
    painting2,
    painting3,
    painting4,
    painting5,
    painting6,
    painting7,
    painting8,
  ];
  return (
    <div className="stimu" style={{}}>
      {imgs.map((item, i) => (
        <div key={i} className="img">
          <img src={item} alt="" />
        </div>
      ))}
    </div>
  );
}

export default Intro;
