import "./App.scss";
import Header from "./components/Header";
import Home from "./pages/Home/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import Artist from "./pages/individual-artist/Artist";
import Auth from "./pages/Auth/Auth";

function App() {
  // console.log(process.env.REACT_APP_API_TOKEN, process.env.REACT_APP_API_URL);
  const { pathname } = useLocation();
  return (
    <div>
      {pathname !== "/auth" && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/artist" element={<Artist />} />
        {/* <Route path="/success" element={<Success />} /> */}

      </Routes>
    </div>
  );
}

export default App;
