import React from "react";
import painting1 from "../../assets/samples/painting1.jpg";
import painting2 from "../../assets/samples/painting2.jpg";
import painting3 from "../../assets/samples/painting3.jpg";
import painting4 from "../../assets/samples/painting4.jpg";
import painting5 from "../../assets/samples/painting5.jpg";
import painting6 from "../../assets/samples/painting6.jpg";
import painting7 from "../../assets/samples/painting7.jpg";
import painting8 from "../../assets/samples/painting8.jpg";

function Featured() {
  const arr = [
    painting3,
    painting4,
    painting2,
    painting5,
    // painting8,
    painting7,
  ];
  return (
    <div className="featured-sec">
      <p className="head"> Featured paintings this week</p>
      {arr.map((src, i) => (
        <div key={i} className="featured-sec-div">
          <img src={src} alt="" />
          <p className="featured-sec-center">Buy Now</p>
        </div>
      ))}
    </div>
  );
}

export default Featured;
