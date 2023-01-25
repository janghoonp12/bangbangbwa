import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

//Pages
import Nav from "./component/common/Nav";
import Home from "./pages/Home";
import Items from "./pages/Items";
import Broadcasts from "./pages/Broadcasts";
import MyPage from "./pages/MyPage";
import Interests from "./pages/Interests";
import NotFound from "./pages/NotFound";
import WriteItem from "./component/common/WriteItem";


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items/*" element={<Items />} />
        <Route path="/broadcasts/*" element={<Broadcasts />} />
        <Route path="/mypage/*" element={<MyPage />} />
        <Route path="/writeitems" element={<WriteItem />} />
        <Route path="/interests/*" element={<Interests />} />
        {/*일치하지 않는 모든 page는 NotFound */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;