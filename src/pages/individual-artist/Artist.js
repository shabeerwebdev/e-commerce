import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../../components/Sidebar";
import profileImg from "../../assets/samples/artist1.jpg";
import sample1 from "../../assets/samples/painting1.jpg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct, emptyCart } from "../../slices/cart";
import DetailedDialog from "../../components/DetailedDialog";
import { useLocation } from "react-router-dom";

function Artist() {
  const { state } = useLocation();

  const [data, setData] = useState([]);
  console.log(data);

  const [dialogData, setDialogData] = useState([]);
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  const list = cart.products.map((item) => item._id);

  const addToWishList = (item) => {
    if (list.includes(item._id)) {
      dispatch(removeProduct(item));
    } else {
      dispatch(addProduct(item));
    }
  };
  const reg = /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_API_URL + "/products",
          {
            headers: {
              Authorization: "Bearer " + process.env.REACT_APP_API_TOKEN,
            },
          }
        );
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const openDialog = (item) => {
    setDialogData(item);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div className="artist-sec">
        <div className="porfile-card">
          <img src={profileImg} alt="" />
          <div className="details">
            <p> Abishek</p>
            <p> Owns 100 paintings</p>
            <p> Sold 38 paintings</p>
          </div>
        </div>

        <div className="painting-cards">
          {data &&
            data.map((item, i) => (
              <div
                onClick={() => openDialog(item)}
                key={item._id}
                className="single-card"
              >
                <div className="card-img">
                  <img src={item.image} alt="" />
                </div>
                <div className="details-container">
                  <div className="details">
                    <h5 className="ellipsis">{item.title}</h5>
                    <h5>
                      ₹ {item.price.toFixed(0).toString().replace(reg, ",")}
                    </h5>
                  </div>
                  <div className="details">
                    <p className="desc ellipsis">{item.description}</p>
                    <button>Buy</button>
                  </div>
                </div>

                <div className="abs">
                  <p>Sold {item.soldCount || 0} times</p>
                  <div
                    onClick={() => addToWishList(item)}
                    className="svg-wrapper"
                  >
                    <svg
                      // ref={newRef}
                      style={{
                        fill: list.includes(item._id) ? "#fff" : null,
                        stroke: list.includes(item._id) ? "#fff" : null,
                      }}
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.9932 5.13581C9.9938 2.7984 6.65975 2.16964 4.15469 4.31001C1.64964 6.45038 1.29697 10.029 3.2642 12.5604C4.89982 14.6651 9.84977 19.1041 11.4721 20.5408C11.6536 20.7016 11.7444 20.7819 11.8502 20.8135C11.9426 20.8411 12.0437 20.8411 12.1361 20.8135C12.2419 20.7819 12.3327 20.7016 12.5142 20.5408C14.1365 19.1041 19.0865 14.6651 20.7221 12.5604C22.6893 10.029 22.3797 6.42787 19.8316 4.31001C17.2835 2.19216 13.9925 2.7984 11.9932 5.13581Z"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <DetailedDialog
          dialogData={dialogData}
          addToWishList={addToWishList}
          list={list}
        />
      </div>
    </div>
  );
}

export default Artist;
//
