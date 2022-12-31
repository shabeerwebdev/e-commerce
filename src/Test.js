import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "./test.css";
import painting1 from "./assets/samples/painting1.jpg";
import painting2 from "./assets/samples/painting2.jpg";
import painting3 from "./assets/samples/painting3.jpg";
import painting4 from "./assets/samples/painting4.jpg";
import painting5 from "./assets/samples/painting5.jpg";
import painting6 from "./assets/samples/painting6.jpg";
import painting7 from "./assets/samples/painting7.jpg";
import painting8 from "./assets/samples/painting8.jpg";

function Test() {
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

  // const [data, setData] = useState([]);
  // console.log(data.data?.data[4].attributes);
  // console.log(data.data?.data[4]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await axios.get(
  //         process.env.REACT_APP_API_URL + "/paintings?populate=*",
  //         {
  //           headers: {
  //             Authorization: "bearer " + process.env.REACT_APP_API_TOKEN,
  //           },
  //         }
  //       );
  //       setData(data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   fetchData();
  // }, []);
  return (
    <div>
      <div className="stimu" style={{}}>
        {imgs.map((item, i) => (
          <div key={i} className="img">
            <img src={item} alt="" />
          </div>
        ))}
      </div>
      <div className="cos">
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
      </div>
      {/* <div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
        <div>Here is new content</div>
      </div> */}
    </div>
  );
}

export default Test;
