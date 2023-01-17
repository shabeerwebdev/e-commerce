import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as UpArrow } from "../assets/icons/arrowUp.svg";
import { ReactComponent as DownArrow } from "../assets/icons/ArrowDown.svg";
import { ReactComponent as Stars } from "../assets/icons/stars.svg";
import { ReactComponent as Crown } from "../assets/icons/heart.svg";
import { ReactComponent as Cart } from "../assets/icons/cart.svg";
import { ReactComponent as Paint } from "../assets/icons/paint.svg";
import { ReactComponent as Sort } from "../assets/icons/sort.svg";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function Sidebar({ filter }) {
  const { pathname } = useLocation();

  const user = useSelector((state) => state.user?.user);

  useEffect(() => {
    switch (pathname) {
      case "/artist/all":
        svgRef1.current.style.fill = "white";
        break;
      case "/paintings/featured":
        svgRef2.current.style.fill = "white";
        break;
      case "/paintings/all":
        svgRef3.current.classList.add("blackk2");
        break;
      case "/myprofile":
        svgRef4.current.style.fill = "white";
        break;
      default:
        return;
    }
  }, [pathname]);

  const svgRef1 = useRef(null);
  const svgRef2 = useRef(null);
  const svgRef3 = useRef(null);
  const svgRef4 = useRef(null);
  const svgRef5 = useRef(null);

  const spanRef1 = useRef(null);
  const spanRef2 = useRef(null);
  const spanRef3 = useRef(null);
  const spanRef4 = useRef(null);
  const spanRef5 = useRef(null);

  const handler = (e) => {
    const expr = e.target.id;
    switch (expr) {
      case "1":
        svgRef1.current.classList.add("bgma3");
        break;
      case "2":
        svgRef2.current.classList.add("bgma3");
        break;
      case "3":
        svgRef3.current.classList.add("bgma3", "blackk");
        break;
      case "4":
        svgRef4.current.classList.add("bgma3");
        break;
      case "5":
        svgRef5.current.classList.add("bgma3");
        break;
      default:
        console.log(`Sorry, we are out of ${expr}.`);
    }
  };
  const removeHandler = (e) => {
    const expr = e.target.id;
    switch (expr) {
      case "1":
        svgRef1.current.classList.remove("bgma3");
        break;
      case "2":
        svgRef2.current.classList.remove("bgma3");
        break;
      case "3":
        svgRef3.current.classList.remove("bgma3", "blackk");
        break;
      case "4":
        svgRef4.current.classList.remove("bgma3");
        break;
      case "5":
        svgRef5.current.classList.remove("bgma3");
        break;
      default:
        console.log(`Sorry, we are out of ${expr}.`);
    }
  };

  useEffect(() => {
    spanRef1?.current?.addEventListener("mouseenter", handler);
    spanRef1?.current?.addEventListener("mouseleave", removeHandler);

    spanRef2?.current?.addEventListener("mouseenter", handler);
    spanRef2?.current?.addEventListener("mouseleave", removeHandler);

    spanRef3?.current?.addEventListener("mouseenter", handler);
    spanRef3?.current?.addEventListener("mouseleave", removeHandler);

    spanRef4?.current?.addEventListener("mouseenter", handler);
    spanRef4?.current?.addEventListener("mouseleave", removeHandler);

    spanRef5?.current?.addEventListener("mouseenter", handler);
    spanRef5?.current?.addEventListener("mouseleave", removeHandler);
  }, []);

  const currRoute = pathname.split("/")[2];
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
      <Link id="1" ref={spanRef1} className="flexy" to="/artist/all">
        <Crown ref={svgRef1} />
        <span>All Artists</span>
      </Link>
      <Link id="2" ref={spanRef2} className="flexy" to="/paintings/featured">
        <Stars ref={svgRef2} />
        <span>Featured</span>
      </Link>
      <Link id="3" ref={spanRef3} className="flexy" to="/paintings/all">
        <Paint ref={svgRef3} />
        <span>All Paintings</span>
      </Link>
      {user && (
        <Link id="4" ref={spanRef4} className="flexy" to="/myprofile">
          <Cart ref={svgRef4} />
          <span>My Purchases</span>
        </Link>
      )}
      <div className="sortBy">
        <div id="5" ref={spanRef5} className="flexy">
          <Sort ref={svgRef5} />
          <span>Sort By</span>
        </div>

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
                <DownArrow title="Descending" />
              ) : (
                <UpArrow title="Ascending" />
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
