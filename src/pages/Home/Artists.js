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
  console.log(artists);
  useEffect(() => {
    const url = `${BASE_URL}/users?page=&sort=soldCount,desc&search=&limit=4&isArtist=true`;
    const res = async () =>
      await axios.get(url).then((data) => {
        setArtists(data.data);
      });
    res();
  }, []);

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
    <div className="artists-list">
      <div className="wrapp">
        <p className="head">Explore by Artists</p>
        {/* <button>Explore all artists</button> */}
      </div>
      <div className="artists-list-imgs">
        {artists.users?.map(
          (item, i) =>
            item.isArtist && (
              <div
                onClick={() => openArtistPage(item)}
                key={i}
                className="artist"
              >
                <div>{giveStars(item.soldCount)}</div>
                <img src={item.prfPic} alt="" />
                <p>{item.username}</p>
                <span>{item.soldCount || 0} sold</span>
              </div>
            )
        )}

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
