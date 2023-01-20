import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { BASE_URL } from "../services/auth.service";
import { addProduct, removeProduct } from "../slices/cart";
import DetailedDialog from "./DetailedDialog";
import DialogBox from "./DialogBox";

function SinglePainting({
  item,
  openDialog,
  addToWishList,
  list,
  purchasedProducts,
  setShowDialog,
}) {
  console.log(item);
  const { pathname } = useLocation();
  const reg = /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g;

  const { user } = useSelector((state) => state.user);

  const confirmUser = (item) => {
    user ? addToWishList(item) : setShowDialog(true);
  };
  const [load, setLoad] = useState(false);

  const makePayment = async (e) => {
    // if (totalPrice() <= 0) return;
    setLoad(true);

    if (user) {
      const res = await axios
        .post(`${BASE_URL}/checkout/create-checkout-session`, {
          products: [item],
          userId: user._id,
          email: user.email,
        })
        .then((res) => {
          // alert(res.data.payment_status);
          if (res.data.url) {
            window.location.href = res.data.url;
          }
        })
        .catch((error) => {
          alert("Create Stripe checkout:" + error);
        });
      console.log(res, "response mame");
    } else {
      setLoad(false);
      // alert("login");
      // navigate("/auth");
    }
  };

  return (
    <div className="single-card fadeIn">
      <div className="card-img">
        <img onClick={() => openDialog(item)} src={item.image} alt="" />

        {pathname !== "/myprofile" && (
          <p onClick={() => openDialog(item)} className="featured-sec-center">
            Click to view
          </p>
        )}
      </div>
      <div className="details-container">
        <div className="details">
          <h5 className="ellipsis">{item.title}</h5>
          <h5>₹ {item?.price?.toFixed(0).toString().replace(reg, ",")}</h5>
        </div>
        <div className="details">
          <p onClick={() => openDialog(item)} className="desc ellipsis">
            {item.description}
          </p>
          <button
            style={{ cursor: "pointer" }}
            onClick={purchasedProducts.includes(item._id) ? null : makePayment}
          >
            {purchasedProducts.includes(item._id) ? (
              <a
                style={{ color: "white", textDecoration: "none" }}
                href={item.image}
                download={item.image}
              >
                Download
              </a>
            ) : load ? (
              "Loading..."
            ) : (
              "Buy"
            )}
          </button>
        </div>
      </div>

      <div className="abs">
        <p>Sold {item.soldCount || 0} times</p>
        {!purchasedProducts.includes(item._id) && (
          <div onClick={() => confirmUser(item)} className="svg-wrapper">
            <svg
              title="Add to wishlist"
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
        )}
      </div>
    </div>
  );
}

export default SinglePainting;
