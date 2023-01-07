import React, { useContext, useEffect, useRef, useState } from "react";
import art1 from "../../assets/samples/painting1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart, removeProduct } from "../../slices/cart";
import { loadStripe } from "@stripe/stripe-js";
import userService from "../../services/user.service";
import { BASE_URL } from "../../services/auth.service";
import axios from "axios";
import authHeader from "../../services/auth-header";

function Cart({ openCart, setCartOpen, iconRef }) {
  const closeRef = useRef();

  const { cart } = useSelector((state) => state);
  const { user } = useSelector((state) => state);

  const TOKEN = user.user.accessToken;

  const { email } = user?.user;

  console.log(email, "user");
  const dispatch = useDispatch();

  const reg = /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g;

  useEffect(() => {
    const cartDom = closeRef.current;
    const iconDom = closeRef.current;

    const handleClick = (e) => {
      // console.log(e.target !== cartDom);
      // if (e.target !== cartDom && e.target === iconDom) {
      //   setCartOpen((prev) => !prev);
      // }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  const totalPrice = () => {
    const allPrice = cart.products.map((item) => item.price);
    return allPrice.reduce((i, j) => i + j, 0);
  };

  const handlePayment = async () => {
    try {
      const result = await axios.post(
        "http://localhost:8800/api/checkout/create-order",
        {
          userId: user.user._id,
          products: [],
          amount: cart.total + "00",
        },
        {
          headers: { token: `Bearer ${TOKEN}` },
        }
      );
      const { amount, id: order_id } = result.data;

      const options = {
        key: "rzp_test_7TqdKPPKCPVAAk", // Enter the Key ID generated from the Dashboard
        amount: amount.toString(),
        currency: "INR",
        name: "Toonland",
        description: "Test Transaction",
        image: "https://toonland.in/assets/logo.png",
        order_id: order_id,

        handler: async function (response) {
          const result = await axios.post(
            "http://localhost:8800/api/checkout/pay-order",
            {
              amount: amount,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            },
            {
              headers: { token: `Bearer ${TOKEN}` },
            }
          );
          // result.status === 200 ? Navigate("/practise") : Navigate("/");
          if (result.status === 200) {
            // alert("succ");
            // navigate("/prchpds");
            dispatch(emptyCart());
            // try {
            //   userRequest.put(`users/${currentUser._id}/purchasedProducts`, {
            //     prchdPrd: productIds,
            //   });
            // } catch (err) {
            //   console.log(err, "asw");
            // }
          }
          // console.log(result.data.msg, "result.data.msg");
        },

        prefill: {
          name: "Mentoons Developer",
          email: "mentoonsdeveloper@gmail.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#f00",
        },
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.open();

      // navigate("/home");

      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
    } catch (err) {
      // console.log(err);
      if (user.user === null) {
        alert("Pls login to purchase");
      }
    }
  };

  const [sessionId, setSessionId] = useState();

  const makePayment = async (e) => {
    e.preventDefault();
    const stripe = await loadStripe(
      "pk_test_51MKOjUSA9KTwl2nFhZEu6ZMFmxyTDJp8UHrHn0FD0M2Mw59Dz32IjFYRWAovvsZSWd6hmH3IxEOj8NcIUF4WW0Xt00YxSMOmJB"
    );

    // const order = await axios.post(
    //   "http://localhost:8800/api/checkout/create-order",
    //   {
    //     userId: user.user._id,
    //     products: cart.products,
    //     amount: cart.total + "00",
    //   },
    //   {
    //     headers: { token: `Bearer ${TOKEN}` },
    //   }
    // );
    // const { amount, id: order_id } = order.data;

    // console.log(amount, order_id, "here");

    const body = { products: cart.products, userId: user.user._id };

    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .post("http://localhost:8800/api/checkout/create-checkout-session", {
        products: cart.products,
        userId: user.user._id,
        email: user.user.email,
      })
      .then((res) => {
        console.log(res, "res baby");
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((error) => {
        // console.error(error);
        alert("Create Stripe checkout:" + error);
      });

    // const session = await response.json();

    // console.log(session);
    // alert(session);

    // session && localStorage.setItem("sessionId", JSON.stringify(session));

    // const result = stripe.redirectToCheckout({
    //   sessionId: session.id,
    // });

    // if (result.error) {
    //   console.log(result.error);
    // }

    // // const parsedId = localStorage.getItem("sessionId").id;
    // const body2 = {
    //   enabled_events: ["payment_intent.succeeded"],
    // };

    // await fetch("http://localhost:8800/api/checkout/webhook", {
    //   method: "POST",
    //   headers: headers,
    //   body: body2,
    // });
  };

  // const sessionIdParsed = JSON.parse(localStorage.getItem("sessionId"));

  return (
    <div className="cart-bg">
      <div ref={closeRef} className="cart glass">
        <div className="items">
          <p>You've {cart.products.length} items in cart</p>
        </div>

        {cart.products.map((item) => (
          <div key={item._id} className="individual-item">
            <img src={item.image || art1} alt="" />
            <div className="desc">
              <p className="ellipsis">{item.title}</p>
              <p className="credits">By - {item.drawnBy}</p>
              <p className="bought">Sold {item.soldCount || 0} times</p>
            </div>
            <div className="remove">
              <p className="price">
                ₹ {item?.price?.toFixed(0).toString().replace(reg, ",")}
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
          {/* Checkout {"    "} ₹34 */}
          {/* <div className="checkout-btn">Cancel</div> */}
          <div onClick={makePayment} className="checkout-btn">
            ₹ {totalPrice().toString().replace(reg, ",")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
