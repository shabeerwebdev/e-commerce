import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function DialogBox({ setShowDialog }) {
  const navigate = useNavigate();
  const headerRef = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (!headerRef.current.contains(e.target)) {
        setShowDialog(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [setShowDialog]);
  return (
    <div className="cart-bg">
      <div
        ref={headerRef}
        className="dialogbox"
        style={{ background: "white", color: "black", padding: "4rem" }}
      >
        Please login to purchase
        <div onClick={() => navigate("/auth")}>Login Now </div>
      </div>
    </div>
  );
}

export default DialogBox;
