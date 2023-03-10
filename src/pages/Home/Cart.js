import React, { useEffect, useRef, useState } from "react";
import art1 from "../../assets/samples/painting1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct } from "../../slices/cart";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../services/auth.service";

function Cart({ openCart, setCartOpen, iconRef, setShowDialog }) {
  const [load, setLoad] = useState(false);
  const { products } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();

  const reg = /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g;

  const closeRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (!closeRef.current.contains(e.target)) {
        if (e.target === iconRef.current) return;
        else setCartOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const totalPrice = () => {
    const allPrice = products.map((item) => item.price);
    return allPrice.reduce((i, j) => i + j, 0);
  };

  const navigate = useNavigate();

  const makePayment = async (e) => {
    if (totalPrice() <= 0) return;
    setLoad(true);
    if (user.user) {
      alert("Use 4242 4242 4242 4242 12/50 111 for free purchase of paintings!");
      const res = await axios
        .post(`${BASE_URL}/checkout/create-checkout-session`, {
          products,
          userId: user.user._id,
          email: user.user.email,
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
      setCartOpen(false);
      setShowDialog(true);
      // navigate("/auth");
    }
  };

  return (
    <div className="cart-bg">
      <div ref={closeRef} className="cart glass">
        <div className="items">
          <p>You've {products.length} items in cart</p>
        </div>

        {products.map((item) => (
          <div key={item._id} className="individual-item">
            <img src={item.image || art1} alt="" />
            <div className="desc">
              <p className="ellipsis">{item.title}</p>
              <p className="credits">By - {item.drawnBy}</p>
              <p className="bought">Sold {item.soldCount || 0} times</p>
            </div>
            <div className="remove">
              <p className="price">
                ??? {item?.price?.toFixed(0).toString().replace(reg, ",")}
              </p>
              <svg
                onClick={() => dispatch(removeProduct(item))}
                className="remove-item"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 3H15M3 6H21M19 6L18.2987 16.5193C18.1935 18.0975 18.1409 18.8867 17.8 19.485C17.4999 20.0118 17.0472 20.4353 16.5017 20.6997C15.882 21 15.0911 21 13.5093 21H10.4907C8.90891 21 8.11803 21 7.49834 20.6997C6.95276 20.4353 6.50009 20.0118 6.19998 19.485C5.85911 18.8867 5.8065 18.0975 5.70129 16.5193L5 6M10 10.5V15.5M14 10.5V15.5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        ))}

        <div className="checkout">
          <div onClick={makePayment} className="checkout-btn">
            {load
              ? "Loading..."
              : "???" + totalPrice().toString().replace(reg, ",")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
