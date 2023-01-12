import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { emptyCart } from "../slices/cart";

function Success() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(emptyCart());
  }, [dispatch]);

  return <div>helo succ</div>;
}

export default Success;
