import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import artist1 from "../../assets/samples/artist1.jpg";
import artist2 from "../../assets/samples/artist2.jpg";
import artist3 from "../../assets/samples/artist3.jpg";
import artist4 from "../../assets/samples/artist4.jpg";
import artist5 from "../../assets/samples/artist5.jpg";
import { BASE_URL } from "../../services/auth.service";
import { ReactComponent as Starsvg } from "../../assets/icons/star.svg";

function Artists() {
  const navigate = useNavigate();
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const url = `${BASE_URL}/users?page=&sort=soldCount,desc&search=&limit=4&isArtist=true`;
    const res = async () =>
      await axios.get(url).then((data) => {
        setArtists(data.data);
      });
    res();
  }, []);

  // console.log(artists);

  const openArtistPage = (item) => {
    navigate(`/artist/${item.username}`, {
      state: {
        item,
      },
    });
  };

  const openAllArtist = () => {
    navigate(`/artist/all`);
  };

  const stars = new Array(3).fill(0);

  const giveStars = (count) => {
    if (!count || count <= 2) {
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
  const newLoad = new Array(4).fill(0);

  return (
    <div className="artists-list" style={{ padding: "6rem 9rem" }}>
      <div className="wrapp">
        <p className="head">Explore by Artists</p>
        {/* <button>Explore all artists</button> */}
      </div>
      <div className="artists-list-imgs">
        {artists?.users?.length > 0
          ? artists.users?.map(
              (item, i) =>
                item.isArtist && (
                  <div
                    onClick={() => openArtistPage(item)}
                    key={i}
                    className="artist"
                  >
                    <div>{giveStars(item.soldCount)}</div>
                    <div className="featured-sec-div">
                      <img src={item.prfPic} alt="" />
                      <p className="featured-sec-center">Explore</p>
                    </div>
                    <p>{item.username}</p>
                    <span>{item.soldCount} sold</span>
                  </div>
                )
            )
          : newLoad.map((item) => (
              <div className="artist-skeleton">
                <div>
                  {stars.map((item, i) => (
                    <svg
                      key={i}
                      // style={{ width: "0.9rem", fill: "gray", stroke: "gray" }}
                      style={{ width: "0.9rem" }}
                      className="svg-anim"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.2827 3.45332C11.5131 2.98638 11.6284 2.75291 11.7848 2.67831C11.9209 2.61341 12.0791 2.61341 12.2152 2.67831C12.3717 2.75291 12.4869 2.98638 12.7174 3.45332L14.9041 7.88328C14.9721 8.02113 15.0061 8.09006 15.0558 8.14358C15.0999 8.19096 15.1527 8.22935 15.2113 8.25662C15.2776 8.28742 15.3536 8.29854 15.5057 8.32077L20.397 9.03571C20.9121 9.11099 21.1696 9.14863 21.2888 9.27444C21.3925 9.38389 21.4412 9.5343 21.4215 9.68377C21.3988 9.85558 21.2124 10.0372 20.8395 10.4004L17.3014 13.8464C17.1912 13.9538 17.136 14.0076 17.1004 14.0715C17.0689 14.128 17.0487 14.1902 17.0409 14.2545C17.0321 14.3271 17.0451 14.403 17.0711 14.5547L17.906 19.4221C17.994 19.9355 18.038 20.1922 17.9553 20.3445C17.8833 20.477 17.7554 20.57 17.6071 20.5975C17.4366 20.6291 17.2061 20.5078 16.7451 20.2654L12.3724 17.9658C12.2361 17.8942 12.168 17.8584 12.0962 17.8443C12.0327 17.8318 11.9673 17.8318 11.9038 17.8443C11.832 17.8584 11.7639 17.8942 11.6277 17.9658L7.25492 20.2654C6.79392 20.5078 6.56341 20.6291 6.39297 20.5975C6.24468 20.57 6.11672 20.477 6.04474 20.3445C5.962 20.1922 6.00603 19.9355 6.09407 19.4221L6.92889 14.5547C6.95491 14.403 6.96793 14.3271 6.95912 14.2545C6.95132 14.1902 6.93111 14.128 6.89961 14.0715C6.86402 14.0076 6.80888 13.9538 6.69859 13.8464L3.16056 10.4004C2.78766 10.0372 2.60121 9.85558 2.57853 9.68377C2.55879 9.5343 2.60755 9.38389 2.71125 9.27444C2.83044 9.14863 3.08797 9.11099 3.60304 9.03571L8.49431 8.32077C8.64642 8.29854 8.72248 8.28742 8.78872 8.25662C8.84736 8.22935 8.90016 8.19096 8.94419 8.14358C8.99391 8.09006 9.02793 8.02113 9.09597 7.88328L11.2827 3.45332Z"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ))}
                </div>
                <div className="img"></div>
                <div className="p-text"></div>
                <div className="p-sold"></div>
              </div>
            ))}

        <div className="artist" onClick={openAllArtist}>
          <div>{giveStars(20)}</div>
          <div className="img">Explore all Artists</div>
          <p>All Artists</p>
          <span>250 sold</span>
        </div>
      </div>
    </div>
  );
}

export default Artists;
