import React from "react";

function Sidebar() {
  const height = localStorage.getItem("headerHeight");
  return (
    <div
      style={{
        maxHeight: `${100 - height * 0.45}vh`,
        position: "sticky",
        top: `${height * 0.19}rem`,
      }}
      className="sidebar"
    >
      <a href="/">Top Artists</a>
      <a href="/">Featured</a>
      <a href="/">All Paintings</a>
      <a href="/">Account</a>
    </div>
  );
}

export default Sidebar;
