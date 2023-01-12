import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as UpArrow } from "../assets/icons/arrowUp.svg";
import { ReactComponent as DownArrow } from "../assets/icons/ArrowDown.svg";
import { useLocation } from "react-router-dom";

function Sidebar({ filter }) {
  const { pathname } = useLocation();

  const currRoute = pathname.split("/")[2];

  // console.log(currRoute);

  const [toggleOrder, setToggleOrder] = useState(true);

  const sortChange = (e) => {
    filter.setFilter((prev) => {
      return {
        ...prev,
        sort: e.target.value,
      };
    });
  };

  const toggleOrderChange = (e) => {
    setToggleOrder((p) => !p);
    filter.setFilter((prev) => {
      return {
        ...prev,
        sortOrder: toggleOrder ? "desc" : "asc",
      };
    });
  };

  return (
    <div className="sidebar">
      <a href="/">Top Artists</a>
      <a href="/">Featured</a>
      <a href="/">All Paintings</a>
      <a href="/">Account</a>
      <div className="sortBy">
        <a href="/">Sort By</a>

        {currRoute === "all" && (
          <div className="sortCat">
            <input
              checked={filter?.filter.sort === "username"}
              value="username"
              onChange={sortChange}
              id="username"
              type="radio"
              name="sortType"
            />
            <label htmlFor="username">Name</label>
            {filter?.filter.sort === "username" ? (
              <span onClick={toggleOrderChange}>
                {toggleOrder ? (
                  <UpArrow title="Ascending" />
                ) : (
                  <DownArrow title="Descending" />
                )}
              </span>
            ) : null}
          </div>
        )}
        <div className="sortCat">
          <input
            checked={filter?.filter.sort === "soldCount"}
            value="soldCount"
            onChange={sortChange}
            id="soldCount"
            type="radio"
            name="sortType"
          />
          <label htmlFor="soldCount">Sold Count</label>
          {filter?.filter.sort === "soldCount" ? (
            <span onClick={toggleOrderChange}>
              {toggleOrder ? (
                <UpArrow title="Ascending" />
              ) : (
                <DownArrow title="Descending" />
              )}
            </span>
          ) : null}
        </div>

        {currRoute !== "all" && (
          <div className="sortCat">
            <input
              checked={filter?.filter.sort === "price"}
              value="price"
              onChange={sortChange}
              id="price"
              type="radio"
              name="sortType"
            />
            <label htmlFor="price">Price</label>
            {filter?.filter.sort === "price" ? (
              <span onClick={toggleOrderChange}>
                {toggleOrder ? (
                  <UpArrow title="Ascending" />
                ) : (
                  <DownArrow title="Descending" />
                )}
              </span>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
