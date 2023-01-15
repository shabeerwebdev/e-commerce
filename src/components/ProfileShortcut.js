import React, { useEffect, useRef, useState } from "react";
// import art1 from "../../assets/samples/painting1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../slices/auth";
import { emptyCart } from "../slices/cart";

function ProfileShortcut({ setProfileOpen, arrowSvg }) {
  const { user } = useSelector((state) => state);
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const headerRef = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (!headerRef.current.contains(e.target)) {
        if (e.target === arrowSvg.current) return;
        else setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler, true);
    return () => {
      document.removeEventListener("mousedown", handler, true);
    };
  });

  const hangleAuth = () => {
    if (user.user) {
      setLoad(true);
      setTimeout(() => {
        dispatch(logout());
        dispatch(emptyCart());
        setLoad(false);
      }, 2000);
      setTimeout(() => {
        setProfileOpen(false);
      }, 2500);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else navigate("/auth");
  };

  return (
    <div className="cart-bg profile">
      <div className="cart glass" style={{ width: "15rem" }}>
        <div ref={headerRef} className="items">
          <p style={{ borderBottom: "1px solid #555" }}>
            👋 {""} Hi {""}
            <span style={{ textTransform: "capitalize" }}>
              {user.user?.username || "visitor"}
            </span>
          </p>
          {user.user && (
            <p
              style={{ cursor: "pointer", borderBottom: "1px solid #555" }}
              onClick={() => {
                navigate("/myprofile");
                setProfileOpen(false);
              }}
            >
              🛒 {""} My Purchases
            </p>
          )}
          <button onClick={hangleAuth}>
            {user.user ? `${load ? "Logging out..." : "Logout"}` : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileShortcut;
