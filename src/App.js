import "./App.scss";
import Header from "./components/Header";
import Home from "./pages/Home/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import Artist from "./pages/individual-artist/AllPaintings";
import Auth from "./pages/Auth/Auth";
import IndiArti from "./pages/individual-artist/IndiArti";
import AllArtists from "./pages/individual-artist/AllArtists";
import MyProfile from "./pages/Auth/MyProfile";
import Success from "./pages/Success";
import AllPaintings from "./pages/individual-artist/AllPaintings";
import FeaturedPaintings from "./pages/individual-artist/FeaturedPaintings";

function App() {
  // console.log(process.env.REACT_APP_API_TOKEN, process.env.REACT_APP_API_URL);
  const { pathname } = useLocation();
  return (
    <div>
      {pathname !== ("/auth" || "/*") && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/success" element={<Success />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/paintings/all" element={<AllPaintings />} />
        <Route path="/paintings/featured" element={<FeaturedPaintings />} />
        <Route path="/artist/all" element={<AllArtists />} />
        <Route path="/artist/:name" element={<IndiArti />} />
        <Route path="/indi" element={<IndiArti />} />
        {/* <Route path="/success" element={<Success />} /> */}
      </Routes>
    </div>
  );
}

export default App;
