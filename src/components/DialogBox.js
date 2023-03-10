import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function DialogBox({ setShowDialog, displayTxt }) {
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
        <p
          style={{
            position: "absolute",
            top: "1.4rem",
            right: "1.4rem",
            color: "red",
            cursor: "pointer",
          }}
          onClick={() => {
            setShowDialog(false);
          }}
        >
          ⨲
        </p>
        <div style={{ textAlign: "center" }}>{displayTxt()}</div>
        {/* <div onClick={() => navigate("/auth")}>Login Now </div> */}
      </div>
    </div>
  );
}

export default DialogBox;
