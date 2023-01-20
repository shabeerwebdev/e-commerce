import React, { useEffect, useRef, useState } from "react";
import art from "../assets/samples/artist1.jpg";
import { ReactComponent as DownloadSvg } from "../assets/icons/Download.svg";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../services/auth.service";
function DetailedDialog({
  dialogData,
  list,
  addToWishList,
  purchasedProducts,
  setDialogData,
  setShowDialog,
}) {
  const reg = /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g;

  const dialogRef = useRef(null);

  const closeRef = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (!closeRef.current?.contains(e.target)) {
        setDialogData([]);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [setDialogData, dialogData]);

  const [load, setLoad] = useState(false);
  const { user } = useSelector((state) => state.user);

  const makePayment = async (e) => {
    // if (totalPrice() <= 0) return;
    setLoad(true);

    if (user) {
      const res = await axios
        .post(`${BASE_URL}/checkout/create-checkout-session`, {
          products: [dialogData],
          userId: user._id,
          email: user.email,
        })
        .then((res) => {
          // alert(res.data.payment_status);
          if (res.data.url) {
            window.location.href = res.data.url;
          }
        })
        .catch((error) => {
          alert("Create Stripe checkout:" + error);
          setLoad(false);
        });
      console.log(res, "response mame");
    } else {
      setLoad(false);
      setShowDialog(true);
      // alert("login");
      // navigate("/auth");
    }
  };

  return (
    <div>
      {Object.keys(dialogData).length !== 0 && (
        <div ref={dialogRef} className="detailed glass2">
          <div ref={closeRef} className="single-card">
            <div className="card-img">
              <img src={dialogData.image || art} alt="" />
            </div>
            <div className="details-container">
              <div className="abs">
                <p>Sold {dialogData.soldCount || 0} times</p>
                {!purchasedProducts.includes(dialogData._id) ? (
                  <div
                    onClick={() => addToWishList(dialogData)}
                    className="svg-wrapper"
                  >
                    <svg
                      // ref={newRef}
                      style={{
                        fill: list.includes(dialogData._id) ? "#d31e27" : null,
                        stroke: list.includes(dialogData._id)
                          ? "#d31e27"
                          : null,
                      }}
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.9932 5.13581C9.9938 2.7984 6.65975 2.16964 4.15469 4.31001C1.64964 6.45038 1.29697 10.029 3.2642 12.5604C4.89982 14.6651 9.84977 19.1041 11.4721 20.5408C11.6536 20.7016 11.7444 20.7819 11.8502 20.8135C11.9426 20.8411 12.0437 20.8411 12.1361 20.8135C12.2419 20.7819 12.3327 20.7016 12.5142 20.5408C14.1365 19.1041 19.0865 14.6651 20.7221 12.5604C22.6893 10.029 22.3797 6.42787 19.8316 4.31001C17.2835 2.19216 13.9925 2.7984 11.9932 5.13581Z"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                ) : (
                  <div
                    onClick={() => addToWishList(dialogData)}
                    className="svg-wrapper"
                  >
                    <DownloadSvg />
                  </div>
                )}
              </div>
              <div className="details">
                <h5 className="">{dialogData.title}</h5>
                <h5 className="">By -{dialogData.drawnBy}</h5>
                <h5>
                  ₹ {dialogData?.price?.toFixed(0).toString().replace(reg, ",")}
                </h5>
              </div>
              <div className="details">
                <p className="desc">{dialogData.description}</p>
                <button
                  style={{ cursor: "pointer" }}
                  onClick={
                    purchasedProducts.includes(dialogData._id)
                      ? null
                      : makePayment
                  }
                >
                  {purchasedProducts.includes(dialogData._id) ? (
                    <a
                      style={{ color: "white", textDecoration: "none" }}
                      href={dialogData.image}
                      download={dialogData.image}
                    >
                      Download
                    </a>
                  ) : load ? (
                    "Loading..."
                  ) : (
                    "Buy"
                  )}
                </button>
              </div>
            </div>

            <p
              style={{
                position: "absolute",
                bottom: "1rem",
                right: "1rem",
                color: "red",
                cursor: "pointer",
                fontSize: "1.2rem",
              }}
              onClick={() => {
                setDialogData({});
              }}
            >
              ⨲
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailedDialog;
