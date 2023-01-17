import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../../components/Sidebar";
import profileImg from "../../assets/samples/artist1.jpg";
import sample1 from "../../assets/samples/painting1.jpg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct, emptyCart } from "../../slices/cart";
import DetailedDialog from "../../components/DetailedDialog";
import { BASE_URL } from "../../services/auth.service";
import { useLocation } from "react-router-dom";
import SinglePainting from "../../components/SinglePainting";

function AllPaintings() {
  const [data, setData] = useState([]);
  const [skeleton, setSkeleton] = useState({ message: "", show: false });
  const [dialogData, setDialogData] = useState([]);
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
  const reg = /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g;

  useEffect(() => {
    const fetchData = async () => {
      setSkeleton({ message: "", show: true });
      try {
        const res = await axios.get(BASE_URL + `/products?limit=10`, {
          headers: {
            Authorization: "Bearer " + process.env.REACT_APP_API_TOKEN,
          },
        });
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
        setTimeout(() => {
          setSkeleton({
            message: `${err.message || err.response.message}`,
            show: false,
          });
        }, 2000);
      }
    };

    fetchData();
  }, [data.length]);

  const openDialog = (item) => {
    setDialogData(item);
  };

  const [products, setProducts] = useState([]);
  const username = useSelector((state) => state?.user?.user?.username);
  useEffect(() => {
    if (username) {
      const res = axios
        .get(`${BASE_URL}/users/find?username=${username}`)
        .then((data) => setProducts(data.data.prchdPrd));
    }
  }, [username]);

  const [showDialog, setShowDialog] = useState(false);
  const newLoad = new Array(6).fill(0);
  const purchasedProducts = products.map((item) => item._id);
  return (
    <div style={{ display: "flex", marginTop: "4rem" }}>
      <Sidebar />

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

export default AllPaintings;
//
