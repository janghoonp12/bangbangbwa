import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

//Pages
import Nav from "./component/Nav";
import Home from "./component/Home";
import Items from "./component/page/Items";
import Broadcasts from "./component/page/Broadcasts";
import MyPage from "./component/page/MyPage";
import NotFound from "./component/NotFound";
import WriteItem from "./component/page/WriteItem";


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items/*" element={<Items />} />
        <Route path="/broadcasts" element={<Broadcasts />} />
        <Route path="/mypage/*" element={<MyPage />} />
        <Route path="/writeitems" element={<WriteItem />} />
        {/*일치하지 않는 모든 page는 NotFound */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;