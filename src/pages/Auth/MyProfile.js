import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
    <div style={{ display: "flex" }}>
      <Sidebar filter={{ filter, setFilter }} />
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
    </div>
  );
}

export default MyProfile;
