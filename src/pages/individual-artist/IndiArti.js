import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DetailedDialog from "../../components/DetailedDialog";
import Sidebar from "../../components/Sidebar";
import SinglePainting from "../../components/SinglePainting";
import { BASE_URL } from "../../services/auth.service";
import { addProduct, removeProduct } from "../../slices/cart";
import { ReactComponent as Starsvg } from "../../assets/icons/star.svg";
import DialogBox from "../../components/DialogBox";

function IndiArti() {
  const { name } = useParams();
  const { pathname } = useLocation();
  const username = useSelector((state) => state?.user?.user?.username);
  const dispatch = useDispatch();
  console.log(username);

  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);

  const [dialogData, setDialogData] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const { cart } = useSelector((state) => state);

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

  useEffect(() => {
    const url = `${BASE_URL}/users/find?username=${pathname.split("/")[2]}`;

    const res = async () =>
      await axios.get(url).then((data) => setUser(data.data));
    res();
  }, [pathname]);

  const openDialog = (item) => {
    setDialogData(item);
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (username) {
      const res = axios
        .get(`http://localhost:8800/api/users/find?username=${username}`)
        .then((data) => setProducts(data.data.prchdPrd));
    }
  }, [username]);

  const purchasedProducts = products.map((item) => item._id);

  const giveStars = (count) => {
    if (!count) {
      return (
        <div>
          <Starsvg style={{ fill: "none" }} />
          <Starsvg style={{ fill: "none" }} />
          <Starsvg style={{ fill: "none" }} />
        </div>
      );
    } else if (count >= 10) {
      return (
        <div>
          <Starsvg style={{ stroke: "#d7fc70" }} />
          <Starsvg style={{ stroke: "#d7fc70" }} />
          <Starsvg style={{ stroke: "#d7fc70" }} />
        </div>
      );
    } else if (count >= 7) {
      return (
        <div>
          <Starsvg style={{ stroke: "#d7fc70" }} />
          <Starsvg style={{ stroke: "#d7fc70" }} />
          <Starsvg style={{ fill: "none" }} />
        </div>
      );
    } else if (count >= 3) {
      return (
        <div>
          <Starsvg style={{ stroke: "#d7fc70" }} />
          <Starsvg style={{ fill: "none" }} />
          <Starsvg style={{ fill: "none" }} />
        </div>
      );
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar filter={{ filter, setFilter }} />
      <div className="artist-sec">
        <div className="porfile-card">
          <img src={user.prfPic} alt="" />

          <div className="details">
            <p>{user.username}</p>
            <div>{giveStars(30)}</div>
          </div>

          <div className="abs">
            <p>Owns 100 paintings</p>
            <p>Sold {user.soldCount || 0} paintings</p>
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
                setShowDialog={setShowDialog}
              />
            ))
          ) : (
            <p>This artist has no paintings</p>
          )}
        </div>

        <DetailedDialog
          dialogData={dialogData}
          setDialogData={setDialogData}
          addToWishList={addToWishList}
          list={list}
          purchasedProducts={purchasedProducts}
        />

        {showDialog && <DialogBox setShowDialog={setShowDialog} />}
      </div>
    </div>
  );
}

export default IndiArti;
//
