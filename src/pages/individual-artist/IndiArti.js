import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import DetailedDialog from "../../components/DetailedDialog";
import Sidebar from "../../components/Sidebar";
import SinglePainting from "../../components/SinglePainting";
import { BASE_URL } from "../../services/auth.service";
import { addProduct, removeProduct } from "../../slices/cart";

function IndiArti() {
  const { name } = useParams();
  const { state } = useLocation();

  const [data, setData] = useState([]);
  console.log(data);
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

  const [filter, setFilter] = useState({
    page: "",
    sort: "price",
    sortOrder: "asc",
    search: "",
  });

  useEffect(() => {
    const url = `${BASE_URL}/users/artists?drawnBy=${name}&page=${filter.page}&sort=${filter.sort},${filter.sortOrder}&search=${filter.search}`;

    const res = async () =>
      await axios.get(url).then((data) => setData(data.data));
    res();
  }, [name, filter]);

  const openDialog = (item) => {
    setDialogData(item);
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const res = axios
      .get("http://localhost:8800/api/users/find?username=balu")
      .then((data) => setProducts(data.data.prchdPrd));
  }, []);

  const purchasedProducts = products.map((item) => item._id);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar filter={{ filter, setFilter }} />
      <div className="artist-sec">
        <div className="porfile-card">
          <img src={state.item.prfPic} alt="" />
          <div className="details">
            <p>{state.item.username}</p>
            <p> Owns 100 paintings</p>
            <p> Sold 38 paintings</p>
          </div>
        </div>

        <div className="painting-cards">
          {data.products?.length !== 0 ? (
            data.products?.map((item, i) => (
              <SinglePainting
                key={item._id}
                list={list}
                addToWishList={addToWishList}
                openDialog={openDialog}
                item={item}
                purchasedProducts={purchasedProducts}
              />
            ))
          ) : (
            <p>This artist has no paintings</p>
          )}
        </div>

        <DetailedDialog
          dialogData={dialogData}
          addToWishList={addToWishList}
          list={list}
          purchasedProducts={purchasedProducts}
        />
      </div>
    </div>
  );
}

export default IndiArti;
//
