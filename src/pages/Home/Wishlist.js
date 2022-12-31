import React from "react";
import art1 from "../../assets/samples/painting1.jpg";

function Wishlist() {
  return (
    <div className="cart glass">
      <div className="items">
        <p>Total items 3</p>
      </div>
      <div className="individual-item">
        <img src={art1} alt="" />
        <div className="desc">
          <p>Fire in the hole</p>
          <p className="credits">by Abishek</p>
          <p className="bought">Bought 23 times</p>
        </div>
        <div className="remove">
          <p className="price">₹34</p>
          <svg
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
      <div className="checkout">
        {/* <div className="checkout-btn">Cancel</div> */}
        <div className="checkout-btn">Checkout ₹34</div>
      </div>
    </div>
  );
}

export default Wishlist;
