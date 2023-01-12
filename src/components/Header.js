import React, { useContext, useEffect, useRef, useState } from "react";
import logo from "../assets/images/logo.png";
import avatar from "../assets/images/avatar.png";
import Cart from "../pages/Home/Cart";
import Wishlist from "../pages/Home/Wishlist";
import { useSelector } from "react-redux";
import ProfileShortcut from "./ProfileShortcut";
import { ReactComponent as ArrowDown } from "../assets/icons/chevron-down.svg";

function Header() {
  const headerRef = useRef();
  
  const [openCart, setCartOpen] = useState(false);
  const [openProfile, setProfileOpen] = useState(false);

  const { cart } = useSelector((state) => state);

  useEffect(() => {
    const height = headerRef.current?.clientHeight;
    localStorage.setItem("headerHeight", height);
  });

  const iconRef = useRef();

  return (
    <div ref={headerRef} className="header">
      <img className="logo" src={logo} alt="logo" />
      <div className="header-components">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.2rem",
            color: "white",
            fontSize: "0.7rem",
          }}
        >
          <svg
            ref={iconRef}
            className="down"
            onClick={() => setCartOpen((prev) => !prev)}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.0004 9V6C16.0004 3.79086 14.2095 2 12.0004 2C9.79123 2 8.00037 3.79086 8.00037 6V9M3.59237 10.352L2.99237 16.752C2.82178 18.5717 2.73648 19.4815 3.03842 20.1843C3.30367 20.8016 3.76849 21.3121 4.35839 21.6338C5.0299 22 5.94374 22 7.77142 22H16.2293C18.057 22 18.9708 22 19.6423 21.6338C20.2322 21.3121 20.6971 20.8016 20.9623 20.1843C21.2643 19.4815 21.179 18.5717 21.0084 16.752L20.4084 10.352C20.2643 8.81535 20.1923 8.04704 19.8467 7.46616C19.5424 6.95458 19.0927 6.54511 18.555 6.28984C17.9444 6 17.1727 6 15.6293 6L8.37142 6C6.82806 6 6.05638 6 5.44579 6.28984C4.90803 6.54511 4.45838 6.95458 4.15403 7.46616C3.80846 8.04704 3.73643 8.81534 3.59237 10.352Z"
              strokeWidth="2"
              strokewinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span style={{ border: 0, fontWeight: 600 }}>
            {cart.products.length || 0}
          </span>
        </div>
        <span></span>
        <div className="avatar">
          <img src={avatar} alt="avatar" />
          <ArrowDown onClick={() => setProfileOpen((p) => !p)} />
        </div>
      </div>

      {openProfile && <ProfileShortcut  />}
      {openCart && (
        <Cart iconRef={iconRef} openCart={openCart} setCartOpen={setCartOpen} />
      )}
    </div>
  );
}

export default Header;
