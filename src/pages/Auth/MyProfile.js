import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import SinglePainting from "../../components/SinglePainting";
import { BASE_URL } from "../../services/auth.service";

function MyProfile() {
  const [user, setUser] = useState({});
  const { cart } = useSelector((state) => state);
  const list = cart.products.map((item) => item._id);
  const { username } = useSelector((state) => state?.user?.user) || "";

  console.log(username, "username");

  const purchasedProducts = user?.prchdPrd?.map((item) => item._id);

  const [filter, setFilter] = useState({
    page: "",
    sort: "price",
    sortOrder: "asc",
    search: "",
  });

  useEffect(() => {
    const res = axios
      .get(`${BASE_URL}/users/find?username=${username}`)
      .then((data) => {
        setUser(data.data);
      });
  }, [username]);

  return (
    <div style={{ display: "flex", marginTop: "4rem" }}>
      <Sidebar filter={{ filter, setFilter }} />
      {purchasedProducts?.length > 0 ? (
        <div className="painting-cards">
          {user?.prchdPrd?.map((item, i) => (
            <SinglePainting
              key={item._id}
              list={list}
              item={item}
              purchasedProducts={purchasedProducts}
            />
          ))}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
          }}
        >
          <p>Hey looks like you have no paintings purchased. 😕</p>
          <Link to="/paintings/all">Buy now</Link>
        </div>
      )}
    </div>
  );
}

export default MyProfile;
