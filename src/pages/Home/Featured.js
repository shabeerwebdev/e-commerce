import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import painting1 from "../../assets/samples/painting1.jpg";
import painting2 from "../../assets/samples/painting2.jpg";
import painting3 from "../../assets/samples/painting3.jpg";
import painting4 from "../../assets/samples/painting4.jpg";
import painting5 from "../../assets/samples/painting5.jpg";
import painting6 from "../../assets/samples/painting6.jpg";
import painting7 from "../../assets/samples/painting7.jpg";
import painting8 from "../../assets/samples/painting8.jpg";
import { BASE_URL } from "../../services/auth.service";

function Featured() {
  const arr = [
    painting3,
    painting4,
    painting2,
    painting5,
    // painting8,
    painting7,
  ];
  const [data, setData] = useState([]);
  console.log(data);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          BASE_URL + `/products?limit=6&sort=soldCount,desc`,
          {
            headers: {
              Authorization: "Bearer " + process.env.REACT_APP_API_TOKEN,
            },
          }
        );
        setData(res.data.products);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();

  const navigateTo = (item) => {
    navigate("/paintings/all", {
      state: {
        item,
      },
    });
  };

  const newLoad = new Array(5).fill(0);

  return (
    <div className="featured-sec">
      <div className="stitem">
        <p className="head"> Featured paintings this week</p>
        {data.length > 0 ? (
          <img src={data[5]?.image} alt="" />
        ) : (
          <div className="featured-skeleton">
            <div className="img"></div>
          </div>
        )}
      </div>
      {data.length
        ? data.map(
            (item, i) =>
              i <= 4 && (
                <div key={item._id} className="featured-sec-div">
                  <img src={item.image} alt="" />
                  <p
                    className="featured-sec-center"
                    onClick={() => navigateTo(item)}
                  >
                    View more
                  </p>
                </div>
              )
          )
        : newLoad.map((item) => (
            <div className="featured-skeleton">
              <div className="img"></div>
            </div>
          ))}
    </div>
  );
}

export default Featured;
