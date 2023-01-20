import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import painting1 from "../../assets/samples/painting1.jpg";
import painting2 from "../../assets/samples/painting2.jpg";
import painting3 from "../../assets/samples/painting3.jpg";
import painting4 from "../../assets/samples/painting4.jpg";
import painting5 from "../../assets/samples/painting5.jpg";
import painting6 from "../../assets/samples/painting6.jpg";
import painting7 from "../../assets/samples/painting7.jpg";
import painting8 from "../../assets/samples/painting8.jpg";
import DetailedDialog from "../../components/DetailedDialog";
import Sidebar from "../../components/Sidebar";
import SinglePainting from "../../components/SinglePainting";
import { BASE_URL } from "../../services/auth.service";
import { addProduct, removeProduct } from "../../slices/cart";

function FeaturedPaintings() {
  const arr = [
    painting3,
    painting4,
    painting2,
    painting5,
    // painting8,
    painting7,
  ];
  const [data, setData] = useState([]);
  const [dialogData, setDialogData] = useState([]);
  const [skeleton, setSkeleton] = useState({ message: "", show: false });
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  const list = cart.products.map((item) => item._id);

  const addToWishList = (item) => {
    if (list.includes(item._id)) {
      dispatch(removeProduct(item));
    } else {
      dispatch(addProduct(item));
    }
  };

  const openDialog = (item) => {
    setDialogData(item);
  };

  const { state } = useLocation();
  const [products, setProducts] = useState([]);
  const username = useSelector((state) => state?.user?.user?.username);

  useEffect(() => {
    if (username) {
      const res = axios
        .get(`${BASE_URL}/users/find?username=${username}`)
        .then((data) => {
          setProducts(data.data.prchdPrd);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [username]);

  const [showDialog, setShowDialog] = useState(false);

  const purchasedProducts = products.map((item) => item._id);

  useEffect(() => {
    const fetchData = async () => {
      setSkeleton({ message: "", show: true });
      try {
        const res = await axios.get(
          BASE_URL + `/products?limit=10&sort=soldCount,desc`,
          {
            headers: {
              Authorization: "Bearer " + process.env.REACT_APP_API_TOKEN,
            },
          }
        );
        setData(res.data.products);

        if (data.length > 0) {
          setTimeout(() => {
            setSkeleton({ message: "", show: false });
          }, 2000);
        } else {
          setTimeout(() => {
            setSkeleton({ message: "No data found", show: false });
          }, 2000);
        }
      } catch (err) {
        setSkeleton({
          message: `${err.message || err.response.message}`,
          show: false,
        });
      }
    };

    fetchData();
  }, [data.length]);

  const navigate = useNavigate();

  const navigateTo = (item) => {
    navigate("/paintings/all", {
      state: {
        item,
      },
    });
  };

  const newLoad = new Array(6).fill(0);

  console.log(skeleton);

  return (
    <div style={{ display: "flex", marginTop: "4rem" }}>
      <Sidebar />

      <div className="artist-sec">
        <div className="painting-cards">
          {skeleton.show ? (
            newLoad.map((item, i) => (
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
            data.map((item, i) => (
              <SinglePainting
                key={item._id}
                list={list}
                addToWishList={addToWishList}
                openDialog={openDialog}
                item={item}
                purchasedProducts={purchasedProducts}
                setShowDialog={setShowDialog}
              />
            ))
          )}
        </div>

        <DetailedDialog
          dialogData={dialogData}
          setDialogData={setDialogData}
          addToWishList={addToWishList}
          list={list}
          purchasedProducts={purchasedProducts}
        />
      </div>
    </div>
  );
}

export default FeaturedPaintings;
