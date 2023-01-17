import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DetailedDialog from "../../components/DetailedDialog";
import Sidebar from "../../components/Sidebar";
import SinglePainting from "../../components/SinglePainting";
import { BASE_URL } from "../../services/auth.service";

function MyProfile() {
  const [user, setUser] = useState([]);
  const { cart } = useSelector((state) => state);
  const list = cart.products.map((item) => item._id);
  const { username } = useSelector((state) => state?.user?.user) || "";
  const [skeleton, setSkeleton] = useState({ message: "", show: false });

  console.log(username, "username");

  // const purchasedProducts = user?.prchdPrd?.map((item) => item._id);

  const [filter, setFilter] = useState({
    page: "",
    sort: "price",
    sortOrder: "asc",
    search: "",
  });

  useEffect(() => {
    const res = () => {
      setSkeleton({ message: "", show: true });
      axios
        .get(`${BASE_URL}/users/find?username=${username}`)
        .then((data) => {
          setUser(data.data.prchdPrd);
          if (user.length > 0) {
            setTimeout(() => {
              setSkeleton({ message: "", show: false });
            }, 2000);
          } else {
            setTimeout(() => {
              setSkeleton({ message: "No data found", show: false });
            }, 2000);
          }
        })
        .catch((err) => {
          setSkeleton({
            message: `${err.message || err.response.message}`,
            show: false,
          });
          console.log(err);
        });
    };
    res();
  }, [username, user.length]);
  const newLoad = new Array(6).fill(0);

  return (
    <div style={{ display: "flex", marginTop: "4rem" }}>
      <Sidebar filter={{ filter, setFilter }} />

      <div className="artist-sec">
        <div className="painting-cards">
          {skeleton.show ? (
            newLoad?.map((item, i) => (
              <div key={i} className="single-card-skeleton">
                <div className="card-img">
                  <div className="img"></div>
                  <p></p>
                </div>
                <div className="details-container">
                  <div className="details">
                    <p className="ellipsis"></p>
                    <p></p>
                  </div>
                  <div className="details">
                    <p></p>
                    <button></button>
                  </div>
                </div>
              </div>
            ))
          ) : skeleton.message !== "" ? (
            <div>{skeleton.message}</div>
          ) : (
            user.map((item, i) => (
              <SinglePainting
                key={item._id}
                list={list}
                item={item}
                purchasedProducts={user.map((item) => item._id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default MyProfile;

// {
//   purchasedProducts?.length > 0 ? (
//     <div className="painting-cards">
//       {user?.prchdPrd?.map((item, i) => (
//         <SinglePainting
//           key={item._id}
//           list={list}
//           item={item}
//           purchasedProducts={purchasedProducts}
//         />
//       ))}
//     </div>
//   ) : (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         gap: "2rem",
//         alignItems: "center",
//         justifyContent: "center",
//         textAlign: "center",
//         width: "100%",
//       }}
//     >
//       <p>Hey looks like you have no paintings purchased. 😕</p>
//       <Link to="/paintings/all">Buy now</Link>
//     </div>
//   );
// }
